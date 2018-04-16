import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { LocalDataSource } from 'ng2-smart-table';
import { FileUploader } from 'ng2-file-upload';
import { PerimetreService } from '../../services/perimetre.service'

const URL = location.protocol+'//'+location.hostname+'/api/upload';


@Component({
    selector: 'Import',
    templateUrl: './import.html',
    styleUrls: ['./import.css']
})


export class ImportPage implements OnInit {
    public canUpload: boolean;
    constructor(
        private perimetreservice:PerimetreService,
    ){}
    reader: FileReader = new FileReader();
    msgs : any = [];
    cName : String;
    type
    selectedc;
    collection;
    collectionList;
    SupportList;
    source : LocalDataSource;
    loading : boolean = true;
    show : boolean = false;
    allowedMimeType = ['application/geo+json'];
    uploader: FileUploader = new FileUploader({url: URL}); //Empty options to avoid having a target URL

    settings = {
        columns: {
        },
        actions:{
            add   : false,
            edit  : false,
            delete: false,
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
            this.cName = null;
            this.type = null
        },(err) =>{
            console.log(err)
        })
    }
    getCollection(){
        this.perimetreservice.getCollection().then((data) => {
            this.collectionList = data
        },(err)=>{
            console.log(err)
        });
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
        this.uploader.queue[this.uploader.queue.length-1].upload()
        // this.uploader.uploadAll()
    }
    delete(collection){
        this.perimetreservice.deleteCollection(collection._id).then((data)=>{
            // console.log('index',this.collectionList.indexOf(collection))

           this.collectionList.splice(this.collectionList.indexOf(collection),1)
        },(err)=>{
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Erreur de suppression', detail: err.error });
            console.log(err)
        })
    }
    check(name){
        if (this.collectionList.filter(e => e.name === name).length > 0) {
            return true
        }else{
            return false
        }
    }

    getSupport(id){
        this.show = true;
        this.loading = true;
        this.perimetreservice.getSupport(id).then((data : any) =>{
            let results = [];
            this.settings.columns = {};
            if(data.support.length > 0){
            this.SupportList = data.support;
            data.order.forEach(p =>{
                this.settings.columns[p] = {'title':p}
            });
            if(this.SupportList[0].hasOwnProperty('properties') && data.support.length > 0 ){
                console.log("can't trigger this if")
                this.SupportList.forEach(element => {
                    results.push(element.properties)
                });
            }else{
                results = this.SupportList
            }
            console.log('////////results///////////')
            console.log(results);
            }
            this.source = new LocalDataSource(results);

            this.show = false;
            this.loading = false
        } )
    }

    onWhenAddingFileFailed(item, filter: any, options: any) {
        switch (filter.name) {
            case 'mimeType':
                const allowedTypes = this.allowedMimeType.join();
                console.log(`Type "${item.type} is not allowed. Allowed types: "${allowedTypes}"`);
                break;
            default:
                console.log(`Unknown error (filter is ${filter.name}`);
        }
    }
    ngOnInit(){
        // this.reader.onload = (ev: any) => {
        //     let data = JSON.parse(ev.target.result);
        // //     console.log(data);
        //     const keys = data.features[0].properties;
        //     if(keys.id_commune && keys.id_province && keys.id_region && keys.id_echantillon){
        //         console.log('allowed to upload')
        //     }
        //     else {
        //         console.log('missing properties');
        //         this.canUpload = false
        //     }
        // };


        this.uploader.onAfterAddingFile = (item => {
            this.reader.readAsText(item._file);
            item.withCredentials = false;
            let ext = item.file.name.split('.').pop();
            if(ext == 'geojson' || ext == 'csv'){
                this.canUpload = true
            }else{
                item.remove();
                this.canUpload = false
            }
         });


        this.uploader.onWhenAddingFileFailed = (item, filter, options) => this.onWhenAddingFileFailed(item, filter, options);
        this.getCollection();

        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            let responsePath = JSON.parse(response);
            console.log(status);
            if(status === 500){
                this.msgs = [];
                this.msgs.push({severity:'error', summary:'', detail:responsePath.messages });

            }else{
                this.msgs.push({severity:'success', summary:'', detail:'Nombre de collectes correspondant à vos critères de recherche : '+ responsePath.inserted });
            }
            console.log(response, responsePath);// the url will be in the response
        };
    }
}