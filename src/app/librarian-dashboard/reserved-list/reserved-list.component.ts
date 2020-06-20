import { Component, OnInit } from '@angular/core';
import {LibrarianService} from "../librarian.service";
import {CookieService} from "ngx-cookie-service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-reserved-list',
  templateUrl: './reserved-list.component.html',
  styleUrls: ['./reserved-list.component.scss']
})
export class ReservedListComponent implements OnInit {
  public reservedBooks:any[];
  public newRent:any;
  public showRent:boolean;
  public endDate:boolean;
  public bookToBeChanged:any;
  constructor(private librarianService: LibrarianService,
              private notificationsService: NotificationsService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.getReservedBooks();
  }

  getReservedBooks(){
    this.librarianService.getReservedBooksByLibrary(Number(this.cookieService.get('libraryId'))).subscribe(
      (books)=>{
        console.log(books);
        this.reservedBooks = books.data;
      }
    );
  }

  deleteReservation(reservationId:any){
   this.librarianService.deleteReservation(reservationId).subscribe(
  (success)=>{
    this.notificationsService.success('Reservation deleted!','',{timeOut:2000});
    this.getReservedBooks();
  }
);
  }

  changeStatus(reservationId:any){
    this.bookToBeChanged=reservationId;
   this.showRent = !this.showRent;
  }

  change(reservation:any){
    console.log(reservation);
    this.newRent={
      startDate:new Date(),
      endDate: this.endDate,
      LibrarianId:1,
      bookCopyId:reservation.bookCopyId,
      UserId:reservation.UserId
    }
    this.librarianService.changeReservationStatus(reservation.id,this.newRent).subscribe(
      (success)=>{
        this.notificationsService.success('Status changed!','',{timeOut:2000});
        this.getReservedBooks();
      }
    );
  }

}
