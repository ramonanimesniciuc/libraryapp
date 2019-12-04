import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {BooksService} from "../../books/books.service";
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../../user/user.service";

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
  private startDate:any;
  private endDate:any;

  constructor(private booksService:BooksService,
              private cookieService: CookieService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.selectedBook='';
    this.users = [{id: 1, name: 'Florentina Ion'}];
    this.possibleBooks = [];
    this.getBooksByLocation();
    this.getUsers();
  }

  rentBook(){
    const rent = {
      startDate: this.startDate,
      endDate: this.endDate,
      UserId: this.cookieService.get('userDetails'),
      LibrarianId: this.cookieService.get('userDetails'),
      bookCopyId: this.selectedBook
    };

  }

  getBooksByLocation(){
    this.booksService.filterBooksByLibrary(this.cookieService.get('libraryId')).subscribe(
      (books)=>{
        this.possibleBooks=books;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  getUsers(){
    this.userService.getAllUsers().subscribe(
      (users)=>{
        this.users=users;
      },
      (err)=>{
        console.log(err);
      }
    );

  }



}
