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
  constructor(private cookieService: CookieService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.cookieService.delete('userLogged');
    this.cookieService.delete('userToken');
  }
  loginUser() {
//     if (this.username === 'user' && this.password === 'user') {
// this.cookieService.set('userLogged', 'librarianDemo');
// this.router.navigate(['/books']);
//     }
    this.authService.login();
  }

}
