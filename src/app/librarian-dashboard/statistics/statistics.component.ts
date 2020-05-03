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
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 45
        }
      }],
      xAxes:[{
        ticks:{
          fontSize:45
        }
      }]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)',
        fontSize:45
      }
    }
  };
  public barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [], label: 'Rented Books'},
    {data: [], label: 'Reserved Books'}
  ];

  public doughnutChartOptions = {
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: 'rgb(255, 99, 132)',
        fontSize:45
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          fontSize: 70
        }
      }]
    }
  };


  public doughnutChartLabels = ['Rented', 'Booked', 'Availables'];
  public doughnutChartData = [1,1,1];
  public doughnutChartType = 'doughnut';

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
this.librarianService.getReportOnCurrentStatus(Number(this.cookieService.get('userDetails')) + 1).subscribe(
  (results) => {
     this.doughnutChartData = results.results;
  }
);
  }

}
