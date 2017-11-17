import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {PerimetreService } from '../../services/perimetre.service';
import { ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    ValidationErrors,
    FormBuilder } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';


//TODO: validation // traitement du return 
// utiliser Splice pour actualiser la list des utilisateur (getUser,createUser,deleteUser )
//trouver une solution pour les array (region,province,commune et role)
@Component({
    moduleId: module.id,    
    selector: 'utilisateur',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css'],
})



export class UtilisateurPage implements OnInit {
    constructor(
        public userService: UserService,private confirmationService: ConfirmationService,private router:Router
    ){}
    users: any;
    
    deleteUser(id){
        this.confirmationService.confirm({
            message: 'Voulez vous confirmer la suppression ?',
            accept: () => {
        this.userService.deleteUser(id).then((data) =>{
            this.getUsers();
        },(err) => {
            console.log("error deleting user");
        });
        } })
    }
    createUser(){
        this.userService.selectedUser = null;
        this.router.navigate(['utilisateur/creation'])
    }
    update(user){
        this.userService.selectedUser = user
        this.router.navigate(['utilisateur/creation'])
    }
    getUsers() {
        this.userService.getUsers().then((data) => {
            this.users = data;
      }, (err) => {
          console.log("err trying to fetch users " + err);
      });
    };
    ngOnInit(){
        this.getUsers()
    }
}