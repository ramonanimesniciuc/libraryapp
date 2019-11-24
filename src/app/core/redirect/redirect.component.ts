import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../login/auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

}
