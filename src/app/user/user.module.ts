import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import { LibrarianComponent } from './librarian/librarian.component';
import {FormsModule} from '@angular/forms';
import { ContactComponent } from './contact/contact.component';



@NgModule({
  declarations: [MemberComponent, LibrarianComponent, ContactComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class UserModule { }
