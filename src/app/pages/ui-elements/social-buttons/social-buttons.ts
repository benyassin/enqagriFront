import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-typography',
    templateUrl: './social-buttons.html',
    styleUrls: ['./social-buttons.css'],
    encapsulation: ViewEncapsulation.None
})

export class UISocialButtonsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-social-buttons-ready'));
    }
}