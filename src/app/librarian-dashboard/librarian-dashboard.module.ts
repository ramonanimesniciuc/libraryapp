import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendBookComponent } from './lend-book/lend-book.component';
import { ReceiveBookBackComponent } from './receive-book-back/receive-book-back.component';
import {BooksModule} from '../books/books.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [LendBookComponent, ReceiveBookBackComponent],
  imports: [
    CommonModule,
    BooksModule,
    FormsModule
  ]
})
export class LibrarianDashboardModule { }
