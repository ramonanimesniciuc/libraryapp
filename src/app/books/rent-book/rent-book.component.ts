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
  constructor(private booksService: BooksService,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              private cookieService: CookieService,
              private notifications: NotificationsService,
              public dialogRef: MatDialogRef<RentBookComponent>, ) { }

  ngOnInit() {
  }
rentBook() {
    const rent = {
      startDate: '',
      endDate: '',
      UserId: this.cookieService.get('userDetails'),
      LibrarianId: '1',
      copyBoodId: this.selectedCopy
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
}
