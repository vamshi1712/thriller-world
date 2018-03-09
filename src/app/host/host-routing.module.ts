import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HostComponent } from './host.component';
import { HostLoginComponent } from './host-login/host-login.component';
import { HostSigninComponent } from './host-signin/host-signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: HostComponent,
        children: [
            { path: '', redirectTo: '/host-login', pathMatch: 'full' },
            { path: 'host-signin', component: HostSigninComponent },
            { path: 'host-login', component: HostLoginComponent },
            { path: 'host-dashboard', component: DashboardComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class HostRoutingModule { }
