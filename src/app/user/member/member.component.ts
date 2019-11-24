import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  private userLogged: any;
  private showEdit: any;
  constructor() { }

  ngOnInit() {
    this.userLogged = {
      name: 'John Travis',
      email: 'john.travis@gmail.com',
      address: 'Rue Street,No4',
      cardNumber: '1234-5678-1234-9088',
    };
  }
  updateProfile(){
    this.showEdit=false;
  }
  showEditProfile() {
    this.showEdit = true;
  }

}
