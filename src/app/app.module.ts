import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleNotificationsModule } from 'angular2-notifications';
import {CoreModule} from './core/core.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {BooksListComponent} from './books/books-list/books-list.component';
import {BooksModule} from './books/books.module';
import {MatDialogModule, MatFormFieldModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RentModule} from './rent/rent.module';
import {LoginModule} from './login/login.module';
import {UserModule} from './user/user.module';
import {LibrarianDashboardModule} from './librarian-dashboard/librarian-dashboard.module';
import {HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    BooksModule,
    MatDialogModule,
    RentModule,
    LoginModule,
    UserModule,
    LibrarianDashboardModule

  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
