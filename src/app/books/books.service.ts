import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../login/auth.service';
import {InterceptorService} from '../core/interceptor.service';
import {catchError, mergeMap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import { HttpService } from '../core/http-service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private headers: HttpHeaders;
  constructor(private http: HttpService,
              private authService: AuthService ,
              private intercept: InterceptorService) {
  }

  // getBooks() {
  //   return this.http.get('https://library-api.theheracles.tech/api/public/books/all');
  // }
  //
  // postBook(book: any) {
  //   this.authService.getTokenSilently$().toPromise().then(
  //     (resp) => {
  //       return this.http.post('https://library-api.theheracles.tech/api/private/books', book, {headers: {Authorization: 'Bearer ' + resp}});
  //     }
  //   );
  // }

  getBookById$(bookId: any):Observable<any> {
    return this.http.get('/public/books/byId/' + '5f987d27-c7ae-4a59-b14b-5f80a49d4ce7');
  }
  getLibraries$():Observable<any> {
    return this.http.get('public/libraries/all');
  }

  getBooks$(): Observable<any> {
    return this.http.get('public/books/all');
  }
  postBook$(book:any): Observable<any> {
    return this.http.post('private/books',book);
  }
}
