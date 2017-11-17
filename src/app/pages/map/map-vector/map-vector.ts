import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppComponent } from '../../../app.component';

@Component({
    selector: 'map-vector',
    templateUrl: './map-vector.html',
    styleUrls: ['./map-vector.css'],
    encapsulation: ViewEncapsulation.None
})

export class MapVectorPage implements OnInit {
    constructor(private app:AppComponent) {
        app.setPageContentInverseMode(true);
        app.setPageContentFullWidth(true);
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-map-vector-ready'));
    }
}