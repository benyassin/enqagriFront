import { Directive, ElementRef,Input } from '@angular/core';

@Directive({
  selector: '[LowerCase]',
  host: {
    '(input)': 'toLowerCase($event.target.value)',
}
})
export class LowerCaseTextDirective {

  
  @Input('UpperCase') allowLowerCase: boolean;
  constructor(private ref: ElementRef) {
  }

  toUpperCase(value: any) {
      if (this.allowLowerCase)
      this.ref.nativeElement.value = value.toLowerCase();
  }

    

}
