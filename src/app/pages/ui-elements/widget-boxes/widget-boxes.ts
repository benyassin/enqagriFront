import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-widget-boxes',
    templateUrl: './widget-boxes.html'
})

export class UIWidgetBoxesPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-widget-boxes-ready'));
        window.dispatchEvent(new CustomEvent('init-component'));
    }
}