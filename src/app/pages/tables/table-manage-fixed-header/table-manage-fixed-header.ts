import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-fixed-header',
    templateUrl: './table-manage-fixed-header.html',
    styleUrls: ['./table-manage-fixed-header.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageFixedHeaderPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-fixed-header-ready'));
    }
}