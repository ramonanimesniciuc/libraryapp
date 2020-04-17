import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../books.service';
import {MatDialog} from '@angular/material';
import {RentBookComponent} from '../rent-book/rent-book.component';
import {ReserveBookComponent} from '../reserve-book/reserve-book.component';
import { NotificationsService } from 'angular2-notifications';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  private book: any;
  private bookId: any;
  private copies: any[];
  private hasNotifications: any;
  constructor(private route: ActivatedRoute,
              private bookService: BooksService,
              private cookieService: CookieService,
              private notification: NotificationsService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.book = {};
    this.route.params.subscribe(
      (params) => {
        this.bookId = params.bookId;
      }
    );
    this.getBook();
  }

  getBook() {
this.bookService.getBookById(this.bookId).subscribe(
  (book) => {
    this.book = book;
    this.getBookCopies();
  },
  (error) => {
    console.log(error);
    this.notification.error(error.message);
  }
);
  }

  rentBook(bookId: any) {
    const dialogRef = this.dialog.open(RentBookComponent, {
      width: '700px',
      data: {bookId, hasNotifications: this.hasNotifications}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBookCopies();

    });
  }

  bookABook(bookId: any) {
    const dialogRef = this.dialog.open(ReserveBookComponent, {
      width: '700px',
      data: {bookId: this.bookId, copies: this.copies , hasNotifications: this.hasNotifications}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getBookCopies();

    });
  }

  getBookCopies() {
    this.bookService.getCopies(this.bookId).subscribe(
      (copies) => {
this.copies = copies;
if (this.copies.length === 0) {
  this.bookService.getNotifications({id: this.cookieService.get('userDetails'), bookId: this.bookId}).subscribe(
    (notifs) => {
      if (notifs.length > 0) {
        this.hasNotifications = true;
      }
    },
    (err) => {
      this.notification.error(err);
    }
  );
}
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
