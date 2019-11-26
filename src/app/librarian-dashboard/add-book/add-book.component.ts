import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BooksService} from '../../books/books.service';
import {NotificationsService} from 'angular2-notifications';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
 private addForm: FormGroup;
 private authors: any[];
 private categories: any[];
 private publishHouses: any[];
 private libraries:any[];
 private bookCopies:any[];
  constructor(private formBuilder: FormBuilder,
              private notifications: NotificationsService,
              private cookieService: CookieService,
              private bookService: BooksService) { }

  ngOnInit() {
    this.publishHouses = [];
    this.categories = [];
    this.bookCopies=[];
    this.authors = [];
    this.addForm = this.formBuilder.group({
      author: new FormControl(''),
      cover: new FormControl(''),
      libraryId: new FormControl('e091ffc1-c535-43ad-8f4a-248f70302a1d'),
      pages: new FormControl(1),
      publishHouse: new FormControl(''),
      publishedDate: new FormControl(new Date()),
      title: new FormControl(''),
      stock: new FormControl(1),
      rating: new FormControl(3.4)
    });

    this.getAuthors();
    this.getCategories();
    this.getPublishingHouses();
    this.getLibraries();
  }

  addNewBook() {
    this.bookService.postBook(this.addForm.value).subscribe(
      (succes) => {
        this.addForm.reset();
        this.notifications.success('Book added successfully!');
      },
      (error) => {
        this.notifications.error(error.message);
      }
    );
  }

  getPublishingHouses(){
this.bookService.getPublishHouses().subscribe(
  (publishingHouses)=>{
    this.publishHouses=publishingHouses;
  },
  (error)=>{
    console.log(error);
  }
)
  }

  addBookCopies(){
  const newCopy={
    library:'',
    status:'',
    comment:''
  }
  this.bookCopies.push(newCopy);
  }


  getAuthors(){
this.bookService.getAuthors().subscribe(
  (authors)=>{
    this.authors=authors;
  },
  (error)=>{
    console.log(error);
  }
)
  }

  getLibraries(){
    this.bookService.getLibraries().subscribe(
      (libraries)=>{
        this.libraries=libraries;
      }
    )
  }
 getCategories(){
this.bookService.getCategories().subscribe(
  (categories)=>{
    this.categories=categories;
  },
  (error)=>{
    console.log(error);
  }
)
 }
}
