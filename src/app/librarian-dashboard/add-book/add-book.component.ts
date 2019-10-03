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
  constructor(private formBuilder: FormBuilder,
              private notifications: NotificationsService,
              private cookieService: CookieService,
              private bookService: BooksService) { }

  ngOnInit() {
    this.publishHouses = [{id: 1, name: 'Humanitas'}];
    this.categories = [{id: 1, name: 'Drama'}];
    this.authors = [{id: 1, name: 'Agatha Christie'}];
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
  }

  addNewBook() {
    this.bookService.postBook$(this.addForm.value).subscribe(
      (succes) => {
        this.addForm.reset();
        this.notifications.success('Book added successfully!');
      },
      (error) => {
        this.notifications.error(error.message);
      }
    );
  }

}
