import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'form-wysiwyg',
    templateUrl: './form-wysiwyg.html',
    styleUrls: ['./form-wysiwyg.css'],
    encapsulation: ViewEncapsulation.None
})

export class FormWysiwygPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-wysiwyg-ready'));
    }
}