import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent }  from '../../../app.component';

@Component({
    selector: 'email-compose',
    templateUrl: './email-compose.html',
    styleUrls: ['./email-compose.css'],
    encapsulation: ViewEncapsulation.None
})

export class EmailComposePage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageContentFullWidth(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('email-compose-ready'));
    }
}