import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-select',
    templateUrl: './table-manage-select.html',
    styleUrls: ['./table-manage-select.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageSelectPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-select-ready'));
    }
}