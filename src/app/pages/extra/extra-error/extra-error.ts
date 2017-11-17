import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'extra-error',
    templateUrl: './extra-error.html'
})

export class ExtraErrorPage implements OnInit {
    constructor(private app:AppComponent) {
        app.setPageWithoutSidebar(true);
        app.setPageWithoutHeader(true);
        app.setPagePaceTop(true);
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-error-ready'));
    }
}