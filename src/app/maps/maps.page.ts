import { Component, OnInit } from '@angular/core';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, Marker,
         MarkerIcon, GoogleMapsAnimation, MyLocation, HtmlInfoWindow } from '@ionic-native/google-maps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})
export class MapsPage implements OnInit {

  map: any;
  log: string;

  constructor() { }

  ngOnInit() {
    this.log = '';

    this.initMap();
  }

  private initMap(){

      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: 40.416775,
            lng: -3.703790
          },
          zoom: 10,
          tilt: 30
        }
      });
  }

}
