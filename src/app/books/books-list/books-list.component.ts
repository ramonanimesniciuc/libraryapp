import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import {BooksService} from '../books.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  private books: any[];
  private locations: any;
  private response: any;
  private loading: boolean;
  constructor(private router: Router,
              private route: ActivatedRoute,
              public bookService: BooksService,
              private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    console.log(this.cookieService.get('userLogged'));
    const book = {
      author: 'string',
      cover: 'string',
      libraryId: 'string',
      pages: 0,
      publishDate: '2019-10-02T19:31:02.500Z',
      publishHouse: 'string',
      rating: 0,
      stock: 0,
      title: 'string'
    };

    this.getBooks();
    this.getLibraries();
  }

  changeBookFilter($event) {
    // $event.value=1
   this.filterBooksByLibrary($event.value);
  }

  goToBookVirew(bookId: any) {
    this.router.navigate(['./' + bookId], {relativeTo: this.route});
  }

  pingBookList() {
    const book = {
      author: 'James Oliver',
      cover: 'string',
      libraryId: '8f024e4d-2f3a-488c-9a1e-dccde026c6e3',
      pages: 30,
      publishDate: '2019-10-02T19:31:02.500Z',
      publishHouse: 'Humanitas',
      rating: 4,
      stock: 10,
      title: 'How to cook in style'
    };
    this.bookService.postBook(book).subscribe(
      res => {this.response = JSON.stringify(res, null, 2).trim();
              console.log(this.response);
      }
    );
  }
  filterBooksByLibrary(libraryId: any) {
    this.loading = true;
    this.bookService.filterBooksByLibrary(libraryId).subscribe(
    (books) => {
      this.books = books;
      this.bookService.books = books;
      this.loading = false;
    },
    (error) => {
      console.log(error);
    }
  );
  }
  getBooks() {
    this.loading = true;
    this.bookService.getBooks().subscribe(
      (books) => {
       this.books = books;
      this.bookService.books = books;
      this.loading=false;
       console.log(this.books);
      }
    );
  }

  //
  getLibraries() {
    this.bookService.getLibraries().subscribe(
      (libraries) => {
        this.locations = libraries;
      }
    );
  }

}
