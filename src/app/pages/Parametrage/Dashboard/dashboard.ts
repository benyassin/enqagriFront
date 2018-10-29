import { Component, OnInit, Input } from '@angular/core';
import { FormService } from '../../../services/form.service'
import { ProjetService } from '../../../services/projet.service'
import { UserService } from '../../../services/user.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
@Component({
    selector: 'Dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})


export class DashboardPage implements OnInit {
    constructor(
                private formservice:FormService,
                private projetservice:ProjetService,
                private confirmationService: ConfirmationService,
                private userservice: UserService,
                private router: Router
    ){}
    forms : any = {};
    projets : any = {};
    _projets : any = {};
    msgs  : any = [];
    user = this.userservice.user
    disable : any = []
    isChecked : any = false;
    getForms(){

        this.formservice.getForms().then((data) => {
            this.forms = data;
            console.log(data)
        },(err) => {
            console.log("error trying to fetch forms " + err)
        })
    }


    
    getProjets(){
        let that = this
        this.projetservice.getProjets().then((data) => {
                console.log(data)
                this.projets = data
                done()
            },(err) =>{
                console.log("error trying to fetch projets")
                console.log(err)
            })
     function done (){
            that.projets.map(function(projets){
                projets.forms.map(function(form){
                   if(!that.disable.includes(form._id)){
                       that.disable.push(form._id)
                   }
                })
        })
    }
    }
    getProjetsByPerimetre(){
        this.projetservice.getProjetsByPerimetre().then((data)=> {
            console.log(data)
            this._projets = data
        },(err) =>{
            console.log("error trying to fetch projets")
            console.log(err)
        })
    }
    getAgentProjet(){
        this.projetservice.getAgentsProjet().then((data :any)=> {
           let list = []
            data.forEach(element => {
                list.push(element.projet)
            });
            this._projets = list
        },(err) =>{
            console.log("error trying to fetch projets")
            console.log(err)
        })
    }
    deleteForm(id:any){
        this.confirmationService.confirm({
            message: 'Voulez vous confirmer la suppression ?',
            accept: () => { 
            this.formservice.deleteForm(id).then((data) => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.msgs = []
                this.msgs.push({severity:'success', summary:'Success', detail:'Le Questionnaire a été supprimé avec succès'});
                console.log("form with the id " + id +" was deleted successfully")
            //TODO: utiliser Splice pour retirer l'element supprimer de la list des forms
                this.getForms();
        },(err) => {
            console.log("error trying to delete bloc " + err)
        }) 
    }
    })
    }

    deleteProjet(id:any){
        this.confirmationService.confirm({
            message: 'Voulez vous confirmer la suppression ?',
            accept: () => { 
            this.projetservice.deleteProjet(id).then((data) => {
                document.body.scrollTop = document.documentElement.scrollTop = 0;  
                this.msgs = []
                this.msgs.push({severity:'success', summary:'Success', detail:"l'Enquête a été supprimé avec succès"});
                console.log("form with the id " + id +" was deleted successfully")
            //TODO: utiliser Splice pour retirer l'element supprimer de la list des forms
                this.getProjets();
        },(err) => {
            console.log("error trying to delete bloc " + err)
                this.msgs = []
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.msgs.push({severity:'error', summary:'Erreur', detail:err.message});

            })
    }
    })
    }
    updateForm(form){
        this.formservice.selectedForm = form;
        this.router.navigate(['Parametrage/Questionnaire']);
    }
    updateProjet(projet){
        this.projetservice.CheckProjet(projet._id).then((data) =>{
            console.log(data)
            this.projetservice.Projet = projet
            if(data >= 1){
                this.projetservice.Projet.edit = false
            }else{
                this.projetservice.Projet.edit = true
            }
            this.router.navigate(['Parametrage/Enquete'])
        },(err) =>{
            console.log(err)
        })
        // this.projetservice.Projet = projet
    }
    duplicateForm(form){
        delete form._id
        delete form.id
        delete form.name
        this.formservice.selectedForm = form
        this.formservice.selectedForm.duplicate = true
        this.router.navigate(['Parametrage/Questionnaire'])
    }

    newForm(){
        this.formservice.selectedForm = null;
        this.router.navigate(['Parametrage/Questionnaire'])
    }
    newProjet(){
        this.projetservice.Projet = null;
        this.router.navigate(['Parametrage/Enquete'])
    }
    inspect(projet){
        this.projetservice.inspect = projet
        this.router.navigate(['Parametrage/Enquete/inspect'])
    }
    opendemo(id){
        window.open("/public/demo.html?myParam=" + id ,"popup","width=900,height=600,right=10,top=150")
    }
    themes = [
        {name: "Annuelle",value:"annuelle"},
        {name: "Modulaire",value: "modulaire"},
        {name: "Complementaire",value:"complementaire"},
        {name: "Sans Theme",value: "sanstheme"}
    ]
    toggle(projet){
        this.projetservice.toggleProjet(projet.id).then((res) =>{
            console.log(res)
        },(err) => {
            console.log(err)
        })

    }
    checkValue(projet){
        this.projetservice.toggleProjet(projet._id).then((res) =>{
            projet.archived = !projet.archived
            console.log(res)
        },(err) => {
            console.log(err)
        })
      }
    ngOnInit(){
        window.dispatchEvent(new CustomEvent('ui-widget-boxes-ready'));
        window.dispatchEvent(new CustomEvent('init-component'));
        if(this.user.role == 'admin'){
            this.getForms();
            this.getProjets();

        }else if( this.user.role == 'agent'){
            this.getAgentProjet()
        }else if(this.user.role == 'controleur'){
        this.projetservice.getProjetsByController().then((data : any) =>{
            this._projets = data;
            // this.region = data.perimetre.region;
            // this.province = data.perimetre.province;
        },(err : any) => {
            console.log('error fetching collectes',err)
        })
        }else{
            this.getProjetsByPerimetre();
        }

    }
}