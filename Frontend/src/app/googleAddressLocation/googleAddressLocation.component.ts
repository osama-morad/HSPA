import { Component, OnInit, ElementRef, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { HereLocationService } from '../services/hereLocation.service';
import { AddressInfo } from '../model/addressInfo';
import { GoogleLocationService } from '../services/googleLocation.service';

@Component({
  selector: 'app-googleAddressLocation',
  templateUrl: './googleAddressLocation.component.html',
  styleUrls: ['./googleAddressLocation.component.css']
})
export class GoogleAddressLocationComponent implements OnInit {
  @ViewChild('mapGoogleContainer', {static: false}) gmap: ElementRef;
  @Input() zoom : number=18;
  @Input() latitude: number=0;
  @Input() longitude: number=0;

  @Output() setAddressInfo: EventEmitter<AddressInfo> = new EventEmitter();

  map: google.maps.Map;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;
  addressInfo = new AddressInfo();
  position: string;
  locations: Array<any>;

  constructor(
    private hereLocation: HereLocationService,
    private googleLocation: GoogleLocationService
  ) { }

  ngOnInit() {
    this.getCurrentLocationAddress();
  }

  getCurrentLocationAddress(){
    if (!navigator.geolocation){
      console.log('Location not supported');
    }else{
       navigator.geolocation.getCurrentPosition((position) => {
       this.latitude = position.coords.latitude
       this.longitude = position.coords.longitude;
       this.initMap();
       this.getAddress();
      });
    }
  }
  getAddress(){
    console.log(+this.latitude + ' - ' + +this.longitude);
    if (this.latitude != 0 && this.longitude != 0){
      this.position = String(this.latitude) + ',' + String(this.longitude);
      // this.hereLocation.getAddressFromLatLng(this.position).then(result => {
      //   this.locations = <Array<any>>result;
      //   console.log(JSON.stringify(this.locations));
      //   this.addressInfo.city = this.locations[0].Location.Address.City;//.AdditionalData[1].value; 
      //   this.addressInfo.county_gov = this.locations[0].Location.Address.County;
      //   this.addressInfo.address = this.locations[0].Location.Address.Label;
      //   this.mapInitializer();
      //   this.invokeEvent(this.addressInfo);
      // }, error => {
      //     console.error(error);
      // });
      // this.googleLocation.geocodeAddress(this.position).subscribe(
      //   data=>
      //   {
      //     this.addressInfo.address = data;
      //     this.mapInitializer();
      //   }, error=>{
      //     console.log(error);
      //   }
      // );
        this.googleLocation.geocodeAddress(this.position).then(result => {
        this.locations = <Array<any>>result;
        console.log(JSON.stringify(this.locations));
        this.addressInfo.city = this.locations['address_components'][2]['long_name'];//.AdditionalData[1].value; 
        this.addressInfo.county_gov = this.locations['address_components'][3]['long_name'];
        this.addressInfo.address = this.locations['formatted_address'];
        this.mapInitializer();
        this.invokeEvent(this.addressInfo);
      }, error => {
          console.error(error);
      });
    }
    
  }

  initMap(){
    this.coordinates = new google.maps.LatLng(this.latitude, this.longitude);
    this.mapOptions  = {
      center: this.coordinates,
      zoom: this.zoom
    };
    this.marker = new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
      title: 'Desired location',
      draggable: true
    });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
    this.marker.addListener("dragend", (e) => {
      this.handleDragEnd(e)
    });
  }

  handleDragEnd(e)
  {
    this.position = String(e.latLng.lat()) + ',' + String(e.latLng.lng());
    this.hereLocation.getAddressFromLatLng(this.position).then(result => {
      this.locations = <Array<any>>result;
      console.log(JSON.stringify(this.locations));
      this.addressInfo.city = this.locations[0].Location.Address.City;//.AdditionalData[1].value; 
      this.addressInfo.county_gov = this.locations[0].Location.Address.County; 
      this.addressInfo.address = this.locations[0].Location.Address.Label;
      this.invokeEvent(this.addressInfo);
    }, error => {
        console.error(error);
    });
  }

  invokeEvent(addressInfo: AddressInfo) {
    this.setAddressInfo.emit(addressInfo);
  }

}
