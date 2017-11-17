import { Component, OnInit } from '@angular/core';
import { ProjetService } from '../../services/projet.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'profile',
    templateUrl: './profile.html'
})

export class ProfilePage implements OnInit {
    constructor(
        private projetservice:ProjetService,
        private userservice:UserService
    ){}
    test(){
        this.projetservice.getProjetsByPerimetre().then((data) => {
            console.log(data)
        },(err) =>{
            console.log("error trying to fetch projets" + err)
        })
    }
    model = this.userservice.user
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('page-extra-profile-ready'));
    }
}