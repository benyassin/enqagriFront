import { Component, OnInit } from '@angular/core';

import { ProjetService } from '../../../services/projet.service';
import { UserService } from '../../../services/user.service';
import { PerimetreService } from '../../../services/perimetre.service';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table/ng2-smart-table.component';


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
        window.open("/public/demo.html?myParam=" + id ,"popup","width=900,height=600,right=10,top=150")
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
    msgs : any = []
    getCommunes(){
        let current = this
        this.dataload = true
        this.perimetreservice.getCommunes().then((data:any[]) => {
           let tester = current.Agents.length                            
           data.forEach(function(commune){
                let array = [];
                let id_array = [];
                let i = 0
                current.Agents.forEach(function(obj){
                    let test = obj.affectation.findIndex(x => x.projet==current.projet._id) 
                    if( test != -1){
                        if(obj.affectation[test].communes.includes(commune.id_commune)){
                            array.push(obj.nom + ' ' +obj.prenom)
                            id_array.push(obj._id)
                        }
                    i++
                    console.log(i)
                }
                })

                    current.affectation.push({'commune':commune.name,'agents':array,'id_commune':commune.id_commune,'id_agents':id_array})                    
                
                
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
            // data.forEach(function(agents){
            //     current.Agents.push({
            //         "label": agents.nom +" "+ agents.prenom,
            //         "data": "Documents Folder",
            //         "expandedIcon": "fa-user",
            //         "collapsedIcon": "fa-user",
            //     })
            // })
            this.loading = false
            this.getCommunes();            
        }, (err) => {
            console.log("can't retreive blocs ");
        });
    }
    _agents = []
    row 
    event(data){
        // console.log(data)
        // console.log('affecation')
        // console.log(this.affectation)

        console.log('id_commune',data.data.id_commune)
        let index = this.affectation.findIndex(x => x.id_commune == data.data.id_commune)
        data.index = index
        this.row = data
         let row = this.affectation[index]
        row.agents.forEach(element => {
            this._agents.push(element)
        }); 
    }
    clear(){
        this._agents = []
    }
    _agent
    addAgent(agent){
        if(agent != null && agent != undefined){
        // let newArray = this.row.data
        this.affectation[this.row.index].agents.push(agent.nom + ' ' + agent.prenom)
        this.affectation[this.row.index].id_agents.push(agent._id);
        // this.source.update(this.row.data,newArray)
        // this.source.getAll().then((value) => {
        //     this.affectation = value
        // })
        this.source.load(this.affectation)
        this.source.refresh()
        this._agent = null
        console.log('affectation')
        // this.source.refresh()
        }
    }

    removeAgent(index){
        this._agents.splice(index,1)
        let newArray = this.affectation[this.row.index]
        this.affectation[this.row.index].agents.splice(index,1)
        this.affectation[this.row.index].id_agents.splice(index,1)
        // this.source.update(this.affectation[this.row.index],newArray)
        // this.affectation[this.row].agents.splice(index,1)
        // this.affectation[this.row].id_agents.splice(index,1)
        // this.source.getAll().then((value) => {
        //     this.affectation = value 
        //     this.source.load(this.affectation)
        // }) 
        this.source.load(this.affectation)
    }
    save(){
        let request : any = {}
        this.source.getAll().then((data) => {
            request.data = data
            request.projet = this.projet._id
            console.log(request)
            this.userservice.setAffectation(request).then((back) => {
                this.msgs = []
                this.msgs.push({severity:'success', summary:'Success', detail:"Affectation"}); //create service
                console.log(back)
            })
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
    rows = [
        { communes:'test',agents:['test','test'] },
        { communes:'test',agents:['test','test'] },
        { communes:'test',agents:['test','test']},
      ];
      columns = [
        { name: 'Communes' },
        { name: 'Agents' },
     ];
    ngOnInit(){
        if(this.projetservice.inspect !== null) this.getProjet(this.projetservice.inspect)
            this.getAgents();
        
    }
 }