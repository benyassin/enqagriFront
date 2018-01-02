import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

import { AuthenticationService } from '../../../services/authentication.service'
import { UserService } from '../../../services/user.service'
@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.html'
})

export class LoginPage implements OnInit {
    model: any = {};
    loading = false;
    error  = '';
    loginForm : FormGroup;
    msgs: any = [];
    
    constructor(
        private app:AppComponent, 
        private router: Router,
        private authenticationService: AuthenticationService,
        private userservice: UserService
    ) {
        app.setPageWithoutSidebar(true);
        app.setPageWithoutHeader(true);
        app.setPagePaceTop(true);
    }
    connecte(){
        this.loading = true;
        this.authenticationService.loginn(this.model)
            .then(result => {
                console.log("result",result)
              let user:any = this.userservice.user
              this.router.navigate(['dashboard/v1']);
            },(err) =>{
                console.log("error",err)
                this.msgs = [];
                this.msgs.push({severity:'error', summary:'', detail:err.message}); //create service                
            });
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-login-ready'));
        this.authenticationService.logout();
        
    }
}