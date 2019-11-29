import {Component, Inject, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from "angular2-notifications";

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

  bookThisBook() {
    const booked = {
      payment_accepted: true,
      UserId: this.cookieService.get('userDetails'),
      bookCopyId: this.selectedCopy.id,
      reservedTypeId: this.selectedTime.id
    };
    this.booksService.bookABook(booked).subscribe(
      (succes) => {
        this.notifications.success(succes);
        this.dialogRef.close();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
