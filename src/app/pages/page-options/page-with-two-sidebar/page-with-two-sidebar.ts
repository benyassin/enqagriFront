import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-two-sidebar',
    templateUrl: './page-with-two-sidebar.html',
})

export class TwoSidebarPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageTwoSidebar(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-two-sidebar-ready'));
    }
}