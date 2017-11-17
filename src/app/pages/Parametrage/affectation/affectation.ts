import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http'
import {TreeModule,TreeNode,TreeDragDropService } from 'primeng/primeng';

import{ UserService } from '../../../services/user.service'
import {PerimetreService} from '../../../services/perimetre.service'
import 'rxjs/add/operator/map';
import {forEach} from "@angular/router/src/utils/collection";

declare let jquery:any;
declare let $ :any;
@Component({
    selector: 'Affectation',
    templateUrl: './affectation.html',
    styleUrls: ['./affectation.css'],
    providers: [TreeDragDropService],
})

export class AffectationPage implements OnInit {
    constructor(private perimetreService:PerimetreService,private userSevice:UserService){}
    Communes: any = [];
    Agents: any = [];
    loading : boolean;
    getCommunes(){
        let current = this
        this.loading = true
        this.perimetreService.getCommunes().then((data:any[]) => {
           data.forEach(function(commune){
              current.Communes.push({
                "label": commune.name,
                "data": "Documents Folder",
                "expandedIcon": "fa-map-marker",
                "collapsedIcon": "fa-map-marker",
                })
           })
           this.loading = false
           console.log(current.Communes)
        }, (err) => {
            console.log("can't retreive blocs ");
        });
    }
    getAgents(){
        let current = this        
        this.userSevice.getAgents().then((data:any[])=> {
            data.forEach(function(agents){
                current.Agents.push({
                    "label": agents.nom +" "+ agents.prenom,
                    "data": "Documents Folder",
                    "expandedIcon": "fa-user",
                    "collapsedIcon": "fa-user",
                })
            })
            this.loading = false
        }, (err) => {
            console.log("can't retreive blocs ");
        });
    }
    files: TreeNode[] = 
        [
            {
                "label": "Agent 1",
                "data": "Documents Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [{
                        "label": "Work",
                        "data": "Work Folder",
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": [{"label": "Expenses.doc", "icon": "fa-file-word-o", "data": "Expenses Document"}, {"label": "Resume.doc", "icon": "fa-file-word-o", "data": "Resume Document"}]
                    },
                    {
                        "label": "Home",
                        "data": "Home Folder",
                        "expandedIcon": "fa-folder-open",
                        "collapsedIcon": "fa-folder",
                        "children": [{"label": "Invoices.txt", "icon": "fa-file-word-o", "data": "Invoices for this month"}]
                    }]
            },
            {
                "label": "Agent 2",
                "data": "Pictures Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [
                    {"label": "barcelona.jpg", "icon": "fa-file-image-o", "data": "Barcelona Photo"},
                    {"label": "logo.jpg", "icon": "fa-file-image-o", "data": "PrimeFaces Logo"},
                    {"label": "primeui.png", "icon": "fa-file-image-o", "data": "PrimeUI Logo"}]
            },
            {
                "label": "Movies",
                "data": "Movies Folder",
                "expandedIcon": "fa-folder-open",
                "collapsedIcon": "fa-folder",
                "children": [{
                        "label": "Al Pacino",
                        "data": "Pacino Movies",
                        "children": [{"label": "Scarface", "icon": "fa-file-video-o", "data": "Scarface Movie"}, {"label": "Serpico", "icon": "fa-file-video-o", "data": "Serpico Movie"}]
                    },
                    {
                        "label": "Robert De Niro",
                        "data": "De Niro Movies",
                        "children": [{"label": "Goodfellas", "icon": "fa-file-video-o", "data": "Goodfellas Movie"}, {"label": "Untouchables", "icon": "fa-file-video-o", "data": "Untouchables Movie"}]
                    }]
            }
        ]
        files2: TreeNode[] = 
        [
            {
                label: "Backup",
                data: "Backup Folder",
                expandedIcon: "fa-folder-open",
                collapsedIcon: "fa-folder"
            }
        ]
    ngOnInit() {
        this.getCommunes();
        this.getAgents();
    }        
}