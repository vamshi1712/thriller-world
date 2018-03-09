import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HostComponent } from './host/host.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [

  { path : '' , redirectTo: '/layout' , pathMatch: 'full'},
  { path: 'layout', loadChildren: './layout/layout.module#LayoutModule'},
  { path: 'host', loadChildren: './host/host.module#HostModule' },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
