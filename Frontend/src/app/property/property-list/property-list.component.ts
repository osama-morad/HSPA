import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { error } from '@angular/compiler/src/util';
import { IProperty } from 'src/app/property/IProperty.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/IPropertyBase';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: IPropertyBase[];
  SellRent = 1;
  // Today = new Date();
  City = '';
  SearchCity = '';
  SortbyParam = '';
  SortDirection = 'asc';

  constructor(private route:ActivatedRoute, private housingService:HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()==='rent-property'){
      this.SellRent = 2; //Rent
    }
    this.housingService.getAllProperties(this.SellRent).subscribe(
      data=>
      {
        this.properties = data;
        console.log(this.route.snapshot.url.toString());
      }, error=>{
        console.log(error);
      }
    );
    console.log(this.SellRent);
  }

  onCityFilter() {
    this.SearchCity = this.City;
  }

  onClearCityFilter() {
    this.City = '';
    this.SearchCity = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }

}
