import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-default',
    templateUrl: './table-manage-default.html',
    styleUrls: ['./table-manage-default.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageDefaultPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-default-ready'));
    }
}