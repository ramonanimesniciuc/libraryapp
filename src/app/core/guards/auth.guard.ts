import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate, Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';
import { tap } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router,
              private cookieService: CookieService) {}

  canActivate() {
 if (!this.cookieService.get('userLogged')) {
   this.router.navigate(['/login']);
 }
 return this.auth.checkIfUserIsLogged();
  }

}
