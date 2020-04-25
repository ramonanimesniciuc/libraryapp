import { Injectable } from '@angular/core';
import {HttpService} from '../core/http-service';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private http: HttpService) { }

  createNewAccount(newUser: any) {
return this.http.post('users', newUser);
  }
  notifyReturn(rentId:number){
    return this.http.get('notifyreturn/' + rentId);
  }

  getRents(libraryId: any) {
    return this.http.get('rents/' + libraryId);
  }

  getRentsByUsers(libraryId: any) {
    return this.http.get('rentsbyusers/' + libraryId);
  }

  returnBook(rentedBook:any) {
    return this.http.post('returnBook', rentedBook);
  }

  getReportOnRentedBooked(){
    return this.http.get('rentedbookdayreport');
  }

  getLibrariesNames(){
    return this.http.get('getLibrariesByName');
  }

  getReportOnCurrentStatus(librarianId: number){
    return this.http.get('currentStatus/' + librarianId);
  }

  getReservedBooksByLibrary(libraryId:any){
    return this.http.get('reservedBooksByLibrary/' + libraryId);
  }

  changeReservationStatus(id:any,newRent:any){
    return this.http.post('changereservationstatus/' + id,newRent);
  }

  deleteReservation(id:any){
    return this.http.get('deletereservation/' + id);
  }
}
