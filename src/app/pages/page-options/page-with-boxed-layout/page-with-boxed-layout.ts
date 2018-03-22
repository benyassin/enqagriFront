import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-boxed-layout',
    templateUrl: './page-with-boxed-layout.html'
})

export class BoxedLayoutPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageBoxedLayout(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-boxed-layout-ready'));
    }
}