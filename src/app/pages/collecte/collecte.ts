import { Component, OnInit, Input } from '@angular/core';
import { CollecteService}           from '../../services/collecte.service'
import { ProjetService } from '../../services/projet.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
@Component({
    selector: 'Collecte',
    templateUrl: './collecte.html',
    styleUrls: ['./collecte.css']
})


export class CollectePage implements OnInit {
    constructor(
        private collecteservice:CollecteService,
        private projetservice:ProjetService,
        private router:Router
    ){}
    projet : any
    collectes : any
    projets : any
    status
    id
    search(projet,status){
    let index = this.projet.validation.findIndex(x => x.agent==this.id);
        
       this.collecteservice.getCollectesByProjet(projet._id,index,status).then((data) => {
           this.collectes = data
          this.collectes = this.collectes.map(function(element){
               element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
               return element;
           })
           console.log(this.collectes)
       },(err)=> {
           console.log('error trying to fetch collectes')
           console.log(err)
       })
        console.log(index)
        console.log(this.projet.validation.length)
    }
    validate(id){
        let update : any = {}
        update.index  = this.projet.validation.findIndex(x => x.agent==this.id);
        update.status = 0;
        update.id = id
        let length = this.projet.validation.length
        console.log()
        if(update.index + 1 === length){
            update.status = 1
        }
        console.log(update)
        this.collecteservice.validate(update).then((data) => {
            console.log(data)
        })
    }
    reject(id){
        let update : any = {}
        update.index = this.projet.validation.findIndex(x => x.agent==this.id);
        if(update.index > 0){
            update.index--
        }
        this.collectes.reject(update).then((data) => {
            console.log(data)
        })
    }
    getProjets(){
        this.projetservice.getProjetsByController().then((data : any) =>{
            this.projets = data
        },(err : any) => {
            console.log('error fetching collectes',err)
        })
    }
    consulter(id,type,agent){
        this.collecteservice.getCollecte(id).then((data : any) => {
            this.collecteservice.collecte = data
            this.collecteservice.collecte.agent = agent
            console.log(this.collecteservice.collecte.geo)
            if(this.collecteservice.collecte.geo == false ){
              return this.router.navigate(['collectes/geoless'])
            }
            if(type == 'rna'){
                this.router.navigate(['collectes/rnacollecte'])
            }else{
                this.router.navigate(['collectes/collecte'])
            }
        },(err) =>{
            console.log('error trying to fetch collecte id : ' + id)
            console.log(err)
        })
    }
    _status:Array<Object> = [
        {name:"VAlid", value:1},
        {name:"new",value:0},
        {name:"Rejected",value:-1}
    ];
    ngOnInit(){
        this.getProjets()
        this.id = JSON.parse(localStorage.getItem("user"))._id
        console.log(this.id)
    }
 }
