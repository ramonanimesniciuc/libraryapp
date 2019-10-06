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
  constructor(private router: Router,
              private route: ActivatedRoute,
              private bookService: BooksService,
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
    // this.bookService.postBook(book).subscribe(
    //   (succes)=>{
    //     console.log('carte adaugata cu succes');
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // );
    // this.getBooks();
    this.getLibraries();
    // tslint:disable-next-line:max-line-length
    this.pingBookList();
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
    this.bookService.postBook$(book).subscribe(
      res => {this.response = JSON.stringify(res, null, 2).trim();
              console.log(this.response);
      }
    );
  }

  // getBooks() {
  //   this.bookService.getBooks().subscribe(
  //     (books) => {
  //       console.log(books);
  //     }
  //   );
  // }

  //
  getLibraries() {
    this.bookService.getLibraries$().subscribe(
      (libraries) => {
        this.locations = libraries;
      }
    );
  }

}
