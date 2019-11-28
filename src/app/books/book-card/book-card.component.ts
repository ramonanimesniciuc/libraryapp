import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input('author')author: any;
  @Input('title')title: any;
  @Input('cover')cover: any;
  @Input('review')review: any;
  @Input('status')status: any;
  @Input('rating')rating:any;
  constructor() { }

  ngOnInit() {
  }

}
