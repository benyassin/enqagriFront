import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service' 

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private auth:AuthenticationService) { }

    canActivate() {
        if (this.auth.loggedIn()) {
            // logged in so return true
            return true;
        }else{

        // not logged in so redirect to login page
        this.router.navigate(['/user/login']);
        return false;
    }
    }
}