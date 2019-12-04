import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'onlyDate'
})

export class OnlyDate implements PipeTransform {
  transform(date: any): string {
    // tslint:disable-next-line:one-variable-per-declaration
    const dateTime = new Date(date),
      months = new Array(7);
    months[0] =  'Jan.';
    months[1] = 'Feb';
    months[2] = 'Mar.';
    months[3] = 'Apr.';
    months[4] = 'May';
    months[5] = 'Jun.';
    months[6] = 'Jul.';
    months[7] = 'Aug.';
    months[8] = 'Sept.';
    months[9] = 'Oct.';
    months[10] = 'Nov.';
    months[11] = 'Dec.';
    return  (dateTime.getDate() < 10 ? '0' : '') + dateTime.getDate()  + ' ' + months[dateTime.getMonth()] +  ' ' + dateTime.getFullYear();
  }
}
