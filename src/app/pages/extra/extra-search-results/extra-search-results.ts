import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'extra-search-results',
    templateUrl: './extra-search-results.html'
})

export class ExtraSearchResultsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-search-results-ready'));
    }
}