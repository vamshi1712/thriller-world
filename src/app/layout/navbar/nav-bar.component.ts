import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav-bar.component.html',
  styleUrls : ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private authservice : AuthService,
              private router : Router) { }

  ngOnInit() {
  }

  isLoggedIn(){
    return localStorage.getItem('token') !== null;
}

onLogout() {
  this.authservice.logout();
  
}

}