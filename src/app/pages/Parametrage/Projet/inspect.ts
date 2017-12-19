import { Component, OnInit } from '@angular/core';

import { ProjetService } from '../../../services/projet.service';
import { UserService } from '../../../services/user.service';
import { PerimetreService } from '../../../services/perimetre.service';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {LocalDataSource } from 'ng2-smart-table';

import { Router} from '@angular/router';

@Component({
  selector: 'inspect',
  templateUrl: 'inspect.html',
  styleUrls: ['./inspect.css'],
})
export class testProjetPage implements OnInit  {
    constructor(
        private projetservice:ProjetService,
        private userservice:UserService,
        private perimetreservice:PerimetreService
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
    Communes: any = [];
    Agents : any = [];
    loading : boolean;
    dataload: boolean;
    source : LocalDataSource 
    affectation : any = [] 
    getCommunes(){
        let current = this
        this.dataload = true
        this.perimetreservice.getCommunes().then((data:any[]) => {
            console.log(data)
           data.forEach(function(commune){
                current.affectation.push({'commune':commune.name,'agents':[],'id_commune':commune.id_commune,'id_agents':[]})
           })
           this.source = new LocalDataSource(this.affectation)
           this.dataload = false
        }, (err) => {
            console.log("can't retreive communes ");
        });
    }
    getAgents(){
        let current = this        
        this.userservice.getAgents().then((data:any[])=> {
            this.Agents = data
            console.log(data)
            // data.forEach(function(agents){
            //     current.Agents.push({
            //         "label": agents.nom +" "+ agents.prenom,
            //         "data": "Documents Folder",
            //         "expandedIcon": "fa-user",
            //         "collapsedIcon": "fa-user",
            //     })
            // })
            this.loading = false
        }, (err) => {
            console.log("can't retreive blocs ");
        });
    }
    _agents = []
    row 
    event(data){
        this.row = data
    let row = this.affectation[data.index]
        row.agents.forEach(element => {
            this._agents.push(element)
        }); 
    }
    clear(){
        console.log(this._agents)
        this._agents = []
    }
    _agent
    addAgent(agent){
        if(agent != null && agent != undefined){
        let newArray = this.row.data
        newArray.agents.push(agent.nom + ' ' + agent.prenom)
        newArray.id_agents.push(agent._id);
        this.source.update(this.row.data,newArray)
        this.source.getAll().then((value) => {
            this.affectation = value
            this.source.load(this.affectation)
        })
        this._agent = null
        console.log('affectation')
        console.log(this.affectation)
        // this.source.refresh()
    }
    }
    removeAgent(index){
        this._agents.splice(index,1)
        let newArray = this.affectation[this.row.index]
        newArray.agents.splice(index,1)
        newArray.id_agents.splice(index,1)
        this.source.update(this.affectation[this.row.index],newArray)
        // this.affectation[this.row].agents.splice(index,1)
        // this.affectation[this.row].id_agents.splice(index,1)
        this.source.getAll().then((value) => {
            this.affectation = value 
            this.source.load(this.affectation)
        }) 
    }
    settings = {
        columns: {
            commune:{
                title:'Communes',
                width:'60px'
            },
            agents: {
                title:'Agents'
            },
        },
        mode:'external',
        actions:{
            add   : false,
            edit  : true,
            delete: false,
            position: 'right',
            width: '20px'
        }
    }
    
    ngOnInit(){
        if(this.projetservice.inspect !== null) this.getProjet(this.projetservice.inspect)
            this.getCommunes();
            this.getAgents();
    }
 }