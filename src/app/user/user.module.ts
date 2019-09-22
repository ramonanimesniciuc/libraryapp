import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberComponent } from './member/member.component';
import { LibrarianComponent } from './librarian/librarian.component';



@NgModule({
  declarations: [MemberComponent, LibrarianComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
