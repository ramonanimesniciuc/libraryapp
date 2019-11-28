import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../login/auth.service';
import {Observable, throwError} from 'rxjs';
import { HttpService } from '../core/http-service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private headers: HttpHeaders;
  constructor(private http: HttpService,
              private authService: AuthService , ) {
  }


  getBookById(bookId: any) {
    return this.http.get('books/' + bookId);
  }
  getLibraries() {
    return this.http.get('libraries');
  }

  getBooks() {
    return this.http.get('books');
  }
  postBook(book: any) {
    return this.http.post('books', book);
  }

  getAuthors() {
    return this.http.get('authors');
  }

  getPublishHouses() {
    return this.http.get('publishingHouses');
  }

  getCategories() {
    return this.http.get('categories');
  }
  getStatuses() {
    return this.http.get('bookStatuses');
  }

  postBookCopies(bookCopy: any[]) {
    return this.http.post('bookCopies', bookCopy);
  }

  filterBooksByLibrary(libraryId: any) {
    return this.http.get('booksByLibrary/' + libraryId);
  }
}
