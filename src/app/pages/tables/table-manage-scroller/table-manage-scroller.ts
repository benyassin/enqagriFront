import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-scroller',
    templateUrl: './table-manage-scroller.html',
    styleUrls: ['./table-manage-scroller.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageScrollerPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-scroller-ready'));
    }
}