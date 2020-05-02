import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {CookieService} from 'ngx-cookie-service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  private userLogged: any;
  private showEdit: any;
  constructor(private userService: UserService,
              private notification: NotificationsService,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.userLogged = {
      first_name: 'John Travis',
      email: 'john.travis@gmail.com',
      address: 'Rue Street,No4',
      cardNumber: '1234-5678-1234-9088',
    };
    this.getUserById();
  }
  updateProfile() {
    this.showEdit = false;
    this.userService.updateUser(this.cookieService.get('userDetails')).subscribe(
      (success) => {
  this.notification.success(success.message,'',{timeOut:1700});
  this.showEdit = false;
      },
      (err) => {
        this.notification.error(err);
      }
    );
  }
  showEditProfile() {
    this.showEdit = true;
  }

  getUserById() {
this.userService.getUserById(this.cookieService.get('userDetails')).subscribe(
  (user) => {
    this.userLogged = user;
  },
  (err) => {
    console.log(err);
  }
);
  }

}
