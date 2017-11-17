import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-default',
    templateUrl: './table-manage-autofill.html',
    styleUrls: ['./table-manage-autofill.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageAutofillPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-autofill-ready'));
    }
}