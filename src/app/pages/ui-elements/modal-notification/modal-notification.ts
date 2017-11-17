import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-modal-notification',
    templateUrl: './modal-notification.html',
    styleUrls: ['./modal-notification.css'],
    encapsulation: ViewEncapsulation.None
})

export class UIModalNotificationPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-modal-notification-ready'));
    }
}