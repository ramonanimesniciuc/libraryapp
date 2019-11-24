import { Injectable } from '@angular/core';
import {HttpService} from '../core/http-service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService) {
  }
  checkIfUserIsLogged(){
    // if(this.cookieService.get('userLogged')){
    //   return true;
    // }else{
    //   return false;
    // }
    return true;
  }
  login(user:any){
  return this.http.post('login',user);
  }
  logout() {

  }

}
