import { Component, OnInit } from '@angular/core';

import { ProjetService } from '../../../services/projet.service'
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { Router} from '@angular/router'

@Component({
  selector: 'inspect',
  templateUrl: 'inspect.html',
})
export class testProjetPage implements OnInit  {
    constructor(
        private projetservice:ProjetService,
    ){}
    projet : any = {};

    opendemo(id){
        window.open("http://localhost/demo.html?myParam=" + id ,"popup","width=900,height=600,right=10,top=150")
    }
    getProjet(id){
        this.projetservice.getProjet(id).then((data) =>{
            this.projet = data[0]

        },(err)=>{
            console.log("can't fetch projet");
            console.log(err)
        })
    }
    test(){
        console.log(this.projet)
    }
    ngOnInit(){
        if(this.projetservice.inspect !== null) this.getProjet(this.projetservice.inspect)
    }
 }