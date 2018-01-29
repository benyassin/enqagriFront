import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {Http} from '@angular/http';
import { FormService } from '../../../services/form.service'
import 'rxjs/add/operator/map';
import  { BlocService } from '../../../services/bloc.service'
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { Router} from '@angular/router'

declare let jquery:any;
declare let $ :any;
@Component({
    selector: 'formulaire',
    moduleId: module.id,
    templateUrl: './formulaire.html',
    styleUrls: ['./formulaire.css'],
    encapsulation: ViewEncapsulation.None
})
export class FormulairePage implements OnInit {

    constructor(private blocservice:BlocService,
                private formservice:FormService,
                private confirmationService: ConfirmationService,
                private router:Router
    ){}

    model : any ={};
    availableblocs: any = [];
    selectedBlocs : any = [];
    msgs: any = [];
    available: any = {};
    selected: any = {};
    builderid: string;
    extrapolation: any = [];

    save(model, isValid: boolean) {
        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }
    createForm(){

        this.confirmationService.confirm({
            message: "Voulez vous confirmer l'enregistrement ?",
            accept: () => {
                this.formservice.createForm(this.model).then((data)=>{
                    this.formservice.selectedForm = []; //ugly
                    this.model = {};
                    this.router.navigate(['Parametrage/Parametrage'])
                },(err) =>{
                    this.msgs = [];                    
                    this.msgs.push({severity:'error', summary:'Error', detail:err.message}); //create service
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    console.log("can't create form");
                    console.log(err)
                });
            }
        });
        
    }
    getExtrapolation(){
        this.formservice.getExtrapolation(this.model.id_fields).then((data)=>{
            this.extrapolation = data
        })
    }

    //TODO : utiliser populate coté api pour reduire le delais sur les calls

    // moved to projet
    // onThemeChange(theme){
    //     console.log(theme);
    //     this.blocservice.getBlocs(theme).then((data) => {
    //         this.availableblocs = data;
    //         // retiré les blocs déja selectionné pour la duplication et l'update
    //         for (var i = 0, len = this.selectedBlocs.length; i < len; i++) { 
    //             for (var j = 0, len2 = this.availableblocs.length; j < len2; j++) { 
    //                 if (this.selectedBlocs[i]._id === this.availableblocs[j]._id) {
    //                     this.availableblocs.splice(j, 1);
    //                     len2=this.availableblocs.length;
    //                 }
    //             }
    //         } 
    //         console.log(this.availableblocs);
    //     },(err) => {
    //         console.log("can't retreive blocs ");
    //     });
    // }
    // moveItem(items,from,to){
    //     console.log(items);
    //     for(let index in items){
    //       let idx=from.indexOf(items[index]);
    //       console.log(idx);
    //       if(idx != -1){
    //           from.splice(idx, 1);
    //           to.push(items[index])
    //       }
    //     }
    // }
    // moveAll(from,to){
    //
    // for(let index in from){
    //     to.push(from[index])
    // }
    // from.length = 0;
    // }
    openpopup(){
        if(!this.model.id_fields && this.model.id_fields !== ""){
        this.model.id_fields = '_' + Math.random().toString(36).substr(2, 9);
        }
        
        window.open("http://localhost:8080/public/index.html?myParam=" + this.model.id_fields ,"popup","width=900,height=600,left=10,top=150")
    }
    opendemo(){
        window.open("http://localhost:8080/public/demo.html?myParam=" + this.model.id_fields ,"popup","width=900,height=600,right=10,top=150")
    }
    clearForm(){
        this.model = {}
    }
    debug(){
        console.log(this.model)
    }
  //  moveAll(){
    //      for(var i=0; i < this.blocs.length-1;i++){
      //        var element = this.blocs[i];
        //      this.blocs.splice(i,1)
          //    this.items2.push(element);
            //  i--
       //   }
      //  };


    geometry:Array<Object> = [
        {name:"Point",value:"point"},
        {name:"Polyline",value:"polyline"},
        {name:"Polygone",value:"polygone"},
        {name:"Sans Géométrie",value:"none"},
    ];

    themes:Array<Object> = [
        {name:"Annuelle", value:"annuelle"},
        {name:"Modulaire", value:"modulaire"},
        {name:"Complémentaire", value:"complementaire"},
        // {name:"Pillier I", value:"pillier1"},
        // {name:"Pillier II", value:"pillier2"},
        // {name:"Projet Financier",value:"financier"}        
        
        {name:"RNA", value:"rna"},
    ];
    ngOnInit() {
        this.model = {}
        window.dispatchEvent(new CustomEvent('formulaire-ready'));
        if(this.formservice.selectedForm !== null ){
            console.log('test')
            this.model = this.formservice.selectedForm ;
            this.builderid = this.model._id        }

    }
}