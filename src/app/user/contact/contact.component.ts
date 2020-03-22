import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {BooksService} from '../../books/books.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  libraries: any[];
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
  };

  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
  });

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.mapInitializer();
  }

  mapInitializer() {
    this.getLibraries();
    this.map = new google.maps.Map(this.gmap.nativeElement,
      this.mapOptions);

  }

  codeAddress(geocoder, map , libraries:any) {
libraries.forEach((lib)=>{
  geocoder.geocode({address: lib.address}, (results, status) => {
    if (status === 'OK') {
      map.setCenter(results[0].geometry.location);
      const marker = new google.maps.Marker({
        map,
        position: results[0].geometry.location
      });
    } else {
      console.log(status);
    }
  });
})
  }
  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }

  getLibraries() {
    this.booksService.getLibraries().subscribe(
      (libraries) => {
        this.libraries = libraries;
        const geocoder = new google.maps.Geocoder();
        // this.marker.setMap(this.map);
        this.codeAddress(geocoder, this.map,this.libraries);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
