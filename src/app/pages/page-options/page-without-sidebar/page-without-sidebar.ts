import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'page-without-sidebar',
    templateUrl: './page-without-sidebar.html'
})

export class WithoutSidebarPage implements OnInit {
    
    constructor(private app: AppComponent) {
        app.setPageWithoutSidebar(true);
    }
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-without-sidebar-ready'));
    }
}