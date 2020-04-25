import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BooksService} from '../../books/books.service';
import {NotificationsService} from 'angular2-notifications';
import {CookieService} from 'ngx-cookie-service';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
  selectedFile: ImageSnippet;
 private addForm: FormGroup;
 private authors: any[];
 private statuses: any[];
 private categories: any[];
 private publishHouses: any[];
 private libraries: any[];
 private bookCopies: any[];
 public authorForm:FormGroup;
  private imageSrc: string = '';
  fileData: File = null;
  previewUrl: any = null;
  cover: any;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private formBuilder: FormBuilder,
              private notifications: NotificationsService,
              private cookieService: CookieService,
              private bookService: BooksService) { }

  ngOnInit() {
    this.publishHouses = [];
    this.categories = [];
    this.bookCopies = [];
    this.authors = [];
    this.authorForm = this.formBuilder.group({
      name:new FormControl('')
    })
    this.addForm = this.formBuilder.group({
      AuthorId: new FormControl('', Validators.required),
      cover: new FormControl('',Validators.required),
      pages: new FormControl(1 , Validators.required),
      categoryId: new FormControl(1 , Validators.required),
      PublishingHouseId: new FormControl('', Validators.required),
      publishedDate: new FormControl(new Date(), Validators.required),
      title: new FormControl('', Validators.required),
      stock: new FormControl(1, Validators.required),
      description: new FormControl('', Validators.required),
      rating: new FormControl(3.4, Validators.required),
    });

    this.getAuthors();
    this.getCategories();
    this.getPublishingHouses();
    this.getLibraries();
    this.getStatuses();
  }

  addAuthor(){
this.bookService.addAuthor(this.authorForm.value).subscribe(
  (success)=>{
    this.notifications.success('Author :' + this.authorForm.get('name').value + ' added!','',{timeout:2000});
    setTimeout(()=>{
      location.reload();
    },1000);
  }
)
  }

  addNewBook() {
    if (this.addForm.get('stock').value === this.bookCopies.length) {
      this.bookService.postBook(this.addForm.value).subscribe(
        (succes) => {
          // this.addForm.reset();
          this.notifications.success('Book added successfully!');
          this.bookCopies.forEach((copy) => {
            copy.bookId = succes.id;
          });
          this.bookService.postBookCopies(this.bookCopies).subscribe(
            (success) => {
              this.addForm.reset();
              this.bookCopies = [];
              this.notifications.success('Book copies added successfully!');
            },
            (err) => {
              console.log(err);
            }
          );
        },
        (error) => {
          this.notifications.error(error.message);
        }
      );
    } else {
      this.notifications.alert('Your book stock has to equal the number of book copies!');
    }

  }

  getPublishingHouses() {
this.bookService.getPublishHouses().subscribe(
  (publishingHouses) => {
    this.publishHouses = publishingHouses;
  },
  (error) => {
    console.log(error);
  }
);
  }

  addBookCopies() {
  const newCopy = {
    LibraryId: '',
    bookStatusId: '',
    comment: '',
    bookId: ''
  };
  this.bookCopies.push(newCopy);
  }


  getAuthors() {
this.bookService.getAuthors().subscribe(
  (authors) => {
    this.authors = authors;
  },
  (error) => {
    console.log(error);
  }
);
  }
  // processFile(fileInput: any) {
  //   this.fileData = fileInput.target.files[0] as File;
  //   console.log(this.fileData);
  //   this.preview();
  // }
  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.cover = myReader.result;
      this.addForm.get('cover').setValue(this.cover);
    };
    myReader.readAsDataURL(file);
    this.preview();
  }
  preview() {
    // Show preview
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    // tslint:disable-next-line:variable-name
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };
  }
  getLibraries() {
    this.bookService.getLibraries().subscribe(
      (libraries) => {
        this.libraries = libraries;
        console.log(this.libraries);
      }
    );
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.imageSrc = reader.result;
    this.addForm.get('cover').setValue(this.imageSrc);
    console.log(this.imageSrc)
  }
 getCategories() {
this.bookService.getCategories().subscribe(
  (categories) => {
    this.categories = categories;
  },
  (error) => {
    console.log(error);
  }
);
 }

 getStatuses() {
    this.bookService.getStatuses().subscribe(
      (statuses) => {
        this.statuses = statuses;
      },
      (error) => {
      console.log(error);
      });
 }
}
