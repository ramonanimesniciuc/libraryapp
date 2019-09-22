import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../books.service';
import {MatDialog} from '@angular/material';
import {RentBookComponent} from '../rent-book/rent-book.component';
import {ReserveBookComponent} from '../reserve-book/reserve-book.component';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit {
  private book: any;
  private bookId: any;
  constructor(private route: ActivatedRoute,
              private bookService: BooksService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.bookId = params.bookId;
      }
    );
    this.book = {id: this.bookId,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/810f%2BZy0ITL.jpg',
      title: 'Love you first',
      author: 'Arthur Smith',
      category: 'Drama',
      rating: 3.5,
      condition: 'Cover intact,few pages missing.',
       published_by: 'Humanitas',
       publish_year: 2009,
       pages: 230,
        stock: 10};
  }

  getBook() {

  }

  rentBook(bookId: any) {
    const dialogRef = this.dialog.open(RentBookComponent, {
      width: '700px',
      data: {bookId}
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  bookABook(bookId: any) {
    const dialogRef = this.dialog.open(ReserveBookComponent, {
      width: '700px',
      data: {bookId}
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}