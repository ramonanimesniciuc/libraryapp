import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from '../login/auth.service';
import {InterceptorService} from '../core/interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private headers: HttpHeaders;
  constructor(private http: HttpClient,
              private authService: AuthService ,
              private intercept: InterceptorService) {
  }

  getBooks(){
    return this.http.get('https://library-api.theheracles.tech/api/public/books/all');
  }

  getLibraries(){
    return this.http.get('https://library-api.theheracles.tech/api/public/libraries/all');
  }
}
