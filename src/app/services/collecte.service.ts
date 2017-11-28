import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client';




@Injectable()

export class CollecteService {
    constructor(
    private http:HttpClient
    ){}
collecte : any = null
getCollecte(id){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/' + id)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}
getCollectes(){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/')
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

getCollectesByProjet(id,niveau,status,region,province){
    if(typeof region == "undefined"){
        region = 0
    }
    if(typeof province == "undefined"){
        province = 0
    }
    return new Promise((resolve, reject) => {
        this.http.get('collectes/projet/' + id + '?niveau=' + niveau + "&status=" + status + "&region=" + region + "&province=" +province)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

getCollecteEnTraitement(id){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/traitement/'+ id)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

action(data){
		return new Promise((resolve, reject) => {
			this.http.post('collectes/validate', JSON.stringify(data),)
				.map(res => res.json())
				.subscribe(res => {
					resolve(res);
				},(err:Response) => {
					let details = err.json()
					reject(details); 
				});
	
		});
}

}