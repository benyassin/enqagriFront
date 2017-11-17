import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chart-flot',
    templateUrl: './chart-flot.html'
})

export class ChartFlotPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('chart-flot-ready'));
    }
}