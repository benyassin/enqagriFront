import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client';




@Injectable()

export class ProjetService {
    constructor(
        private http:HttpClient
    ) {  
    }
    Projet: any = null;
    inspect :any = null;

    createProjet(Projet){
        return new Promise((resolve, reject) => {
                        
            this.http.post('projets/', JSON.stringify(Projet))
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                },(err:Response) => {
                    let details = err.json()
                    reject(details)  
                });
              
            });
      }
    getProjet(id){
        return new Promise((resolve, reject) => {
            this.http.get('projets/' + id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });
    }
    getProjets(){
        return new Promise((resolve, reject) => {
            this.http.get('projets')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }
    getProjetsByPerimetre(){
        return new Promise((resolve, reject) => {
            this.http.get('projets/projets/test')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    getAgentsProjet(){
        return new Promise((resolve, reject) => {
            this.http.get('projets/Agent/list')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    
    deleteProjet(id){
        return new Promise((resolve, reject) => {

            this.http.delete('projets/'+id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                },(err:Response) => {
                    let details = err.json();
                    reject(details)                   
                })
            });
        }

    getProjetsByController(){
        console.log('fetch projets')
            return new Promise((resolve, reject) => {
                this.http.get('projets/controller/projets')
                    .map(res => res.json())
                    .subscribe(data => {
                        resolve(data);
                    }, (err) => {
                        reject(err);
                    });
            });
    
        }
    CheckProjet(id){
        return new Promise((resolve, reject) => {
            this.http.get('projets/' + id + '/check')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

 
}