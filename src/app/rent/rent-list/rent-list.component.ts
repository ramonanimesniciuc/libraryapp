import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-list',
  templateUrl: './rent-list.component.html',
  styleUrls: ['./rent-list.component.scss']
})
export class RentListComponent implements OnInit {
  private dataSource: any[];
  private displayedColumns: any[];
  constructor() { }

  ngOnInit() {
    this.displayedColumns = ['title', 'startDate', 'endDate', 'condition', 'extraPayment'];
    this.dataSource = [
      // tslint:disable-next-line:max-line-length
      {id: 1, title: 'How to learn C++', startDate: '12/08/2018', endDate: '15/08/2018', extraPayment: '12 RON', condition: '2 pages missing'}
    ];
  }

}
