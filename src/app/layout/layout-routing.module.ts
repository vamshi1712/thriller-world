import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../auth/login/login.component';
import { BodyComponent } from './body/body.component';
import { SigninComponent } from '../auth/signin/signin.component';
import { AccountComponent } from '../pages/account/account.component';
import { NavbarComponent } from 'angular-bootstrap-md/navbars';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: '/layout' , pathMatch: 'full' },
            { path: 'layout', component: LayoutComponent },
            { path: 'login', component : LoginComponent },
            { path: 'signin', component : SigninComponent },
            { path: 'body', component : BodyComponent },
            { path: 'account', component : AccountComponent },
            { path: 'navbar', component : NavbarComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}