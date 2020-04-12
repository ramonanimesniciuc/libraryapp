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
}
