import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 private email: any;
 private username: any;
 private password: any;
 private name: any;
 private birthdate: any;
 private cardNumber: any;
 private cardExpiration: any;
 private address: any;
  constructor() { }

  ngOnInit() {
  }
  onRegister() {
    const newUser = {
      username: this.username,
      password: this.password,
      email: this.email,
      name: this.name,
      address: this.address,
      cardNumber: this.cardNumber
    };
    console.log(newUser);
  }

}
