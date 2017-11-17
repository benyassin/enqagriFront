import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-mega-menu',
    templateUrl: './page-with-mega-menu.html'
})

export class MegaMenuPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageMegaMenu(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-mega-menu-ready'));
    }
}