
import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';


@Component({
  template: `
    <button (click)="example()">Edit</button>
  `,
})
export class ButtonRenderComponent implements OnInit {

  public renderValue;

  @Input() value;

  constructor() {  }

  ngOnInit() {
    console.log('value',this.value)
    this.renderValue = this.value;
  }

  example() {
    alert(this.renderValue);
  }


}