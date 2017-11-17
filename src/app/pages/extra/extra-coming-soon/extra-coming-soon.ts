import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'extra-coming-soon',
    templateUrl: './extra-coming-soon.html',
    styleUrls: ['./extra-coming-soon.css'],
    encapsulation: ViewEncapsulation.None
})

export class ExtraComingSoonPage implements OnInit {
    constructor(private app:AppComponent) {
        app.setPageWithoutSidebar(true);
        app.setPageWithoutHeader(true);
        app.setPageContentFullWidth(true);
        app.setPagePaceTop(true);
        app.setPageBgWhite(true);
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-coming-soon-ready'));
    }
}