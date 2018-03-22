import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-morris',
    templateUrl: './chart-js.html'
})

export class ChartJsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('chart-js-ready'));
    }
}