import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {BooksService} from '../../books/books.service';
import {CookieService} from 'ngx-cookie-service';
import {UserService} from '../../user/user.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss']
})
export class LendBookComponent implements OnInit {
  private users: any[];
  private selectedBook: any;
  private possibleBooks: any[];
  private filteredBooks: any[];
  private startDate: any;
  private endDate: any;
  private rent: any;
  private bookInput: any;
  private userSelected: any;

  constructor(private booksService: BooksService,
              private cookieService: CookieService,
              private notification: NotificationsService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.filteredBooks = [];
    this.selectedBook = '';
    this.users = [{id: 1, name: 'Florentina Ion'}];
    this.possibleBooks = [];
    this.getBooksByLocation();
    this.getUsers();
  }

  rentBook() {
     this.rent = {
      startDate: this.startDate,
      endDate: this.endDate,
      UserId: this.userSelected,
      LibrarianId: this.cookieService.get('userDetails'),
      bookCopyId: this.selectedBook
  };

     this.booksService.rentABook(this.rent).subscribe(
       (success) => {
         this.notification.success('Book Rented!');
         this.selectedBook='';
         this.userSelected='';
         this.startDate='';
         this.endDate='';
         this.filteredBooks=[];
         this.getBooksByLocation();
       },
       (err) => {
         console.log(err);
         this.notification.error(err);
       }
     );

  }

  getBooksByLocation() {
    this.booksService.filterBookByLibraryAvailable(this.cookieService.get('libraryId')).subscribe(
      (books) => {
        this.possibleBooks = books;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  selectBook(book: any) {
  this.selectedBook = book.bookCopies[0].id;
  const div = document.querySelector('.booksFiltered') as HTMLElement;
  div.style.backgroundColor = 'darkgreen';
  }

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  searchBook() {
    this.filteredBooks = [];
    this.possibleBooks.forEach((book) => {
     if (book.title.includes(this.bookInput)) {
       this.filteredBooks.push(book);
     }
   });
  }



}
