import { Injectable } from '@angular/core';
import {HttpService} from '../core/http-service';
import {CookieService} from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService, private cookieService: CookieService) {
  }
  checkIfUserIsLogged() {
    if (this.cookieService.get('userLogged')) {
      return true;
    } else {
      return false;
    }
  }
  login(user: any) {
  return this.http.post('login', user);
  }
  loginLibrarian(librarian: any) {
    return this.http.post('login-librarian', librarian);
  }
  logout() {

  }

}
