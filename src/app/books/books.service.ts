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
              private authService: AuthService ,) {
  }


  getBookById(bookId: any){
    return this.http.get('/public/books/byId/' + '5f987d27-c7ae-4a59-b14b-5f80a49d4ce7');
  }
  getLibraries(){
    return this.http.get('public/libraries/all');
  }

  getBooks(){
    return this.http.get('public/books/all');
  }
  postBook(book:any){
    return this.http.post('private/books',book);
  }
}
