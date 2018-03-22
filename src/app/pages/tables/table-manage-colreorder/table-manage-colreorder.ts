import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-colreorder',
    templateUrl: './table-manage-colreorder.html',
    styleUrls: ['./table-manage-colreorder.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageColReorderPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-colreorder-ready'));
    }
}