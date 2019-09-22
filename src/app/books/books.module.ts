import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { RentBookComponent } from './rent-book/rent-book.component';
import { BookCardComponent } from './book-card/book-card.component';
import { BookViewComponent } from './book-view/book-view.component';
import {MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ReserveBookComponent } from './reserve-book/reserve-book.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [BooksListComponent, RentBookComponent, BookCardComponent, BookViewComponent, ReserveBookComponent],
  imports: [
    MatSelectModule,
    CommonModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  entryComponents: [RentBookComponent, ReserveBookComponent],
  exports: [ BooksListComponent, MatDatepickerModule, RentBookComponent, MatInputModule, MatSelectModule, MatFormFieldModule, MatAutocompleteModule]
})
export class BooksModule { }
