import { Component, OnInit } from '@angular/core';
import { BlocService } from '../../../services/bloc.service'
import { Http } from '@angular/http'
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';

import 'rxjs/add/operator/map';

declare let jquery:any;
declare let $ :any;
@Component({
    selector: 'bloc',
    templateUrl: './bloc.html'
})

export class BlocPage implements OnInit {

    constructor(public blocservice:BlocService,
                private confirmationService: ConfirmationService
    ){}
    model: any = this.blocservice.selectedBloc;
    msgs : any = [];

    themes:Array<Object> = [
        {name:"Annuelle", value:"annuelle"},
        {name:"Modulaire", value:"modulaire"},
        {name:"Complémentaire", value:"complementaire"},
        {name:"Bloc Sans Théme", value:"none"}
    ];
    blocs = {};


    onThemeChange(theme){
        console.log(theme);
        this.blocservice.getBlocs(theme).then((data) => {
            this.blocs = data;
        }, (err) => {
          console.log("can't retreive blocs ");
        });
    };
    onBlocSelect(fields){
        this.model.fields = fields
        console.log(this.model.fields)
    }
    createblock(){
        this.confirmationService.confirm({
         message: 'TODO : CHANGER LE MESSAGE ?',
        accept: () => {
            this.blocservice.createBloc(this.model).then((data) => {
                console.log(this.model)
                this.model  = {};
                this.blocservice.selectedBloc = {};
                console.log(this.model)
                console.log(this.blocservice.selectedBloc)
                document.body.scrollTop = document.documentElement.scrollTop = 0;  
                this.msgs.push({severity:'success', summary:'Success', detail:'Bloc a été créé avec succès'}); 
        },(err) => {
            console.log("can't retreive blocs ");
        });
    }
    })
    };

    // Attention solution temporaire a refaire aprés 
    renderFormBuilder(){
       let current = this;
      $('.formbuilder').formBuilder(this.formBuilderOptions).promise.then(formBuilder => {
         formBuilder.actions.setData(current.model.fields)
        // console.log(this.fields)
        document.getElementById("saveJSON").addEventListener("click", function() {
            let fields = formBuilder.formData;
            current.model.fields = fields
          });
        document.getElementById("clearfields").addEventListener("click", function() {
             formBuilder.actions.clearFields();
             delete current.model.fields
        });  
        document.getElementById("blocexistant").addEventListener("change", function() {
            let FormData = current.model.fields
           console.log(FormData)
            formBuilder.actions.setData(FormData)
        });
        
      });

    };


    private formBuilderOptions = {
        sortableControls: true,
        showActionButtons: false,
        // editOnAdd: true,
        controlOrder: ['header','paragraph','text','textarea','number','date','select','checkbox-group','radio-group','button'],
        disableFields: ['autocomplete','hidden','file','button'],
        disabledAttrs: ["Access","limitRole","roles"],
        controlPosition: 'left',
        i18n: {
            locale: 'fr-FR'
            // location: 'https://github.com/benyassin/formBuilder-languages/blob/benyassin-patch-1/fr-FR.lang'
        },
        //  stickyControls: {
        //   enable: true
        // },
        roles: {},
    };
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('bloc-ready'));
        this.renderFormBuilder();
        if(this.model.theme){
        this.onThemeChange(this.model.theme)
    }
    }
}