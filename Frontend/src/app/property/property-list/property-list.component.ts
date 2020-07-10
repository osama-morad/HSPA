import { Component, OnInit } from '@angular/core';
import { HousingService } from 'src/app/services/housing.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  properties: any;

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
