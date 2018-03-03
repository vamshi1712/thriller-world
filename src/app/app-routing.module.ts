import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BodyComponent } from './layout/body/body.component';
import { SigninComponent } from './auth/signin/signin.component';

const routes: Routes = [

  { path: '', redirectTo : '/body', pathMatch: 'full'},
  { path: 'login', component : LoginComponent },
  { path: 'signin', component : SigninComponent },
  { path: 'body', component : BodyComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
