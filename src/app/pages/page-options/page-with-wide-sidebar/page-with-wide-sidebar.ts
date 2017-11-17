import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-with-wide-sidebar',
    templateUrl: './page-with-wide-sidebar.html'
})

export class WideSidebarPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageWideSidebar(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-with-wide-sidebar-ready'));
    }
}