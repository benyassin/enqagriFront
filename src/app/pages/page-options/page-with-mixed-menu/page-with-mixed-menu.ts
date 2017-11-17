import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-mixed-menu',
    templateUrl: './page-with-mixed-menu.html'
})

export class MixedMenuPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageTopMenu(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-mixed-menu-ready'));
    }
}