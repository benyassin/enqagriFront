import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client'
import { PermissionService } from 'angular2-permission';


@Injectable()
export class BlocService {
    constructor(public http:HttpClient,
      public authService: AuthenticationService,
      private _permissionService: PermissionService,
    ){
    
    }

    selectedBloc: any = {};
    
    createBloc(bloc){
      return new Promise((resolve, reject) => {
                      
          this.http.post('blocs/', JSON.stringify(bloc))
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              },(err) => { 
                reject(err);
              });
            
               });
    }
    getBlocs(theme){
      return new Promise((resolve, reject) => {
        
          this.http.get('blocs/?theme=' + theme)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              },(err) => {
                reject(err);
              })
              });
    }
    deleteBloc(id){
      return new Promise((resolve, reject) => {
        
          this.http.delete('blocs/'+id)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              },(err) => {
                reject(err);
              })
              });
    }
}