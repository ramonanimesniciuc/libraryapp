import { Component, OnInit } from '@angular/core';
import {BooksService} from '../books.service';
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {

  constructor(public booksService: BooksService,
              private notificationsService: NotificationsService) { }
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
this.booksService.deleteCopy(bookCopyId).subscribe(
  (success)=>{
    this.notificationsService.success(success.message,'',{timeOut:2000});
    this.dataSource = [];
  }
)
  }

}
