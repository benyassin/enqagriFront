import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
import { locale } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { FileUploader } from 'ng2-file-upload';

const URL = 'http://localhost:8080/upload';


@Component({
    selector: 'Import',
    templateUrl: './import.html',
    styleUrls: ['./import.css']
})


export class ImportPage implements OnInit {
    constructor(){}
    uploader: FileUploader = new FileUploader({url: URL}); //Empty options to avoid having a target URL
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
        this.uploader.onAfterAddingFile = (item => {
            item.withCredentials = false;
         });
    }
}