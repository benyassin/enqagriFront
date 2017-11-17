import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'gallery-v1',
    templateUrl: './gallery-v1.html',
    styleUrls: ['./gallery-v1.css'],
    encapsulation: ViewEncapsulation.None
})

export class GalleryV1Page implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('gallery-v1-ready'));
    }
}