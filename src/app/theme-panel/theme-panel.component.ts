import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'theme-panel',
  templateUrl: './theme-panel.component.html'
})
export class ThemePanelComponent implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('theme-panel-ready'));
    }
}