import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-buttons',
    templateUrl: './table-manage-buttons.html',
    styleUrls: ['./table-manage-buttons.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageButtonsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-buttons-ready'));
    }
}