import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'sidebar-two',
  templateUrl: './sidebar-two.component.html'
})

export class SidebarTwoComponent implements AfterViewInit { 
    // fire event sidebar-two-ready
    ngAfterViewInit() {
        window.dispatchEvent(new CustomEvent('sidebar-two-ready'));
    }
}