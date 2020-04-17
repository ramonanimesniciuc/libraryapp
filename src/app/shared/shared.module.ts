import {
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OnlyDate} from './pipes/onlyDate.pipe';
import {SafeHtml} from "./pipes/safeHtml.pipe";


@NgModule({
  declarations: [
OnlyDate,
    SafeHtml
  ],
  imports: [

  ],
  providers: [

  ],
  exports: [
OnlyDate,SafeHtml
  ],
  entryComponents: [
  ]
})
export class SharedModule {
}
