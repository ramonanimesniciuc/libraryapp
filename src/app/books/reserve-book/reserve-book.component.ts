import {Component, Inject, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';
import {RentsUserService} from "../../rent/rents-user.service";

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.scss']
})
export class ReserveBookComponent implements OnInit {
  private timeOptions: any[];
  private  selectedTime: any;
  private selectedCopy: any;
  private copies: any[];
  private bookId: any;
  private hasNotification: any;
  public hasPayments:boolean;
  constructor(private booksService: BooksService,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              private cookieService: CookieService,
              private rentsUserService: RentsUserService,
              private notifications: NotificationsService,
              public dialogRef: MatDialogRef<ReserveBookComponent>,
              ) { }

  ngOnInit() {
    this.loadStripe();
    this.checkIfHasPayments();
    this.selectedTime = {cost: '0 Ron'};
    this.getReservedTypes();
    this.copies = this.data.copies;
    this.bookId = this.data.bookId;
    this.hasNotification = this.data.hasNotifications;
  }

  getReservedTypes() {
    this.booksService.getReservedTypes().subscribe(
      (types) => {
        this.timeOptions = types;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  notifyUser() {
    this.booksService.addNotification({UserId: this.cookieService.get('userDetails'), bookId: this.bookId}).subscribe(
      (success) => {
        this.notifications.success('Notification added!','',{timeOut:2000});
        this.dialogRef.close();
      },
      (err) => {
        this.notifications.error(err.message);
      }
    );
  }
  bookThisBook() {
    const booked = {
      payment_accepted: true,
      UserId: this.cookieService.get('userDetails'),
      bookCopyId: this.selectedCopy.id,
      reservedTypeId: this.selectedTime.id,
      createdAt: new Date(),
      startedHour: new Date().getHours() + ':' + new Date().getMinutes()
    };
    this.booksService.bookABook(booked).subscribe(
      (succes) => {
        this.notifications.success(succes.message,'',{timeOut:2000});
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkIfHasPayments(){
    this.booksService.checkIfHasPayment(Number(this.cookieService.get('userDetails'))).subscribe(
      (result)=>{
        this.hasPayments=result.data.length>0;
      }
    );
  }

  payNow(rent:any){
    let self=this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_8CUCodwDZ1mIUcAIjfz7R6n900mIRWpx7T',
      locale: 'auto',
      currency:'ron',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        const payment={total:rent,stripeTokenId:token.id};
        self.rentsUserService.payreservation(payment).subscribe((success)=>{
          console.log(success);
          self.notifications.success('Payment successfull!',null,{timeOut:2000});
          self.bookThisBook();
        });
      }
    });

    handler.open({
      name: 'Biblioteque reservation payment',
      description: 'Payment for reservation of this book',
      amount: rent.paymentExtra * 100
    });
  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      let s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js";
      window.document.body.appendChild(s);
    }
  }

}
