import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'form-validation',
    templateUrl: './form-validation.html'
})

export class FormValidationPage implements OnInit {
    validationForm : FormGroup;
    
    constructor(fb: FormBuilder) {
        this.validationForm = fb.group({
          'fullName' : [null, Validators.required],
          'selectBox' : [null, Validators.required],
          'radioRequired' : [null, Validators.required],
          'checkboxRequired' : [null, Validators.required],
          'message' : [null, [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
          'email': [null, Validators.required],
          'website' : [null, Validators.required],
          'number' : [null, Validators.required],
          'alphabets' : [null, Validators.required],
        })
    }
    
    submitForm(form: any): void {
        alert('Form Validation Done');
        console.log('Form Data: ');
        console.log(form);
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-validation-ready'));


    }
}