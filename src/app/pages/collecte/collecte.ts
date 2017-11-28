import { Component, OnInit, Input } from '@angular/core';
import { CollecteService}           from '../../services/collecte.service'
import { ProjetService } from '../../services/projet.service'
import { UserService } from '../../services/user.service'
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
        private userservice:UserService,
        private router:Router
    ){}
    projet : any
    collectes : any
    projets : any
    region : any
    province : any
    user
    _region  
    _province 
    status

    index 
    search(projet,status,region,province){
    if(this.user.role == 'controlleur'){

        this.index = this.projet.validation.findIndex(x => x.agent==this.user._id);
            
        this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province).then((data) => {
            this.collectes = data
            this.collectes = this.collectes.map(function(element){
                element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
                return element;
            })
        },(err)=> {
            console.log('error trying to fetch collectes')
            console.log(err)
        })

    }else{
        if(this.user.role == 'superviseurP'){
            region = this.user.perimetre.region.id_region
            province = this.user.perimetre.province.id_province
        }
        switch(status){
            case 'valid' :
            this.index = this.projet.validation.length - 1
            this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes')
                console.log(err)
            })
            break

            case 'new':           
            this.collecteservice.getCollectesByProjet(projet._id,0,status,region,province).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes')
                console.log(err)
            })
            break

            case 'reject':
            this.collecteservice.getCollecteEnTraitement(projet._id).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes')
                console.log(err)
            })

        }
    }

    }
    action(id,action){
        let update : any = {}
        update.niveau  = this.index;
        update.action = action;
        update.id = id

        console.log(update)
        this.collecteservice.action(update).then((data) => {
            console.log(data)
        })
    }

    getProjets(){
        if(this.user.role == 'controlleur'){
        this.projetservice.getProjetsByController().then((data : any) =>{
            this.projets = data;
            this.region = data.perimetre.region;
            this.province = data.perimetre.province;
        },(err : any) => {
            console.log('error fetching collectes',err)
        })
    }else{
        this.projetservice.getProjetsByPerimetre().then((data : any)=>{
            this.projets = data
        })
    }
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
    onProjetSelect(){

    }
    _status:Array<Object>
    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user')) 
        if(this.user.role == 'controlleur'){
            this._status = [
                {name:"Validé", value:'valid'},
                {name:"En attente de validation",value:'new'},
                {name:"Refusé",value:'reject'}
            ];
        }else{
            this._status = [
                {name:"Validé", value:'valid'},
                {name:"En attente de validation",value:'new'},
                {name:"En cours de validation",value:'reject'}
            ]

            if(this.user.role == 'superviseurR'){
                this._region = this.user.perimetre.region.id_region
            }
            if(this.user.role == 'superviseurP'){
                this._province = this.user.perimetre.province.id_province
                this._region = this.user.perimetre.region.id_region
            }

        }    
        this.getProjets()
    }
 }
