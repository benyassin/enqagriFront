import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
    selector: 'header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
    @Input() page_with_two_sidebar : boolean;
    @Input() page_with_mega_menu : boolean;
    constructor(
        private authenticationService: AuthenticationService,
        private router:Router,
        private userservice: UserService
    ){
    }
    user = this.userservice.user || {'nom': 'undefined','prenom':'undefined'}
    logout(){
        this.authenticationService.logout()
        this.router.navigate(['/user/login']);
    }

    clearNotification(){
        this.userservice.clearNotification().then((data) =>{
            this.user.notification = []
        },(error) =>{
            console.log("can't clear notification for user")
        })
    }

    ngOnInit() {

    }
}