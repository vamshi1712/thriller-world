import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HostModule } from './host/host.module';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './auth/shared/auth.service';
import { AuthGuard } from './auth.guard';
import { ErrorService } from './errors/error.service';
import { ErrorComponent } from './errors/error.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpModule,
    HostModule,
    LayoutModule,
    BrowserAnimationsModule
    
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [AuthService,ErrorService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
