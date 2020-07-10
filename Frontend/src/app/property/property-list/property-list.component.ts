import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { error } from '@angular/compiler/src/util';
import { IProperty } from 'src/app/property/IProperty.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: Array<IProperty>;

  constructor(private housingService:HousingService) { }

  ngOnInit(): void {
    this.housingService.getAllProperties().subscribe(
      data=>
      {
        this.properties = data;
      }, error=>{
        console.log(error);
      }
    );
  }

}
