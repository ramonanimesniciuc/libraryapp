import { Injectable } from '@angular/core';
import {HttpService} from '../core/http-service';

@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  constructor(private http: HttpService) { }

  createNewAccount(newUser: any) {
return this.http.post('', newUser);
  }
}
