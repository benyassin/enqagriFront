import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-combine',
    templateUrl: './table-manage-combine.html',
    styleUrls: ['./table-manage-combine.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageCombinePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
    }
}