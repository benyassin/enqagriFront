import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'gallery-v2',
    templateUrl: './gallery-v2.html'
})

export class GalleryV2Page implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('gallery-v2-ready'));
    }
}