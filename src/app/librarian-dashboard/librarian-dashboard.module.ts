import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LendBookComponent } from './lend-book/lend-book.component';
import { ReceiveBookBackComponent } from './receive-book-back/receive-book-back.component';
import {BooksModule} from '../books/books.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AddBookComponent } from './add-book/add-book.component';
import {MatButtonModule} from '@angular/material';
import { CreateUserAccountComponent } from './create-user-account/create-user-account.component';
import { CheckRentsComponent } from './check-rents/check-rents.component';
import {RentModule} from '../rent/rent.module';


@NgModule({
  declarations: [LendBookComponent, ReceiveBookBackComponent, AddBookComponent, CreateUserAccountComponent, CheckRentsComponent],
  imports: [
    CommonModule,
    BooksModule,
    FormsModule,
    RentModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class LibrarianDashboardModule { }
