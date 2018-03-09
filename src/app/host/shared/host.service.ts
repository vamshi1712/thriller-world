import {Injectable} from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { Host } from './host.model';

@Injectable()

export class HostService {
    host : Host;

    BaseUrl = 'http://localhost:3000/host';

    constructor(public http : Http ){}

    login(host){
        const body = JSON.stringify(host);
        const headers = new Headers({'content-type':'application/json'});
        return this.http.post(`${this.BaseUrl}`+'/login',body,{headers:headers})
                .map((response:Response)=>response.json())
                .catch((error: Response) => {
                    return Observable.throw(error.json());
                });
                
        }

    signup(host){
        const body = JSON.stringify(host);
        const headers = new Headers({'content-type':'application/json'});
        return this.http.post(`${this.BaseUrl}`+'/signup',body,{headers:headers})
                    .map((response:Response)=>response.json());
    }

    logout(){
        localStorage.clear();
    }

    isLoggedIn(){
        return localStorage.getItem('token') !== null;
    }

}