import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'calendar',
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.css'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('calendar-ready'));
    }
}