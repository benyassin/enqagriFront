import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
import { locale } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { FileUploader } from 'ng2-file-upload';
import { PerimetreService } from '../../services/perimetre.service'
import {ProjetService} from '../../services/projet.service';

const URL = 'http://localhost:8080/api/upload';


@Component({
    selector: 'Import',
    templateUrl: './import.html',
    styleUrls: ['./import.css']
})


export class ImportPage implements OnInit {
    constructor(
        private perimetreservice:PerimetreService,
    ){}
    reader: FileReader = new FileReader();
    msgs : any = [];
    cName : String;
    selectedc;
    collection;
    collectionList;
    SupportList
    source : LocalDataSource;
    loading : boolean = true;
    uploader: FileUploader = new FileUploader({url: URL}); //Empty options to avoid having a target URL

    settings = {
        columns: {
        },
        actions:{
            add   : false,
            edit  : true,
            delete: true,
            position: 'right'
        },
        pager:{
            perPage:25
        },
        noDataMessage:' '
    };

    createCollection(name,type){
        this.perimetreservice.createCollection({name:name,type:type}).then((data) =>{
            this.getCollection()
        })
    }
    getCollection(){
        this.perimetreservice.getCollection().then((data) => {
            this.collectionList = data
        } );
    }
    FileSelected(name) {
        this.uploader.onBeforeUploadItem = (item) => {
            item.withCredentials = false;
            item.url = URL + '?id=' + name._id;
        }
    }
    upload(name){
        // this.uploader.options.additionalParameter = {
        //     parent_id: name._id
        // };
        this.uploader.options.url = URL + '?id=' + name._id;
        this.uploader.uploadAll()
    }
    getSupport(id){
        this.perimetreservice.getSupport(id).then((data : any) =>{
            this.SupportList = data
            let results = []
            console.log(data)
            data.forEach(element => {
                Object.keys(element.properties).forEach(p =>{
                    this.settings.columns[p] = {'title':p}
                })
                results.push(element.properties)
            });
            this.source = new LocalDataSource(results);
            this.loading = false
        } )
    }
    ngOnInit(){
        this.uploader.onAfterAddingFile = (item => {
            item.withCredentials = false;
         });
        this.getCollection();

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            let responsePath = JSON.parse(response);
            this.msgs.push({severity:'success', summary:'', detail:'Nombre de collectes correspondant à vos critères de recherche : '+ responsePath.inserted });
            console.log(response, responsePath);// the url will be in the response
        };
    }
}