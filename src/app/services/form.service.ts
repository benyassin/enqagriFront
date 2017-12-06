import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from './Http-client';
import { Response } from '@angular/http'
import 'rxjs/add/operator/map';

@Injectable()
export class FormService {
    constructor(public http: HttpClient, public authService: AuthenticationService){}
    selectedForm: any = null;
    // return list des forms,
    //TODO : validation et traitement du return
    getForms(){
        return new Promise((resolve, reject) => {

            this.http.get('forms/')
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    //create form

    createForm(bloc){
        return new Promise((resolve, reject) => {

            this.http.post('forms/', JSON.stringify(bloc),)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                },(err:Response) => {
                    let details = err.json()
                    reject(details); 
                });

        });
    }

    deleteForm(id){
        return new Promise((resolve, reject) => {

            this.http.delete('forms/'+id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                },(err) => {
                  reject(err);
                })
            });
        }

    getFormsByTheme(theme){
      return new Promise((resolve, reject) => {

        this.http.get('forms/' + theme)
            .map(res => res.json())
            .subscribe(res => {
              resolve(res);
            },(err) => {
              reject(err);
            })
      });
    }

    getExtrapolation(id){
        return new Promise((resolve, reject) => {

            this.http.get('forms/'+id+'/extrapolation' )
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                },(err) => {
                    reject(err);
                })
        });
    }
}
