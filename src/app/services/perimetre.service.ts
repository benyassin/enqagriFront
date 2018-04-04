import { Injectable } from '@angular/core';
import { HttpClient } from './Http-client';
import 'rxjs/add/operator/map';
import {Response} from '@angular/http';

@Injectable()
export class PerimetreService {
    constructor(public http: HttpClient){}

    // return list des forms,
    //TODO : validation et traitement du return
    getRegions(){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/region')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    getProvinces(province){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/province/' + province)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getMultipleRegionProvinces(region){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/province/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getCommunes(){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/communes/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getCommune(id){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/commune/'+ id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    getDpaOffice(){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/DpaOffice/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getCollection(){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/collections')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    createCollection(data){
        return new Promise((resolve, reject) => {

            this.http.post('perimetre/collections', JSON.stringify(data),)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                },(err:Response) => {
                    let details = err.json();
                    reject(details);
                });

        });
    }

    getSupport(id){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/support?id='+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getSupportKeys(id){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/supportkeys?id='+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getSupportByid(id){
        return new Promise((resolve, reject) => {
            this.http.get('perimetre/supportbyid?id='+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }

    deleteCollection(id){
        return new Promise((resolve, reject) => {
            this.http.delete('perimetre/collection/'+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err:Response) => {
                    let details = err.json();
                    reject(details);
                });
        });
    }

}