import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ui-ionicons',
    templateUrl: './ionicons.html'
})

export class UIIoniconsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-ionicons-ready'));
    }
}