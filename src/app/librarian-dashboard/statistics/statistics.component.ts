import { Component, OnInit } from '@angular/core';
import {LibrarianService} from '../librarian.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  constructor(private librarianService: LibrarianService,
              private cookieService: CookieService) { }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Rented Books'},
    {data: [], label: 'Reserved Books'}
  ];

  public doughnutChartOptions = {
    responsive: true
  };

  public doughnutChartLabels = ['Rented', 'Booked', 'Availables'];
  public doughnutChartData = [];
  public doughnutChartType = 'pie';
  ngOnInit() {
    this.getReportOnRentedBooked();
    this.getLibrariesNAMES();
    this.getCurrentStatus();
  }

  getReportOnRentedBooked() {
    this.librarianService.getReportOnRentedBooked().subscribe(
      (data) => {
        console.log(data);
        this.barChartData[0].data = data.data1;
        this.barChartData[1].data = data.data2;
      }
    );
  }

  getLibrariesNAMES() {
    this.librarianService.getLibrariesNames().subscribe(
      (libraries) => {
        this.barChartLabels = libraries.data;
      }
    );
  }

  getCurrentStatus() {
this.librarianService.getReportOnCurrentStatus(Number(this.cookieService.get('userDetails'))).subscribe(
  (results) => {
     this.doughnutChartData = results.results;
  }
);
  }

}
