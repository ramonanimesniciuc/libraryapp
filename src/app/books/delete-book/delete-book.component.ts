import { Component, OnInit } from '@angular/core';
import {BooksService} from '../books.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  constructor(public booksService: BooksService) { }
  public searchValue: string;
  public dataSource: any[] = [];
  public loading: boolean;
  displayedColumns: string[] = ['title', 'author' , 'biblioteque' , 'delete'];
  ngOnInit() {
  }
  search() {
    this.loading = true;
    this.booksService.searchForDelete(this.searchValue).subscribe((results) => {
      console.log(results);
      this.dataSource = results.data;
      this.loading = false;
    });
  }

  delete(bookCopyId: number) {

  }

}
