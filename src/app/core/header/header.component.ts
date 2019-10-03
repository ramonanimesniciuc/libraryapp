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
  private profileJson: any;
  constructor(private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.userProfile$.subscribe(
      profile => this.profileJson = JSON.stringify(profile, null, 2)
    );

  }

}
