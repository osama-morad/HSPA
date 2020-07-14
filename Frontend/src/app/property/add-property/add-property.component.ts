import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// import { IProperty } from '../IProperty.interface';
import { IPropertyBase } from 'src/app/model/IPropertyBase';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  // @ViewChild('Form') addPropertyForm: NgForm;
  @ViewChild('formTabs') formTabs: TabsetComponent;

  addPropertyForm : FormGroup;

  propertyTypes: Array<string> = ['House', 'Apartment', 'Duplex'];
  furnishTypes: Array<string> = ['Fully', 'Semi', 'Unfurnished'];
  entranceDirection: Array<string> = ['East', 'West', 'North', 'South'];
  
  propertyView: IPropertyBase = {
    Id: null,
    Name: null,
    Price: null,
    SellRent: null,
    PType: null,
    FType: null,
    BHK: null,
    BuiltArea: null,
    City: null,
    RTM: null
  };

  constructor(private router:Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group( {
      SellRent: [null, Validators.required],
      PType: [null, Validators.required],
      Name: ['Omm', Validators.required],
      Price: [null, Validators.required],
      BuiltArea: [null, Validators.required]
    });
  }

  onBack (){
    this.router.navigate(['/']);
  }

  onSubmit(){
    console.log('Congrats for the submit')
    console.log(this.addPropertyForm);
  }

  selectTab(tabId: number) {
    this.formTabs.tabs[tabId].active = true;
  }
}
