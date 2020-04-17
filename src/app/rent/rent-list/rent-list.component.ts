import {Component, HostListener, OnInit} from '@angular/core';
import {RentsUserService} from '../rents-user.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss']
})
export class RentListComponent implements OnInit {
  private dataSource: any[];
  private displayedColumns: any[];




  constructor(private rentsUserService: RentsUserService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.loadStripe();
    this.displayedColumns = ['title', 'startDate', 'endDate', 'condition', 'extraPayment'];
    this.dataSource = [
      // tslint:disable-next-line:max-line-length
      {id: 1, title: 'How to learn C++', startDate: '12/08/2018', endDate: '15/08/2018', extraPayment: '12 RON', condition: '2 pages missing'}
    ];
    this.getHistory();
  }

  getHistory() {
  this.rentsUserService.getUserHistory(this.cookieService.get('userDetails')).subscribe(
    (rents) => {
      this.dataSource = rents;
    },
    (err) => {
      console.log(err);
    }
  );
  }

  payNow(rent:any){
    let self=this;
    let handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_8CUCodwDZ1mIUcAIjfz7R6n900mIRWpx7T',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token)
        const payment={total:rent.paymentExtra,stripeTokenId:token.id};
        self.rentsUserService.pay(payment).subscribe((success)=>console.log(success));
      }
    });

    handler.open({
      name: 'Demo Site',
      description: '2 widgets',
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
