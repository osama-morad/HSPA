import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IProperty } from '../property/IProperty.interface';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getAllProperties(sellRent: number): Observable<IProperty[]>{
    return this.http.get('data/properties.json').pipe(
      map(data => {
        const propertyArray: Array<IProperty> = [];
        const newProperties = JSON.parse(localStorage.getItem('newProp'));
        if (newProperties){
          for (const id in newProperties)
          {
            if (data.hasOwnProperty(id) && newProperties[id].SellRent === sellRent)
            {
              propertyArray.push(newProperties[id]);
            }
          }
          }
        for (const id in data)
        {
          if (data.hasOwnProperty(id) && data[id].SellRent === sellRent)
          {
            propertyArray.push(data[id]);
          }
        }
        return propertyArray;
      })
    );
  }

  addProperty(property: Property) {
    let newProp = [property];
    if (localStorage.getItem('newProp')){
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  newPropID(){
    var pID = localStorage.getItem('PID');
    if (pID){
      localStorage.setItem('PID', String(+pID + 1));
      return (+pID + 1);
    }else{
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
