import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
import { locale } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { FileUploader } from 'ng2-file-upload';



@Component({
    selector: 'Import',
    templateUrl: './import.html',
    styleUrls: ['./import.css']
})


export class ImportPage implements OnInit {
    constructor(){}
    uploader: FileUploader = new FileUploader({}); //Empty options to avoid having a target URL
    reader: FileReader = new FileReader();
       
    source : LocalDataSource
    loading : boolean = true 

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
    }

    ngOnInit(){
        this.reader.onload = (ev: any) => {
            let results = []
            let data = JSON.parse(ev.target.result)
            console.log(data)
            data.features.forEach(element => {
                Object.keys(element.properties).forEach(p =>{
                    this.settings.columns[p] = {'title':p}
                })
                results.push(element.properties)
            });
            this.source = new LocalDataSource(results)   
            this.loading = false
        };
        
        this.uploader.onAfterAddingFile = (fileItem: any) => {
            this.reader.readAsText(fileItem._file);
        };
    }
}