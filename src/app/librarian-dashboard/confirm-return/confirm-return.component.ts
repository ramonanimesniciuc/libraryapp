import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {NotificationsService} from "angular2-notifications";

@Component({
  selector: 'app-confirm-return',
  templateUrl: './confirm-return.component.html',
  styleUrls: ['./confirm-return.component.scss']
})
export class ConfirmReturnComponent implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: any ,
                private cookieService: CookieService,
                private notifications: NotificationsService,
                public dialogRef: MatDialogRef<ConfirmReturnComponent>) { }
  private rentedBookId:any;
  ngOnInit() {
    this.rentedBookId=this.data.rentedBookId;
  }

  confirmReturn(){

  }

}
