import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'form-plugins',
    templateUrl: './form-plugins.html',
    styleUrls: ['./form-plugins.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormPluginsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-plugins-ready'));
    }
}