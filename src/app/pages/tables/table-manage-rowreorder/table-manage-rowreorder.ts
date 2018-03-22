import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-rowreorder',
    templateUrl: './table-manage-rowreorder.html',
    styleUrls: ['./table-manage-rowreorder.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageRowReorderPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-rowreorder-ready'));
    }
}