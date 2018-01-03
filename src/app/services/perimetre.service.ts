import { Injectable } from '@angular/core';
import { HttpClient } from './Http-client';
import 'rxjs/add/operator/map';

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

}