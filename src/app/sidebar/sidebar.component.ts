import { Component, Input, AfterViewInit } from '@angular/core';
import { UserService } from '../services/user.service'
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html'
})

export class SidebarComponent implements AfterViewInit {
    @Input() page_sidebar_transparent : boolean;
    constructor(private userservice:UserService,private authenticationService: AuthenticationService,private router:Router){

    }
    user = this.userservice.user
    // fire event sidebar-ready
    ngAfterViewInit() {
        window.dispatchEvent(new CustomEvent('sidebar-ready'));
    }

    logout(){
        this.authenticationService.logout()
        this.router.navigate(['/user/login']);
    }
    // menu list
    menu = [{
        title: 'Dashboard',
        icon:'fa fa-home  ',
        link: '/dashboard/v1',
        roles: ['admin','superviseurP','superviseurR','agent','controleur']
    },{
        title: 'Gestion des Enquêtes',
        icon: 'fa fa-cogs',
        link: '/Parametrage/Parametrage',
        roles: ['admin','superviseurP','superviseurR','agent','controleur'],
    },{
        title: 'Utilisateurs',
        roles: ['admin'],
        icon: 'fa fa-users',
        link:'/utilisateur'
    },{
        title: 'Support Spatial',
        roles: ['admin'],
        icon: 'fa fa-upload',
        link:'/support'
    },{
        title: 'Reporting',
        roles: ['admin'],
        icon: 'fa fa-cogs',
        submenu: [{
            title: 'Extrapolation',
            link: 'reporting'
        }]
    },{
        title: 'Collectes',
        roles: ['admin','controleur','superviseurP','superviseurR','agent'],
        icon: 'fa fa-table',
        link:'/collectes'
    },
    
];
}