import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'form-slider-switcher',
    templateUrl: './form-slider-switcher.html',
    styleUrls: ['./form-slider-switcher.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormSliderSwitcherPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-slider-switcher-ready'));
    }
}