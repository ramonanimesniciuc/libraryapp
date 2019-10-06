import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {MatMenuModule} from '@angular/material';
import {CookieService} from 'ngx-cookie-service';
import { RedirectComponent } from './redirect/redirect.component';
import { HttpService } from './http-service';




@NgModule({
  declarations: [MenuComponent, HeaderComponent, FooterComponent, RedirectComponent],
  providers:[CookieService,HttpService],
  exports: [
    MenuComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
  ]
})
export class CoreModule { }
