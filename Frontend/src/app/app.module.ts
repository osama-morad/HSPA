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

import { AppComponent } from './app.component';
import { PropertyCardComponent } from './property/property-card/property-card.component';
import { PropertyListComponent } from './property/property-list/property-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AddPropertyComponent } from './property/add-property/add-property.component';
import { Routes, RouterModule} from '@angular/router';
import { PropertyDetailComponent } from './property/property-detail/property-detail.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';


const appRoutes: Routes = [
   { path: '', component: PropertyListComponent },
   { path: 'rent-property', component: PropertyListComponent },
   { path: 'add-property', component: AddPropertyComponent },
   { path: 'property-detail/:id', component: PropertyDetailComponent },
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
      UserRegisterComponent
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
      BsDatepickerModule.forRoot()
   ],
   providers: [
      HousingService,
      UserServiceService,
      AuthenticateService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
