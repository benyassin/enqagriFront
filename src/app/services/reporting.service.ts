import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client';




@Injectable()

export class ReportingService {
    constructor(
    private http:HttpClient
    ){}

getDashboardData(){
    return new Promise((resolve, reject) => {
        this.http.get('reporting/dashboard')
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}


getDashboard2(id,niveau,status,region,province,commune,pmax){
        if(typeof region == "undefined" || region == null){
            region = 0
        }
        if(typeof province == "undefined" || province == null){
            province = 0
        }
        if(typeof commune == "undefined" || commune == null){
            commune = 0
        }
        return new Promise((resolve, reject) => {
            this.http.get('reporting/dashboard2/' + id + '?niveau=' + niveau + "&status=" + status + "&region=" + region + "&province=" +province +"&commune=" + commune +"&pmax=" + pmax)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }
}

