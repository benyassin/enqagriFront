import { Component, OnInit } from '@angular/core';
import { AppComponent }  from '../../../../app.component';

@Component({
    selector: 'email-inbox-v1',
    templateUrl: './email-inbox-v1.html'
})

export class EmailInboxV1Page implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageContentFullWidth(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('email-inbox-v1-ready'));
    }
}