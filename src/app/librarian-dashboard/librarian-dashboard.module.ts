import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendBookComponent } from './lend-book/lend-book.component';
import { ReceiveBookBackComponent } from './receive-book-back/receive-book-back.component';
import {BooksModule} from '../books/books.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import {MatButtonModule} from '@angular/material';


@NgModule({
  declarations: [LendBookComponent, ReceiveBookBackComponent, AddBookComponent],
  imports: [
    CommonModule,
    BooksModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class LibrarianDashboardModule { }
