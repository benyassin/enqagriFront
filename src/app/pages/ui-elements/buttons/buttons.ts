import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-buttons',
    templateUrl: './buttons.html'
})

export class UIButtonsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-buttons-ready'));
    }
}