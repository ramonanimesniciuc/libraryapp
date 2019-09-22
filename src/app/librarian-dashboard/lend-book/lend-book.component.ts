import { Component, OnInit } from '@angular/core';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-lend-book',
  templateUrl: './lend-book.component.html',
  styleUrls: ['./lend-book.component.scss']
})
export class LendBookComponent implements OnInit {
  private users: any[];
  private selectedBook: any;
  private possibleBooks: any[];
  private filteredBooks: any[];

  constructor() {
  }

  ngOnInit() {
    this.selectedBook='';
    this.users = [{id: 1, name: 'Florentina Ion'}];
    this.possibleBooks = [{
      id: 1,
      title: 'A love story',
      author: 'A.S.Princke',
      status: 'available',
      cover: 'https://images-na.ssl-images-amazon.com/images/I/51Jwl5TIcuL._SX308_BO1,204,203,200_.jpg'
    },
      {
        id: 2,
        title: 'One Day',
        author: 'Henry Smith',
        status: 'rented',
        cover: 'https://images4.penguinrandomhouse.com/cover/9780307946713'
      },
      {
        id: 3,
        title: 'The ABC murders',
        author: 'Agatha Christie',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'
      },
      {
        id: 4,
        title: 'The ABC murders',
        author: 'Agatha Christie',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'
      },
      {
        id: 3,
        title: 'The ABC murders',
        author: 'Agatha Christie',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'
      },
      {
        id: 4,
        title: 'The ABC murders',
        author: 'Agatha Christie',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/513J5erqllL._SX308_BO1,204,203,200_.jpg'
      },
      // tslint:disable-next-line:max-line-length
      {
        id: 5,
        title: 'Death on the Nile',
        author: 'Agatha Christie',
        cover: 'https://kbimages1-a.akamaihd.net/0b20f759-14c8-4609-98aa-f54fcd3f6f5e/353/569/90/False/death-on-the-nile.jpg'
      }];
  }

}
