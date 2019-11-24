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
import {AddBookComponent} from './librarian-dashboard/add-book/add-book.component';
import {RedirectComponent} from './core/redirect/redirect.component';
import {CreateUserAccountComponent} from './librarian-dashboard/create-user-account/create-user-account.component';
import {CheckRentsComponent} from './librarian-dashboard/check-rents/check-rents.component';
import {DeleteBookComponent} from './books/delete-book/delete-book.component';
import {ContactComponent} from './user/contact/contact.component';



const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'books', component: BooksListComponent, canActivate: [AuthGuard]},
  {path: 'redirect', component: RedirectComponent},
  {path: 'books/:bookId', component: BookViewComponent},
  {path: 'rentedBooks', component: RentListComponent, },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'add-book', component: AddBookComponent},
  {path: 'check-rents', component: CheckRentsComponent},
  {path: 'create-user-account', component: CreateUserAccountComponent},
  {path: 'delete-book', component: DeleteBookComponent},
  {path: 'my-profile', component: MemberComponent, canActivate: [AuthGuard]},
  {path: 'rent-book', component: LendBookComponent, canActivate: [AuthGuard]},
  {path: 'contact', component: ContactComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard ]
})
export class AppRoutingModule { }
