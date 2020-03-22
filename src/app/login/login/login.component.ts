import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: any;
  private password: any;
  private loading: any;
  private loginLibrarian: boolean;
  constructor(private cookieService: CookieService,
              private authService: AuthService,
              private notification: NotificationsService,
              private router: Router) { }

  ngOnInit() {
    // this.cookieService.delete('userLogged');
    // this.cookieService.delete('userToken');
  }
  loginUser() {
//     if (this.username === 'user' && this.password === 'user') {
// this.cookieService.set('userLogged', 'userDemo');
// this.router.navigate(['/books']);
//     }
    this.loading=true;
    this.authService.login({username: this.username, password: this.password}).subscribe(
      (user) => {
        if (user.length === 0) {
          this.notification.error('Username or password wrong');
          this.loading=false;
        } else {
          this.cookieService.set('userLogged', 'user', 5);
          this.cookieService.set('userDetails', user[0].id);
          console.log(user);
          this.loading=false;
          this.router.navigate(['/books']);
        }

      },
      (error) => {
        console.log(error);
      }
    );
//     this.authService.login();
  }

  showloginLibrarian() {
    this.loginLibrarian = !this.loginLibrarian;
  }
  loginAsLibrarian() {
    this.loading=true;
this.authService.loginLibrarian({username: this.username, password: this.password}).subscribe(
  (librarian) => {

    if (librarian.length === 0) {
      this.notification.error('Username or password wrong!');
      this.loading=false;
    } else {
      this.cookieService.set('userLogged', 'librarian', 5);
      console.log(librarian);
      this.loading=false;
      this.cookieService.set('libraryId', librarian[0].LibraryId);
      this.router.navigate(['/books']);
    }

  },
  (error) => {
    console.log(error);
    this.loading=false;
  }
);
  }
}
