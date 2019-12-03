import {Component, Inject, OnInit} from '@angular/core';
import {BooksService} from '../books.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-rent-book',
  templateUrl: './rent-book.component.html',
  styleUrls: ['./rent-book.component.scss']
})
export class RentBookComponent implements OnInit {
  private startDate: any;
  private endDate: any;
  private selectedCopy: any;
  private copies: any[];
  private hasNotifications:any;
  constructor(private booksService: BooksService,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              private cookieService: CookieService,
              private notifications: NotificationsService,
              public dialogRef: MatDialogRef<RentBookComponent>, ) { }

  ngOnInit() {
    this.selectedCopy = this.data.bookId;
    this.hasNotifications = this.data.hasNotifications;
    this.getCopies();
  }
rentBook() {
    const rent = {
      startDate: this.startDate,
      endDate: this.endDate,
      UserId: this.cookieService.get('userDetails'),
      LibrarianId: '2',
      bookCopyId: this.selectedCopy
    };
    this.booksService.rentABook(rent).subscribe(
      (success) => {
        this.notifications.success(success);
      },
      (error) => {
        this.notifications.error(error);
      }
    );
}

  onCopySelected($event, index) {
    this.selectedCopy = $event;
    // document.getElementsByClassName('divCopies')[index].style.backgroundColor="#b3ffff";
  }

getCopies() {
    this.booksService.getCopies(this.data.bookId).subscribe(
      (copies) => {
        this.copies = copies;
      },
      (err) => {
        console.log(err);
      }
    );
}

notifyUser(){

}

}
