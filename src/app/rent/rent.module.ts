import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentListComponent } from './rent-list/rent-list.component';
import {MatTableModule} from '@angular/material/table';
import {AppModule} from '../app.module';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [RentListComponent],
  imports: [
    CommonModule,
    MatTableModule,
    SharedModule
  ],
  exports: [MatTableModule]
})
export class RentModule { }
