import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-fixed-columns',
    templateUrl: './table-manage-fixed-columns.html',
    styleUrls: ['./table-manage-fixed-columns.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageFixedColumnsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-fixed-columns-ready'));
    }
}