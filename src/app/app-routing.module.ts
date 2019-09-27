import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BooksListComponent} from './books/books-list/books-list.component';
import {BookViewComponent} from './books/book-view/book-view.component';
import {RentListComponent} from './rent/rent-list/rent-list.component';
import {LoginComponent} from './login/login/login.component';
import {RegisterComponent} from './login/register/register.component';
import {MemberComponent} from './user/member/member.component';
import {AuthGuard} from './core/guards/auth.guard';
import {RentBookComponent} from './books/rent-book/rent-book.component';
import {LendBookComponent} from './librarian-dashboard/lend-book/lend-book.component';
import {InterceptorService} from './core/interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AddBookComponent} from './librarian-dashboard/add-book/add-book.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent},
  {path: 'books/:bookId', component: BookViewComponent},
  {path: 'rentedBooks', component: RentListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'my-profile', component: MemberComponent, canActivate: [AuthGuard]},
  {path: 'rent-book', component: LendBookComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, ]
})
export class AppRoutingModule { }
