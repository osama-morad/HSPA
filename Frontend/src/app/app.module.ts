import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HousingService } from 'src/app/services/housing.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HereLocationService } from 'src/app/services/hereLocation.service';

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { Routes, RouterModule} from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { AutoCompleteGoogleAddressComponent } from './autoCompleteGoogleAddress/autoCompleteGoogleAddress.component'
import { AgmCoreModule } from '@agm/core';
import { GoogleAddressLocationComponent } from './googleAddressLocation/googleAddressLocation.component';
import { GoogleLocationService } from './services/googleLocation.service';
import { PropertyDetailResolverService } from './property/property-detail/proprety-detail-resolver.service'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HereAddressLocationComponent } from './here-address-location/here-address-location.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

const appRoutes: Routes = [
   { path: '', component: PropertyListComponent },
   { path: 'rent-property', component: PropertyListComponent },
   { path: 'add-property', component: AddPropertyComponent },
   { path: 'property-detail/:id', component: PropertyDetailComponent, resolve: {prp: PropertyDetailResolverService} },
   { path: 'user/login', component: UserLoginComponent },
   { path: 'user/register', component: UserRegisterComponent },
   { path: '**', component: PropertyListComponent }
];

@NgModule({
   declarations: [
      AppComponent,
      PropertyCardComponent,
      PropertyListComponent,
      NavBarComponent,
      AddPropertyComponent,
      PropertyDetailComponent,
      UserLoginComponent,
      UserRegisterComponent,
      AutoCompleteGoogleAddressComponent,
      GoogleAddressLocationComponent,
      HereAddressLocationComponent,
      FilterPipe,
      SortPipe
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      ButtonsModule.forRoot(),
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCfE339LfYiWOPVIUB_DHh3IMS3nc5iBuQ',//'AIzaSyC-V4vfs6kHlkgNbHrBTtyWhNs38RwfV70',
         libraries: ['places']
       }),
       NgxGalleryModule
   ],
   providers: [
      HousingService,
      UserServiceService,
      AuthenticateService,
      HereLocationService,
      GoogleLocationService,
      PropertyDetailResolverService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
