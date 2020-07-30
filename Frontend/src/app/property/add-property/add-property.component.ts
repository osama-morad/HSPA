import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs/public_api';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HereLocationService } from 'src/app/services/hereLocation.service';
import {  AfterViewInit, ElementRef } from  '@angular/core';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  nextClicked: boolean;
  property = new Property();

  // Map section
  latitude: number;
  longitude: number;
  zoom:number;
  map: google.maps.Map;
  coordinates: google.maps.LatLng;
  mapOptions: google.maps.MapOptions;
  marker: google.maps.Marker;

  // Will come from masters
  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex']
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished']

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  public position: string;
  public locations: Array<any>;
  public address: string="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private housingService: HousingService,
    private alertify: AlertifyService,
    private hereLocation: HereLocationService) { }

  ngOnInit() {
    this.getAddressFromLatLng();
    //this.getCurrentLocationAddress();
    this.CreateAddPropertyForm();
    }

  public getAddressFromLatLng() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.position = String(position.coords.latitude) + ',' + String(position.coords.longitude);

      //Map section
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      this.zoom = 18;
      //console.log('Lat: ' + this.latitude+' - Long: ' + this.longitude+' - Zoom: ' + +this.zoom);

      //console.log(this.position);
      this.hereLocation.getAddressFromLatLng(this.position).then(result => {
        this.locations = <Array<any>>result;
        //console.log(JSON.stringify(this.locations));
        this.propertyView.City = this.locations[0].Location.Address.AdditionalData[1].value; 
        this.address = this.locations[0].Location.Address.Label;
        console.log(this.address);
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
        this.mapInitializer();
      }, error => {
          console.error(error);
      });
    });  
  }
  getCurrentLocationAddress(){
    if (!navigator.geolocation){
      console.log('Location not supported');
    }else{
       navigator.geolocation.getCurrentPosition((position) => {
        // console.log('Latitude: ', String(position.coords.latitude));
        // console.log('Longitude: ', position.coords.longitude);
        this.propertyView.City = 'Latitude: ' + String(position.coords.latitude) + ' - Longitude: ' + String(position.coords.longitude);
      });
    }
  }

   mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, 
    this.mapOptions);
    this.marker.setMap(this.map);
    
    // this.map.addListener("click", (e) => {
    //   this.handleMapClick(e);
    // });
    //Adding Dragend event to marker
    this.marker.addListener("dragend", (e) => {
      this.handleDragEnd(e)
    });
  }

  handleMapClick(e)
  {
    this.position = String(e.latLng.lat()) + ',' + String(e.latLng.lng());
    this.hereLocation.getAddressFromLatLng(this.position).then(result => {
      this.locations = <Array<any>>result;
      //console.log(JSON.stringify(this.locations));
      this.propertyView.City = this.locations[0].Location.Address.AdditionalData[1].value; 
      this.address = this.locations[0].Location.Address.Label;
      //console.log(this.address);
      // this.coordinates = new google.maps.LatLng(this.latitude, this.longitude);
      // this.mapOptions  = {
      //   center: this.coordinates,
      //   zoom: this.zoom
      //  };
    }, error => {
        console.error(error);
    });
  }

  handleDragEnd(e)
  {
     this.position = String(e.latLng.lat()) + ',' + String(e.latLng.lng());
    //console.log(this.position);
    this.hereLocation.getAddressFromLatLng(this.position).then(result => {
      this.locations = <Array<any>>result;
      //console.log(JSON.stringify(this.locations));
      this.propertyView.City = this.locations[0].Location.Address.AdditionalData[1].value; 
      this.address = this.locations[0].Location.Address.Label;
      //console.log(this.address);
      // this.coordinates = new google.maps.LatLng(this.latitude, this.longitude);
      // this.mapOptions  = {
      //   center: this.coordinates,
      //   zoom: this.zoom
      //  };
      //this.marker.setMap(this.map);
    }, error => {
        console.error(error);
    });
  }

  getAddress(place: object) { 
    this.address = place['formatted_address'];
    console.log('getAddress');
  }

  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['1' , Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required]
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherInfo: this.fb.group({
        RTM: [null, Validators.required],
        PossessionOn: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null]
      })
      });
  }

//#region <Getter Methods>
  // #region <FormGroups>
      get BasicInfo() {
        return this.addPropertyForm.controls.BasicInfo as FormGroup;
      }

      get PriceInfo() {
        return this.addPropertyForm.controls.PriceInfo as FormGroup;
      }

      get AddressInfo() {
        return this.addPropertyForm.controls.AddressInfo as FormGroup;
      }

      get OtherInfo() {
        return this.addPropertyForm.controls.OtherInfo as FormGroup;
      }
  // #endregion

  //#region <Form Controls>
      get SellRent() {
        return this.BasicInfo.controls.SellRent as FormControl;
      }

      get BHK() {
        return this.BasicInfo.controls.BHK as FormControl;
      }

      get PType() {
        return this.BasicInfo.controls.PType as FormControl;
      }

      get FType() {
        return this.BasicInfo.controls.FType as FormControl;
      }

      get Name() {
        return this.BasicInfo.controls.Name as FormControl;
      }

      get City() {
        return this.BasicInfo.controls.City as FormControl;
      }

      get Price() {
        return this.PriceInfo.controls.Price as FormControl;
      }

      get BuiltArea() {
        return this.PriceInfo.controls.BuiltArea as FormControl;
      }

      get CarpetArea() {
        return this.PriceInfo.controls.CarpetArea as FormControl;
      }

      get Security() {
        return this.PriceInfo.controls.Security as FormControl;
      }

      get Maintenance() {
        return this.PriceInfo.controls.Maintenance as FormControl;
      }

      get FloorNo() {
        return this.AddressInfo.controls.FloorNo as FormControl;
      }

      get TotalFloor() {
        return this.AddressInfo.controls.TotalFloor as FormControl;
      }

      get Address() {
        return this.AddressInfo.controls.Address as FormControl;
      }

      get LandMark() {
        return this.AddressInfo.controls.LandMark as FormControl;
      }

      get RTM() {
        return this.OtherInfo.controls.RTM as FormControl;
      }

      get PossessionOn() {
        return this.OtherInfo.controls.PossessionOn as FormControl;
      }

      get AOP() {
        return this.OtherInfo.controls.AOP as FormControl;
      }

      get Gated() {
        return this.OtherInfo.controls.Gated as FormControl;
      }

      get MainEntrance() {
        return this.OtherInfo.controls.MainEntrance as FormControl;
      }

      get Description() {
        return this.OtherInfo.controls.Description as FormControl;
      }

  //#endregion
//#endregion

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextClicked = true;
    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
      this.alertify.successMsg('Congrats, your property listed successfully on our website');
      console.log(this.addPropertyForm);

      if(this.SellRent.value === '2') {
        this.router.navigate(['/rent-property']);
      } else {
        this.router.navigate(['/']);
      }


    } else {
      this.alertify.errorMsg('Please review the form and provide all valid entries');
    }
  }

  mapProperty(): void {
    this.property.Id = this.housingService.newPropID();
    this.property.SellRent = +this.SellRent.value;
    this.property.BHK = this.BHK.value;
    this.property.PType = this.PType.value;
    this.property.Name = this.Name.value;
    this.property.City = this.City.value;
    this.property.FType = this.FType.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.BuiltArea = this.BuiltArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }

    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }

    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }

    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }

  selectTab(NextTabId: number, IsCurrentTabValid: boolean) {
    this.nextClicked = true;
    if (IsCurrentTabValid) {
      this.formTabs.tabs[NextTabId].active = true;
    }
  }

}