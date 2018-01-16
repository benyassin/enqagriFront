import { Component, OnInit, Input } from '@angular/core';
import { CollecteService}           from '../../services/collecte.service'
import { ProjetService } from '../../services/projet.service'
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
import { locale } from 'moment';
@Component({
    selector: 'Collecte',
    templateUrl: './collecte.html',
    styleUrls: ['./collecte.css']
})


export class CollectePage implements OnInit {
    public status: null;
    constructor(
        private collecteservice:CollecteService,
        private projetservice:ProjetService,
        private userservice:UserService,
        private router:Router
    ){}
    projet : any;
    collectes : any = [];
    projets : any;
    region : any;
    province : any;
    user;
    _region;
    _province;
    hide : boolean = true
    index;
    extrapolation
    anass
    _filtre
    _value
    compareById(obj1, obj2) {
        if(localStorage.getItem('storage') !== null ){
        return obj1._id === obj2._id;
        }
    }
    getSum(key,filtre,value) {
        if(this.collectes ){
        let sum = 0;
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value || this._filtre == null){
                sum += (this.collectes[i].collecte[0].data[0].formdata.data[key] || 0);  
            }
        }
        return sum;
    }
    }
    getAvg(key,filtre,value){
        if(this.collectes){
        let sum = 0;
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value || this._filtre == null){
          sum += (this.collectes[i].collecte[0].data[0].formdata.data[key] || 0);
            }
        }
        var avg = sum/this.collectes.length;
        
        return avg;
    }
}
    getVar(key,filtre,value){
        if(this.collectes){
        let sum = 0;
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value || this._filtre == null){
          sum += (this.collectes[i].collecte[0].data[0].formdata.data[key] || 0);
            }
        }
        var avg : number  = sum/this.collectes.length;
        let summm : number  = 0
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value || this._filtre == null){
            summm += Math.pow(((this.collectes[i].collecte[0].data[0].formdata.data[key] || 0) - avg),2)  ;
            }
        }
        
        summm /= this.collectes.length
        return summm
    }
    }

    getET(key,filtre,value){
        if(this.collectes){
        let sum = 0;
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value || this._filtre == null){
          sum += (this.collectes[i].collecte[0].data[0].formdata.data[key] || 0);
            }
        }
        var avg : number  = sum/this.collectes.length;
        let summm : number  = 0
        for(let i = 0; i < this.collectes.length; i++) {
            if(this.collectes[i].collecte[0].data[0].formdata.data[filtre] == value){
            summm += Math.pow(((this.collectes[i].collecte[0].data[0].formdata.data[key] || 0) - avg),2)  ;
            }
            
        }
        
        summm /= this.collectes.length
        
        return Math.sqrt(summm)
    }
    }
    onProjetChange(){
        // this.collectes = []
    }


    search(projet,status,region,province,filtre,valeur){
    this.hide = false
    this.anass = {theme:projet.theme,name:projet.name}
    if(projet == null || status == null ){
        return
    }
    this.extrapolation = projet.extrapolation
    if(this.projet !== null){
        localStorage.setItem('storage',JSON.stringify({'projet':this.projet,'status':status,'region':region,'province':province}));
    }

    if(this.user.role == 'controleur'){

        this.index = this.projet.validation.findIndex(x => x.agent==this.user._id);
            
        this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,filtre,valeur).then((data) => {
            this.collectes = data;
            this.collectes = this.collectes.map(function(element){
                element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm");
                return element;
            })
        },(err)=> {
            console.log('error trying to fetch collectes');
            console.log(err)
        })

    }else{
        this.hide = false        
        if(this.user.role == 'superviseurP'){
            region = this.user.perimetre.region.id_region;
            province = this.user.perimetre.province.id_province
        }
        switch(status){
            case 'valid' :
            this.index = this.projet.validation.length - 1;
            this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,filtre,valeur).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm")
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })
            break

            case 'new':           
            this.collecteservice.getCollectesByProjet(projet._id,0,status,region,province,filtre,valeur).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm");
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })
            break

            case 'reject':
            this.collecteservice.getCollecteEnTraitement(projet._id,this.index,region,province).then((data) => {
                this.collectes = data
                this.collectes = this.collectes.map(function(element){
                    element.createdAt = moment(new Date(element.createdAt)).format("DD.MM.YYYY à h:mm");
                    return element;
                })
            },(err)=> {
                console.log('error trying to fetch collectes')
                console.log(err)
            })

        }
    }

    }

    OnProjetSelect(projet){
        this.projet = projet;
        console.log(projet)
    }
    action(id,action){
        let update : any = {};
        update.niveau  = this.index;
        update.action = action;
        update.id = id;

        console.log(update);
        this.collecteservice.action(update).then((data) => {
            console.log(data)
        })
    }

    reset(){
        this.projet = null;
        this.status = null;
        if(this.user.role != 'superviseurR' && this.user.role != 'superviseurP'){
            this._region = null
        }
        if(this.user.role != 'superviseurP'){
            this._province = null
        }
        this.collectes = []
        this.hide = true
        localStorage.removeItem('storage')
      }

    getProjets(){
        if(this.user.role == 'controleur'){
            console.log('im a controller')
        this.projetservice.getProjetsByController().then((data : any) =>{
            this.projets = data;
            // this.region = data.perimetre.region;
            // this.province = data.perimetre.province;
            this.checkStorage();
        },(err : any) => {
            console.log('error fetching collectes',err)
        })
    }else if(this.user.role == 'agent'){
        let projets = []
        this.projetservice.getAgentsProjet().then((data: any) =>{
            data.forEach(element => {
                projets.push(element.projet)
            });
            this.projets = projets
            this.checkStorage();
        })
    }else{
        this.projetservice.getProjetsByPerimetre().then((data : any)=>{
            this.projets = data;
            this.checkStorage()
        })
    }
    }

    checkStorage(){
        console.log('im here');
        if(localStorage.getItem('storage') != null){
            let data = JSON.parse(localStorage.getItem('storage'));
            this.projet = data.projet;
            this.status = data.status;
            this._province = data.province;
            this._region = data.region;
            this.search(this.projet,this.status,this._region,this._province,'test','test');
            console.log('here')
        }
    }
    consulter(collecte,projet){
        console.log(projet);
        this.collecteservice.getCollecte(collecte._id).then((data : any) => {
            this.collecteservice.collecte = data
            this.collecteservice.collecte.projet = projet;
            this.collecteservice.collecte.agent = collecte.agent;
            if(this.collecteservice.collecte.geo == false ){
              return this.router.navigate(['collectes/geoless'])
            }
            if(projet.theme == 'rna'){
                this.router.navigate(['collectes/rnacollecte'])
            }else{
                this.router.navigate(['collectes/collecte'])
            }
        },(err) =>{
            console.log('error trying to fetch collecte id : ' + collecte._id)
            console.log(err)
        })
    }
    calculate(data,formule){
        let result 
        switch (formule.operateur) {
            case '+':
                result = data[formule.variables[0]] + data[formule.variables[1]]
                break;
            case '-':
                result = data[formule.variables[0]] - data[formule.variables[1]]
                break;
            case '*':
                result = data[formule.variables[0]] * data[formule.variables[1]]
            break;     
            case '/':
                result = data[formule.variables[0]] / data[formule.variables[1]]
            break;      
            default:
                break;
        }
        return result
    }
    _status:Array<Object>
    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user')) 
        if(this.user.role == 'controleur'){
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
            if(this.user.role == 'superviseurP' || this.user.role == 'agent'){
                this._province = this.user.perimetre.province.id_province
                this._region = this.user.perimetre.region.id_region
            }
            

        }
        this.getProjets()                
    }
 }
