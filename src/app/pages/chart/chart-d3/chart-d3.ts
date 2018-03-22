import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'chart-d3',
    templateUrl: './chart-d3.html',
    styleUrls: ['./chart-d3.css'],
    encapsulation: ViewEncapsulation.None
})

export class ChartD3Page implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('chart-d3-ready'));
    }
}