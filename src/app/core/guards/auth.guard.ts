import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LoginService} from '../../login/login.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: LoginService,
    private router: Router
  ) { }

  canActivate() {
    this.authenticationService.checkLogin();

    if (!this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }

    return this.authenticationService.isLoggedIn();
  }
}