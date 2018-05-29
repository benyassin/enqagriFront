import { Injectable } from '@angular/core';
import { Http, Headers,Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PermissionService } from 'angular2-permission';
import { HttpClient } from './Http-client'


@Injectable()
export class UserService {
    constructor(
       private _permissionService: PermissionService,
       private http:HttpClient
      ){
       let user = JSON.parse(localStorage.getItem('user')) || {role: 'disconnected'}
       this._permissionService.define([user.role]);
      }

    selectedUser : any = null;
    user = JSON.parse(localStorage.getItem('user'));
    // return list des utilisateur , 
    //TODO : validation et traitement du return 
    getUsers(){
        
           return new Promise((resolve, reject) => {
             this.http.get('users/')
               .map(res => res.json())
               .subscribe(data => {
                 resolve(data);
               }, (err) => {
                 reject(err);
               });
           });
        
         }
    getUser(id){
      return new Promise((resolve,reject) => {
            this.http.get('users/' + id)
               .map(res => res.json())
               .subscribe(data => {
                 resolve(data);
               }, (err) => {
                 reject(err);
               });
           });
        
    }
    
         // Créer un noveau utilisateur return une promise 
         // TODO : validation et traitement du return 
    createUser(user){
            
      return new Promise((resolve, reject) => {
          this.http.post('users/', user)
              .map(res => res.json())
              .subscribe(res => {
                resolve(res);
              }, (err:Response) => {
              let details = err.json()
              reject(details)  
          });
      
          });
      
        }
    deleteUser(id){
        return new Promise((resolve, reject) => {
            this.http.delete('/users/'+ id)
                .map(res => res.json())
                .subscribe(res => {
                  resolve(res);
                }, (err:Response) => {
                    let details = err.json();
                    reject(details);
                });
        })
    }

    getAgents(){
      
         return new Promise((resolve, reject) => {
           this.http.get('users/agents/')
             .map(res => res.json())
             .subscribe(data => {
               resolve(data);
             }, (err) => {
               reject(err);
             });
         });
      
       }

       getAgentsByPerimetre(){

         return new Promise((resolve, reject) => {
           this.http.get('users/agents/perimetre')
             .map(res => res.json())
             .subscribe(data => {
               resolve(data);
             }, (err) => {
               reject(err);
             });
         });

       }

  getControlleurs(){
  
    return new Promise((resolve, reject) => {
      this.http.get('users/controlleurs/')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });

    }

    getControlleursByRegion(region){

        return new Promise((resolve, reject) => {
            this.http.get('users/controlleurs/'+region)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

    setAffectation(data){
    return new Promise((resolve, reject) => {
      console.log('here')
      this.http.post('users/affectation', data)
          .map(res => res.json())
          .subscribe(res => {
            resolve(res);
          }, (err:Response) => {
          let details = err.json()
          reject(details)  
      });
  
      });
  
    }

    clearNotification(){
        return new Promise((resolve, reject) => {
            this.http.delete('users/notification/clear')
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err:Response) => {
                    let details = err.json();
                    reject(details)
                });

        });

    }
}      
