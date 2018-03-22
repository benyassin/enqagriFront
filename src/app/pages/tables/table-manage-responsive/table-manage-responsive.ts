import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-manage-responsive',
    templateUrl: './table-manage-responsive.html',
    styleUrls: ['./table-manage-responsive.css'],
    encapsulation: ViewEncapsulation.None
})

export class TableManageResponsivePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-responsive-ready'));
    }
}