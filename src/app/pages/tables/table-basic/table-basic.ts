import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'table-basic',
    templateUrl: './table-basic.html'
})

export class TableBasicPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-basic-ready'));
    }
}