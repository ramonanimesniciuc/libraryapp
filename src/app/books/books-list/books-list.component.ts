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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private bookService: BooksService,
              private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.handleAuthCallback();
    console.log(this.cookieService.get('userLogged'));
    this.getBooks();
    this.getLibraries();
    // tslint:disable-next-line:max-line-length
    this.books = [{id: 1, title: 'A love story', author: 'A.S.Princke', status: 'available', cover: 'https://images-na.ssl-images-amazon.com/images/I/51Jwl5TIcuL._SX308_BO1,204,203,200_.jpg'},
      {id: 2, title: 'One Day', author: 'Henry Smith', status: 'rented', cover: 'https://images4.penguinrandomhouse.com/cover/9780307946713'},
      {id: 3, title : 'The ABC murders', author: 'Agatha Christie', cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'},
      {id: 4, title : 'The ABC murders', author: 'Agatha Christie', cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'},
      {id: 3, title : 'The ABC murders', author: 'Agatha Christie', cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'},
      {id: 4, title : 'The ABC murders', author: 'Agatha Christie', cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'},
      // tslint:disable-next-line:max-line-length
      {id: 5, title: 'Death on the Nile' , author: 'Agatha Christie' , cover: 'https://kbimages1-a.akamaihd.net/0b20f759-14c8-4609-98aa-f54fcd3f6f5e/353/569/90/False/death-on-the-nile.jpg'}];
  }

  goToBookVirew(bookId: any) {
    this.router.navigate(['./' + bookId], {relativeTo: this.route});
  }

  getBooks() {
    this.bookService.getBooks().subscribe(
      (books) => {
        console.log(books);
      }
    );
  }

  getLibraries() {
    this.bookService.getLibraries().subscribe(
      (libraries) => {
        this.locations = libraries;
      }
    );
  }

}
