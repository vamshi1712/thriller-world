import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './navbar/nav-bar.component';
import { LoginComponent } from '../auth/login/login.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { BodyComponent } from './body/body.component';
import { PlacesComponent } from '../pages/places/places.component';
import { CitiesComponent } from '../pages/cities/cities.component';
import { AccountComponent } from '../pages/account/account.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LayoutComponent,
    FooterComponent,
    NavBarComponent,
    LoginComponent,
    BodyComponent,
    SigninComponent,
    CitiesComponent,
    PlacesComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MDBBootstrapModule.forRoot(),
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ]
  
})
export class LayoutModule { }
