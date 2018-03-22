import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'extra-timeline',
    templateUrl: './extra-timeline.html'
})

export class ExtraTimelinePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-timeline-ready'));
    }
}