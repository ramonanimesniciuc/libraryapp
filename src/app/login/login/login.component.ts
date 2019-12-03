import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private username: any;
  private password: any;
  private loginLibrarian: boolean;
  constructor(private cookieService: CookieService,
              private authService: AuthService,
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
    this.authService.login({username: this.username, password: this.password}).subscribe(
      (user) => {
        this.cookieService.set('userLogged', 'user', 5);
        this.cookieService.set('userDetails', user[0].id);
        console.log(user);
        this.router.navigate(['/books']);
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
this.authService.loginLibrarian({username: this.username, password: this.password}).subscribe(
  (librarian) => {
    this.cookieService.set('userLogged', 'librarian', 5);
    console.log(librarian);
    this.cookieService.set('libraryId', librarian[0].LibraryId);
    this.router.navigate(['/books']);
  },
  (error) => {
    console.log(error);
  }
);
  }
}
