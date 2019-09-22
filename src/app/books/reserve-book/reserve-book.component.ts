import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reserve-book',
  templateUrl: './reserve-book.component.html',
  styleUrls: ['./reserve-book.component.scss']
})
export class ReserveBookComponent implements OnInit {
  private timeOptions: any[];
  private  selectedTime: any;
  constructor() { }

  ngOnInit() {
    this.selectedTime={price:'0 Ron'};
    this.timeOptions = [
      {id: 1, value: '2 hours', price: '3 RON'},
      {id: 2, value: '10 hours', price: '5 RON'},
      {id: 3, value: '24 hours', price: '10 RON'}
    ];
  }

}
