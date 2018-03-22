import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-media-object',
    templateUrl: './media-object.html'
})

export class UIMediaObjectPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-media-object-ready'));
    }
}