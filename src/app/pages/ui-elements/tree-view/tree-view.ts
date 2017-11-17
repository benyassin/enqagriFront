import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-tree-view',
    templateUrl: './tree-view.html',
    styleUrls: ['./tree-view.css'],
    encapsulation: ViewEncapsulation.None
})

export class UITreeViewPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('ui-tree-view-ready'));
    }
}