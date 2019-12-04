import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';
import {LibrarianService} from '../librarian.service';

@Component({
  selector: 'app-confirm-return',
  templateUrl: './confirm-return.component.html',
  styleUrls: ['./confirm-return.component.scss']
})
export class ConfirmReturnComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private cookieService: CookieService,
              private librarianService: LibrarianService,
              private notifications: NotificationsService,
              public dialogRef: MatDialogRef<ConfirmReturnComponent>) {
  }

  private rentedBookId: any;
  private payments: any[];
  private extraPayment: any;
  private comment: any;
  ngOnInit() {
    this.rentedBookId = {
      rentedBook: {
        id: this.data.rentedBookId,
        bookCopyId: this.data.bookCopyId,
        startDate: this.data.startDate,
        endDate: this.data.endDate,
        UserId: this.data.UserId,
        bookId: this.data.bookId,
        Library:this.data.libraryId
  },
      Book:this.data.Book,
      Library:this.data.Library

  };

    this.payments = [{id: 1, title: '50 RON', value: 50}, {id: 2, title: 'No payment', value: 0}, {id: 3, title: '5 RON', value: 5}];
  }

  confirmReturn() {
    this.rentedBookId.rentedBook.paymentExtra = this.extraPayment;
    this.rentedBookId.rentedBook.comment = this.comment;
    this.librarianService.returnBook(this.rentedBookId).subscribe(
    (success) => {
      this.notifications.success('Book returned!');
      this.dialogRef.close();
    },
    (err) => {
      console.log(err);
      this.dialogRef.close();
    }
  );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
