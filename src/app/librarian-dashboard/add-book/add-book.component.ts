import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
 private addForm: FormGroup;
 private authors: any[];
 private categories: any[];
 private publishHouses:any[];
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.publishHouses=[{id:1,name:'Humanitas'}];
    this.categories = [{id: 1, name: 'Drama'}];
    this.authors = [{id: 1, name: 'Agatha Christie'}];
    this.addForm = this.formBuilder.group({
      author: new FormControl(''),
      cover: new FormControl(''),
      libraryId: new FormControl(1),
      pages: new FormControl(1),
      publishHouse: new FormControl(''),
      publishedDate: new FormControl('23/09/2010'),
      title: new FormControl(''),
      stock: new FormControl(1),
      rating: new FormControl(3.4)
    });
  }

}
