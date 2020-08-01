import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { Observable, Subject, of, from } from 'rxjs';
import { filter, catchError, tap, map, switchMap } from 'rxjs/operators';
import { AlertifyService } from './alertify.service';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {
  private geocoder: any;
constructor(private mapLoader: MapsAPILoader,
            private alertify: AlertifyService) { }

address: string;

  private initGeocoder() {
    //console.log('Init geocoder!');
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if(!this.geocoder) {
      return from(this.mapLoader.load())
      .pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string) {
    console.log('Start geocoding!');
    this.initGeocoder();
    console.log(this.geocoder);
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({'address': location}, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[0] != null) {
            //this.address = results[0].formatted_address;
            resolve(results[0]);
          } else {
            this.alertify.warningMsg("No address available");
          }
        } else {
            this.alertify.errorMsg('Error - ' +  results +  ' & Status - ' +  status);
        }
      });
    });      

  }
  // geocodeAddress(location: string): Observable<string> {
  //   console.log('Start geocoding!');
  //   this.initGeocoder();
  //   console.log(this.geocoder);
  //   return new Observable(observer => {
  //     this.geocoder.geocode({'address': location}, (results, status) => {
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         if (results[0] != null) {
  //           this.address = results[0].formatted_address;
  //           console.log(this.address);
  //         } else {
  //           this.alertify.warningMsg("No address available");
  //         }
  //       } else {
  //           this.alertify.errorMsg('Error - ' +  results +  ' & Status - ' +  status);
  //       }
  //       observer.complete();
  //     });
  //   })        

  // }
    // geocodeAddress(location: string): Observable<Location> {
  //   console.log('Start geocoding!');
  //   return this.waitForMapsToLoad().pipe(
  //     // filter(loaded => loaded),
  //     switchMap(() => {
  //       return new Observable(observer => {
  //         this.geocoder.geocode({'address': location}, (results, status) => {
  //           if (status == google.maps.GeocoderStatus.OK) {
  //             console.log('Geocoding complete!');
  //             observer.next({
  //               lat: results[0].geometry.location.lat(), 
  //               lng: results[0].geometry.location.lng()
  //             });
  //           } else {
  //               console.log('Error - ', results, ' & Status - ', status);
  //               observer.next({ lat: 0, lng: 0 });
  //           }
  //           observer.complete();
  //         });
  //       })        
  //     })
  //   )
  // }
}
