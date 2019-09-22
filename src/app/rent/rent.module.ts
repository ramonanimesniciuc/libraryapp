import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentListComponent } from './rent-list/rent-list.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [RentListComponent],
  imports: [
    CommonModule,
    MatTableModule
  ],
  exports:[MatTableModule]
})
export class RentModule { }
