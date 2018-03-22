import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-typography',
    templateUrl: './typography.html'
})

export class UITypographyPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-typography-ready'));
    }
}