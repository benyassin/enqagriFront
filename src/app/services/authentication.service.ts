import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { UserService } from './user.service';
import { PermissionService } from 'angular2-permission';
import { HttpClient } from './Http-client'

@Injectable()
export class AuthenticationService {
    public baseurl: string = "http://localhost:8080/api/";
    
    constructor(private http: Http,private _userservice:UserService,private _permissionService: PermissionService,private httpClient:HttpClient) {
        // set token if saved in local storage
    }
    
    login(user): Observable<boolean> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(this.baseurl+ 'auth/login', JSON.stringify(user),options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                let user = response.json()  && response.json().user
                if (token) {
                    // set token property
                    this.httpClient.token = token

                    this._userservice.user = user
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', token);
                    localStorage.setItem('user',JSON.stringify(user))
                    this._permissionService.add(user.role)   
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            },(err:Response) => {
                let details = err.json()
                console.log("working",details)
                return details; 
            }
        );
    }
    loginn(user) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });
        return new Promise((resolve, reject) => {
            
                        this.http.post(this.baseurl+ 'auth/login', JSON.stringify(user),options)
                            .map(res => res.json())
                            .subscribe(res => {
                                console.log(res)
                                let token = res.token;
                                let user = res.user
                                if (token) {
                                    // set token property
                                    this.httpClient.token = token
                
                                    this._userservice.user = user
                                    // store username and jwt token in local storage to keep user logged in between page refreshes
                                    localStorage.setItem('token', token);
                                    localStorage.setItem('user',JSON.stringify(user))
                                    this._permissionService.add(user.role)   
                                    // return true to indicate successful login
                                    resolve(res);
                            }},(err:Response) => {
                                let details = err.json()
                                reject(details); 
                            });
            
                    });

    }
    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        this._permissionService.clearStore(); 
        
    }
    loggedIn() {
        return tokenNotExpired();
    }
}