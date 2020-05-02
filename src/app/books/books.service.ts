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
  public books: any[];
  constructor(private http: HttpService,
              private authService: AuthService , ) {
  }


  getBookById(bookId: any) {
    return this.http.get('books/' + bookId);
  }
  getLibraries() {
    return this.http.get('libraries');
  }

  getBooks(page:any) {
    return this.http.get('books/page/' +page);
  }
  postBook(book: any) {
    return this.http.post('books', book);
  }

  getbooksNumber(){
    return this.http.get('getbooksno');
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

  filterBooksByCategory(CategoryId: number){
    return this.http.get('booksbycategory/' + CategoryId);
  }
filterBookByLibraryAvailable(libraryId: any) {
    return this.http.get('booksByLibraryAvailable/' + libraryId);
}
  getReservedTypes() {
    return this.http.get('reservedTypes');
  }

  getCopies(bookId: any) {
    return this.http.get('copies/' + bookId);
  }

  bookABook(book: any) {
    return this.http.post('bookit', book);
  }

  rentABook(book: any) {
    return this.http.post('rents', book);
  }

  addNotification(notification: any) {
    return this.http.post('notifications', notification);
  }

  getNotifications(notification: any) {
    return this.http.post('getnotifications', notification);
  }

  search(searchValue:string) {
    return this.http.get('search/' + searchValue);

  }

  searchForDelete(searchValue:string){
    return this.http.get('searchForDelete/' + searchValue);
  }

  checkIfHasPayment(userId:any){
    return this.http.get('checkpayment/' + userId);
  }

  addAuthor(author:any){
    return this.http.post('authors',author);
  }

  deleteCopy(copyId:any){
    return this.http.remove('bookcopies/' + copyId);
  }
}
