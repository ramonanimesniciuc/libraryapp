import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from '../../login/auth.service';
import {BooksService} from '../../books/books.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private avatar: any;
  private profileJson: any;
  constructor(private cookieService: CookieService,
              private booksService: BooksService,
              public router:Router,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }
  searchValue: string;

  ngOnInit() {
    console.log(this.router);
  }

  logout() {
    this.cookieService.delete('userLogged');
  }

  search() {
this.booksService.search(this.searchValue).subscribe((results)=>{
  console.log(results);
  this.searchValue = '';
  this.booksService.books = results.data;
  this.router.navigate(['/books']);

});
  }

}
