import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { AuthService } from '../login/auth.service';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService,
              private cookieService: CookieService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.auth.getTokenSilently$().pipe(
      mergeMap(token => {
        const tokenReq = req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        if(!this.cookieService.get('userToken')){
          this.cookieService.set('userToken', token);
        }
        if(!this.cookieService.get('userLogged')){
          this.cookieService.set('userLogged','librarianDemo');
        }
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}
