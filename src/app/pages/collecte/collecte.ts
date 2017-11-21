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
    search(projet,status){
       this.collecteservice.getCollectesByProjet(projet,1,status).then((data) => {
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
    status:Array<Object> = [
        {name:"Valid", value:"valid"},
        {name:"Brute",value:'brute'},
        {name:"Rejected",value:"rejected"}
    ];
    ngOnInit(){
        this.getProjets()
    }
 }
