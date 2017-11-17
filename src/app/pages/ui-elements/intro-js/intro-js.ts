import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-intro-js',
    templateUrl: './intro-js.html',
    styleUrls: ['./intro-js.css'],
    encapsulation: ViewEncapsulation.None
})

export class UIIntroJsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-intro-js-ready'));
    }
}