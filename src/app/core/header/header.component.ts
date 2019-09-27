import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private avatar: any;
  constructor(private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.userProfile$.pipe().subscribe(
      (user) => {
        console.log(user);
        this.avatar = user ? user.picture : '';
        if(user){
          this.cookieService.set('userLogged',user);
        }
      }
    );

  }

}
