import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'extra-invoice',
    templateUrl: './extra-invoice.html',
    styleUrls: ['./extra-invoice.css'],
    encapsulation: ViewEncapsulation.None
})

export class ExtraInvoicePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-invoice-ready'));
    }
}