import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'chart-morris',
    templateUrl: './chart-morris.html',
    styleUrls: ['./chart-morris.css'],
    encapsulation: ViewEncapsulation.None
})

export class ChartMorrisPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('chart-morris-ready'));
    }
}