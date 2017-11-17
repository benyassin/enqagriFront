import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-footer',
    templateUrl: './page-with-footer.html'
})

export class FooterPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageFooter(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-footer-ready'));
    }
}