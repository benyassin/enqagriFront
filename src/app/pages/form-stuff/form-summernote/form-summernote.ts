import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'form-summernote',
    templateUrl: './form-summernote.html',
    styleUrls: ['./form-summernote.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormSummernotePage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-summernote-ready'));
    }
}