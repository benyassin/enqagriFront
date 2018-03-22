import { Component, OnInit } from '@angular/core';
import { AppComponent }  from '../../../app.component';

@Component({
    selector: 'email-detail',
    templateUrl: './email-detail.html'
})

export class EmailDetailPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageContentFullWidth(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('email-detail-ready'));
    }
}