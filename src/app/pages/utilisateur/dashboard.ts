import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


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
    loading : boolean = true
    msgs :any = [];

    settings = {
        columns: {
            nom:{
                title:'Nom'
            },
            prenom:{
                title:'Prenom'
            },
            email:{
                title:'Email'
            },
            login:{
                title:'Login'
            },
            role:{
                title:'Role'
            },
        },
        actions:{
            add   : false,
            edit  : false,
            delete: false,
            custom: [{ name: 'edit', title: `<a type="button" title="See Detail Product" class="btn btn-primary btn-xs"><i class="ion-edit"></i></a>` },{ name: 'delete', title: `<a type="button" title="See Detail Product" class="btn btn-danger btn-xs"><i class="ion-trash-a"></i></a>` }],
            position: 'right'
        },
        pager:{
            perPage:25
        },
        noDataMessage:' '
      };
    testfunc(data){
        switch (data.action) {
            case 'edit':
            this.update(data.data)
                break;
            case 'delete':
            this.deleteUser(data.data._id)
            default:
                break;
        }
    }
    deleteUser(id){
        this.confirmationService.confirm({
            message: 'Voulez vous confirmer la suppression ?',
            accept: () => {
        this.userService.deleteUser(id).then((data) =>{
            this.getUsers();
        },(err) => {
            console.log("error deleting user");
            this.msgs = [];
            this.msgs.push({severity:'error', summary:"Erreur", detail: err.message })
        });
        } })
    }
    createUser(){
        this.userService.selectedUser = null;
        this.router.navigate(['utilisateur/creation'])
    }
    update(user){
        console.log(user)
        this.userService.selectedUser = user
        this.router.navigate(['utilisateur/creation'])
    }
    getUsers() {
        this.userService.getUsers().then((data) => {
            this.users = data;
            this.loading = false
      }, (err) => {
          console.log("err trying to fetch users " + err);
      });
    };
    rows = [
        { Nom: 'Austin', Prenom: 'Male', login: 'Swimlane',email:'geocoding@geocoding.ma',role:'admin',action:'action' },
        { nom: 'Austin', prenom: 'Male', login: 'Swimlane',email:'geocoding@geocoding.ma',role:'admin',action:'action' },
        { nom: 'Austin', prenom: 'Male', login: 'Swimlane',email:'geocoding@geocoding.ma',role:'admin',action:'action' },
      ];
      columns = [
        { prop: 'Nom' },
        { name: 'Prenom' },
        { name: 'Login' },
        { name: 'Email' },
        { name: 'Role' },
        { name: 'Action' }
     ];
    ngOnInit(){
        this.getUsers()
    }
}