import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { CommonModule } from '@angular/common';
import { HostComponent } from './host.component';
import { HostRoutingModule } from './host-routing.module';
import { HostLoginComponent } from './host-login/host-login.component';
import { HostSigninComponent } from './host-signin/host-signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HostService } from './shared/host.service';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
  declarations: [ 
    HostComponent, HostLoginComponent,  HostSigninComponent, DashboardComponent
  ],
  imports: [
    CommonModule,
    HostRoutingModule,
    MDBBootstrapModule.forRoot(),   
    ReactiveFormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [HostService]
})
export class HostModule { }
