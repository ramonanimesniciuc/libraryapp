import { Injectable } from '@angular/core';
import {HttpService} from '../core/http-service';

@Injectable({
  providedIn: 'root'
})
export class RentsUserService {

  constructor(private http: HttpService) { }

  getUserHistory(userId: any) {
    return this.http.get('rents-history/' + userId);
  }

  getRentsByToday(userId:any){
    return this.http.get('rentedBooksTillToday/' + userId);
  }

  pay(id:any,payment:any){
    return this.http.post('pay/' + id,payment);
  }

  payreservation(payment:any){
    return this.http.post('pay-reservation/',payment);
  }
}
