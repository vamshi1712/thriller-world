import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/user.model';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


// function passwordMatcher(c: AbstractControl): { [key: string]: boolean } | null {
//   let passwordControl = c.get('password');
//   let confirmControl = c.get('confirmPassword');

//   if (passwordControl.pristine || confirmControl.pristine) {
//     return null;
//   }

//   if (passwordControl.value === confirmControl.value) {
//     return null;
//   }
//   return { 'match': true };
// }


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;
  countries: string[] = ['USA', 'UK', 'Canada'];
  
    constructor(
      private authservice : AuthService,
      private router : Router
    ) {}

    ngOnInit(){
      this.registerForm = new FormGroup({
          email: new FormControl(null, [
              Validators.required,
              Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
          ]),
          password: new FormControl(null, [Validators.required,Validators.minLength(10)]),
          confirmpassword: new FormControl(null, [Validators.required,Validators.minLength(10),this.matchOtherValidator('password')]),
          fullname: new FormControl(null,Validators.required),
          isMarried: new FormControl(null,Validators.required),
          location: new FormControl(null,Validators.required),
          pincode: new FormControl(null,Validators.required),
          phone: new FormControl(null,Validators.required)
      });
  }


  onSubmit(registerForm){
      const user = new User(this.registerForm.value.email ,
                         this.registerForm.value.password, 
                         this.registerForm.value.fullname,
                         this.registerForm.value.phone,
                         this.registerForm.value.location,
                         this.registerForm.value.pincode,
                         this.registerForm.value.isMarried,
                         true,
                         false
                         );
      console.log(user);
      this.authservice.signup(user)
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
            
        },)
      this.registerForm.reset();
  }



  //password match funtion

  matchOtherValidator (otherControlName: string) {
    
      let thisControl: FormControl;
      let otherControl: FormControl;
    
      return function matchOtherValidate (control: FormControl) {
    
        if (!control.parent) {
          return null;
        }
    
        // Initializing the validator.
        if (!thisControl) {
          thisControl = control;
          otherControl = control.parent.get(otherControlName) as FormControl;
          if (!otherControl) {
            throw new Error('matchOtherValidator(): other control is not found in parent group');
          }
          otherControl.valueChanges.subscribe(() => {
            thisControl.updateValueAndValidity();
          });
        }
    
        if (!otherControl) {
          return null;
        }
    
        if (otherControl.value !== thisControl.value) {
          return {
            matchOther: true
          };
        }
    
        return null;
    
      }
    
    }
}
