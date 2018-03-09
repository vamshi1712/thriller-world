import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm : FormGroup;
  user:User;

  constructor(private authservice : AuthService,
                private router : Router) { }

  ngOnInit(){
   

    this.myForm = new FormGroup({
        email: new FormControl(null, [
            Validators.required,
            Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]),
        password: new FormControl(null, Validators.required)
        
    });
}

onSubmit(myForm){
  
    const user = new User(this.myForm.value.email , this.myForm.value.password);
    console.log(user);

    this.authservice.login(user)
    .subscribe(data => {
        console.log(data);
        
        if(data.success == true){
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            this.router.navigate(['/layout','body']);
          }
          else{
            this.router.navigate(['/layout','login']);
          }
    });
    this.myForm.reset();
    
}

gotosignin(){
    this.router.navigate(['/layout', 'signin']);
   }

}
