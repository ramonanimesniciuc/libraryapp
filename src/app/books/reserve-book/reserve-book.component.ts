import {Component, Inject, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';

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
  constructor(private booksService: BooksService,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              private cookieService: CookieService,
              private notifications: NotificationsService,
              public dialogRef: MatDialogRef<ReserveBookComponent>,
              ) { }

  ngOnInit() {
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
        this.notifications.success('Notification added!');
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
      reservedTypeId: this.selectedTime.id
    };
    this.booksService.bookABook(booked).subscribe(
      (succes) => {
        this.notifications.success(succes.message);
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
