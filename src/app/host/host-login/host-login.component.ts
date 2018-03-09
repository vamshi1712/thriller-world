import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Host } from '../shared/host.model';

import { HostService } from '../shared/host.service';




@Component({
  selector: 'app-host-login',
  templateUrl: './host-login.component.html',
  styleUrls: ['./host-login.component.scss']
})
export class HostLoginComponent implements OnInit {

  myForm : FormGroup;

  constructor(private router : Router,
              private hostservice : HostService) { }

  ngOnInit() {

    this.myForm = new FormGroup({
      email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]),
      password: new FormControl(null, Validators.required)
      
  });
  }

  onSubmit(myForm){
    
      const host = new Host(this.myForm.value.email , this.myForm.value.password);
      console.log(host);
  
      this.hostservice.login(host)
      .subscribe(data => {
          console.log(data);
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('hostId', data.hostId);
          this.router.navigate(['/host','host-dashboard']);
      });
      this.myForm.reset();
      
  }
  


 gotosignin(){
  this.router.navigate(['/host', 'host-signin']);
 }

}
