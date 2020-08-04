import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
import { HereLocationService } from '../services/hereLocation.service';
declare var H: any;
@Component({
  selector: 'app-here-address-location',
  templateUrl: './here-address-location.component.html',
  styleUrls: ['./here-address-location.component.css']
})
export class HereAddressLocationComponent implements OnInit {
  @ViewChild("map") mapElement: ElementRef;
  @Input() apikey: any;
  @Input() lat: number;
  @Input() lng: number;
  @Input() width: any;
  @Input() height: any;
  @Input() zoom : number=18;
  public platform: any;
  public defaultLayers: any;
  public map: any;

  constructor() { }

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    this.platform = new H.service.Platform({
      "apikey": this.apikey
    });
    this.defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
        this.mapElement.nativeElement,
        this.defaultLayers.vector.normal.map, //.defaultLayers.normal.map
        {
            zoom: this.zoom,
            center: { lat: this.lat, lng: this.lng }
        }
    );
  }
}
