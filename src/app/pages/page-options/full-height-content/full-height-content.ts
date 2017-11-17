import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'full-height-content',
    templateUrl: './full-height-content.html'
})

export class FullHeightContentPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageContentFullHeight(true);
        app.setPageContentFullWidth(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('full-height-content-ready'));
    }
}