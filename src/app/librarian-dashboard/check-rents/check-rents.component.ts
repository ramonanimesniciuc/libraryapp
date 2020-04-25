import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {LibrarianService} from '../librarian.service';
import {MatDialog} from '@angular/material/dialog';
import {RentBookComponent} from '../../books/rent-book/rent-book.component';
import {ConfirmReturnComponent} from '../confirm-return/confirm-return.component';

@Component({
  selector: 'app-check-rents',
  templateUrl: './check-rents.component.html',
  styleUrls: ['./check-rents.component.scss']
})
export class CheckRentsComponent implements OnInit {
  private rents: any[];
  private rentsbyusers: any[];
  private displayColumns: any[];
  constructor(public cookieService: CookieService,
              public librarianService: LibrarianService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.displayColumns = ['user', 'book', 'status', 'email' , 'return'];
    this.rents = [
      {
        book: 'Lonely wolf',
        user: 'Tom Beiling',
        status: 'pendding'
      }
    ];
    this.getAllRentsFromLocation();
    this.getAllRentsByUsers();
  }

  getAllRentsFromLocation() {
    console.log(this.cookieService.get('libraryId'));
    this.librarianService.getRents(this.cookieService.get('libraryId')).subscribe(
    (rents) => {
     this.rents = rents;
    },
    (err) => {
      console.log(err);
    }
  );
  }

  getAllRentsByUsers() {
    this.librarianService.getRentsByUsers(this.cookieService.get('libraryId')).subscribe(
      (rents) => {
        this.rentsbyusers = rents;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  notifyReturn(rentId:any){
this.librarianService.notifyReturn(rentId).subscribe((success)=>{
  console.log(success);
})
  }

  needsReturn(el:any){
    console.log(el.endDate <= new Date());
    return new Date(el.endDate) <= new Date();
  }

  returnBook(book: any) {
    const dialogRef = this.dialog.open(ConfirmReturnComponent, {
      width: '700px',
      data: {Book: book.bookCopy.book,
        Library: book.bookCopy.Library,
        rentedBookId: book.id,
        bookId: book.bookCopy.bookId,
        libraryId: book.bookCopy.LibraryId,
        bookCopyId: book.bookCopyId ,
        UserId: book.UserId ,
        startDate: book.startDate ,
        endDate: book.endDate}
    });
    dialogRef.afterClosed().subscribe(result => {
     this.getAllRentsByUsers();
     this.getAllRentsFromLocation();
    });
  }

}
