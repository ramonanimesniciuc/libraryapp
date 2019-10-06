import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-check-rents',
  templateUrl: './check-rents.component.html',
  styleUrls: ['./check-rents.component.scss']
})
export class CheckRentsComponent implements OnInit {
  private rents: any[];
  private displayColumns: any[];
  constructor(public cookieService: CookieService) { }

  ngOnInit() {
    this.displayColumns = ['user', 'book', 'status','email'];
    this.rents = [
      {
        book: 'Lonely wolf',
        user: 'Tom Beiling',
        status: 'pendding'
      }
    ];
  }

}
