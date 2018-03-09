import {Injectable} from '@angular/core';
import { User } from './user.model';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { ErrorService } from '../../errors/error.service';

@Injectable()

export class AuthService {
    user : User;

    BaseUrl = 'http://localhost:3000/user';

    constructor(public http : Http,
                    public errorservice : ErrorService ){}

    login(user){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-type':'application/json'});
        return this.http.post(`${this.BaseUrl}`+'/login',body,{headers:headers})
                .map((response:Response)=>response.json())
                .catch((error: Response) => {
                    this.errorservice.handleError(error.json());
                    return Observable.throw(error.json());
                });
                
        }

    signup(user){
        const body = JSON.stringify(user);
        const headers = new Headers({'content-type':'application/json'});
        return this.http.post(`${this.BaseUrl}`+'/signup',body,{headers:headers})
                    .map((response:Response)=>response.json())
                    .catch((error: Response) => {
                        this.errorservice.handleError(error.json());
                        return Observable.throw(error.json());
                    });
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

}