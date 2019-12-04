import { Injectable } from '@angular/core';
import {HttpService} from "../core/http-service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpService) { }

  getAllUsers(){
    return this.http.get('users');
  }
}
