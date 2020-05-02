import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../login/auth.service';
import {BooksService} from '../books.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  private books: any[];
  private locations: any;
  private response: any;
  private loading: boolean;
  public paginationNo:any[];
  public selectedPage:number = 1;
  public categories: any[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              public bookService: BooksService,
              private cookieService: CookieService,
              private authService: AuthService) { }

  ngOnInit() {
    this.paginationNo=[];
    const book = {
      author: 'string',
      cover: 'string',
      libraryId: 'string',
      pages: 0,
      publishDate: '2019-10-02T19:31:02.500Z',
      publishHouse: 'string',
      rating: 0,
      stock: 0,
      title: 'string'
    };
    this.getBooksNumber();
    this.getBooks();
    this.getLibraries();
    this.getCategories();
  }

  changeBookFilter($event) {
    // $event.value=1
   this.filterBooksByLibrary($event.value);
  }

  changeBookFilterCategory($event){
    this.filterBookByCategory($event.value);
  }

  filterBookByCategory(categoryId:number){
this.bookService.filterBooksByCategory(categoryId).subscribe(
  (success)=>{
    this.bookService.books = success.data;
    this.paginationNo = [];
    for(let i=0;i<this.bookService.books.length/6;i++){
      this.paginationNo.push(i+1);
    }
  }
)}
  goToBookVirew(bookId: any) {
    this.router.navigate(['./' + bookId], {relativeTo: this.route});
  }

  pingBookList() {
    const book = {
      author: 'James Oliver',
      cover: 'string',
      libraryId: '8f024e4d-2f3a-488c-9a1e-dccde026c6e3',
      pages: 30,
      publishDate: '2019-10-02T19:31:02.500Z',
      publishHouse: 'Humanitas',
      rating: 4,
      stock: 10,
      title: 'How to cook in style'
    };
    this.bookService.postBook(book).subscribe(
      res => {this.response = JSON.stringify(res, null, 2).trim();
              console.log(this.response);
      }
    );
  }
  filterBooksByLibrary(libraryId: any) {
    this.loading = true;
    this.bookService.filterBooksByLibrary(libraryId).subscribe(
    (books) => {
      this.books = books;
      this.bookService.books = books;
      this.paginationNo = [];
      for(let i=0;i<this.bookService.books.length/6;i++){
        this.paginationNo.push(i+1);
      }
      this.loading = false;
    },
    (error) => {
      console.log(error);
    }
  );
  }
  getBooks() {
    this.loading = true;
    this.bookService.getBooks(this.selectedPage).subscribe(
      (books) => {
       this.books = books;
      this.bookService.books = books;
      this.loading=false;

      }
    );
  }

  //

  goToPag(pagNo:number){
this.selectedPage = pagNo;
   for(let i=0;i< document.getElementsByClassName('page-item').length;i++)
   {
     document.getElementsByClassName('page-item')[i].classList.remove('active');
   }
    document.getElementsByClassName('page-item')[pagNo-1].classList.add('active');
this.getBooks();
  }

  getCategories(){
    this.bookService.getCategories().subscribe(
      (categories)=>{
        this.categories = categories;

      }
    )
  }

  getBooksNumber(){
    this.paginationNo =[];
    this.bookService.getbooksNumber().subscribe(result=>{
      for(let i=0;i<result.number/6;i++){
        this.paginationNo.push(i+1);
      }
    })
  }
  getLibraries() {
    this.bookService.getLibraries().subscribe(
      (libraries) => {
        this.locations = libraries;
      }
    );
  }

}
