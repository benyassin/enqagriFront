import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-transparent-sidebar',
    templateUrl: './page-with-transparent-sidebar.html'
})

export class TransparentSidebarPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageTransparentSidebar(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-transparent-sidebar-ready'));
    }
}