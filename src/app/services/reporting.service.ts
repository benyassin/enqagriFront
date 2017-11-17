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
}}