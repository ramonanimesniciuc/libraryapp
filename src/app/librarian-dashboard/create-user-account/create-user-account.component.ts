import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LibrarianService} from '../librarian.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-create-user-account',
  templateUrl: './create-user-account.component.html',
  styleUrls: ['./create-user-account.component.scss']
})
export class CreateUserAccountComponent implements OnInit {
  private group: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private notification: NotificationsService,
              private librarianService: LibrarianService) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      email: new FormControl('', Validators.email),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birthdate: new FormControl(new Date()),
      enrollment_date: new FormControl(new Date()),
      username: new FormControl('')
    });
  }
  createAccount() {
this.librarianService.createNewAccount(this.group.value).subscribe(
  (succes) => {
    this.notification.success('Account created!');
    this.group.reset();
  },
  (error) => {
    this.notification.error(error);
  }
);
  }

}
