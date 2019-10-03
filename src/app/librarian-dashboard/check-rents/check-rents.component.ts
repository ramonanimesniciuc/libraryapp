import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-check-rents',
  templateUrl: './check-rents.component.html',
  styleUrls: ['./check-rents.component.scss']
})
export class CheckRentsComponent implements OnInit {

  constructor(public cookieService: CookieService) { }

  ngOnInit() {
  }

}
