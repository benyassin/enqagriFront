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
        title: 'Tableau de bord',
        icon:'fa fa-home  ',
        link: '/dashboard/v1',
        roles: ['admin','superviseurP','superviseurR','agent','controleur']
    },{
        title: 'Gestion des Enquêtes',
        icon: 'fa fa-cogs',
        link: '',
        roles: ['admin','superviseurP','superviseurR','agent','controleur'],
        submenu: [{
            title: 'Enquête en cours',
            link: '/Parametrage/Parametrage'
        },{
            title: 'Enquête Archivé',
            link: '/Parametrage/Archived'
        }]
    },{
        title: 'Utilisateurs',
        roles: ['admin'],
        icon: 'fa fa-users',
        link:'/utilisateur'
    },{
        title: 'Données Support',
        roles: ['admin'],
        icon: 'fa fa-upload',
        link:'/support'
    },{
        title: 'Reporting',
        roles: ['admin','superviseurR','superviseurP'],
        icon: 'fa fa-cogs',
        link:'',
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