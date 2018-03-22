import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-keytable',
    templateUrl: './table-manage-keytable.html',
    styleUrls: ['./table-manage-keytable.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageKeyTablePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-keytable-ready'));
    }
}