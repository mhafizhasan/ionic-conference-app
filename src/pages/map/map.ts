import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform } from 'ionic-angular';


declare var google: any;


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform) {

    // platform.ready().then(() => { 
    //   this.loadMap();
    //  });

  }

  ionViewDidLoad() {

      let mapEle = document.getElementById('map_canvas');
      let map = new google.maps.Map(mapEle, {
        center: new google.maps.LatLng(43.071584, -89.380120),
        zoom: 16
      });

      let infoWindow = new google.maps.InfoWindow({
        content: `<div class="marker_maps"><h2>Title</h2></div>`
      });

      var image = {
        url: 'assets/img/marker.png', // image is 256 x 256
        scaledSize : new google.maps.Size(60, 60),
      };

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(43.071584, -89.380120),
        map: map,
        icon: image,
        title: 'Title'
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

    // google.maps.event.addListenerOnce(map, 'idle', () => {
    //   mapEle.classList.add('show-map');
    // });

      // this.confData.getMap().subscribe((mapData: any) => {

        // let mapEle = this.mapElement.nativeElement;

        // let map = new google.maps.Map(mapEle, {
        //   center: true,
        //   zoom: 16
        // });

        // // mapData.forEach((markerData: any) => {
        //   let infoWindow = new google.maps.InfoWindow({
        //     content: `<h5>Kompleks Perbadanan Putrajaya</h5>`
        //   });

        //   let marker = new google.maps.Marker({
        //     position: '2.9177944,101.6822463',
        //     map: map,
        //     title: 'Kompleks Perbadanan Putrajaya'
        //   });

        //   marker.addListener('click', () => {
        //     infoWindow.open(map, marker);
        //   });
        // // });

        // google.maps.event.addListenerOnce(map, 'idle', () => {
        //   mapEle.classList.add('show-map');
        // });

      // });

  }

  loadMap() {

      let mapEle = document.getElementById('map');
      let map = new google.maps.Map(mapEle, {
        center: new google.maps.LatLng(43.071584, -89.380120),
        zoom: 16
      });

      let infoWindow = new google.maps.InfoWindow({
        content: `<div class="marker_maps"><h2>Title</h2></div>`
      });

      var image = {
        url: 'assets/img/marker.png', // image is 256 x 256
        scaledSize : new google.maps.Size(60, 60),
      };

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(43.071584, -89.380120),
        map: map,
        icon: image,
        title: 'Title'
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

    // google.maps.event.addListenerOnce(map, 'idle', () => {
    //   mapEle.classList.add('show-map');
    // });
  }

}
