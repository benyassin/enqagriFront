import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'login-v3',
    templateUrl: './login-v3.html'
})

export class LoginV3Page implements OnInit {
    loginForm : FormGroup;
    
    submitForm(form: any):boolean {
        this.router.navigate(['/']);
        return false;
    }
    constructor(private app:AppComponent, private router: Router) {
        app.setPageWithoutSidebar(true);
        app.setPageWithoutHeader(true);
        app.setPageBgWhite(true);
        app.setPagePaceTop(true);
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-login-v3-ready'));
    }
}