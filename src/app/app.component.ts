import {Component, OnInit} from '@angular/core';
import {AuthService} from './login/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'library-app';
  constructor(private auth: AuthService) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    this.auth.localAuthSetup();
  }
}
