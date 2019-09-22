import { Injectable } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private cookieService: CookieService) { }
 private token: any;
  private user: any;
  private cookieToken: any;
  getCookieToken() {
    return this.cookieService.get('userLogged');
  }
  logout() {
    this.token = null;
    this.cookieService.delete('userLogged');
  }

  isLoggedIn() {
    return !!this.getCookieToken();
  }
  checkLogin() {
    this.cookieToken = this.getCookieToken();
    if (this.cookieToken) {
      this.token = this.cookieToken;
      const headers = new HttpHeaders(
        {
          'Content-Type': 'application/json'
        }
      );
      this.user = {
     username: 'user_demo',
     name: 'John Peter',
     birthdate: '23/09/1990',
     address: 'Florei Street 21',
     card_number: '1234-5678-1234-5678',
     card_expiration: '09/21'
   };
    }
  }

}
