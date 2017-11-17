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
        icon:'fa fa-cogs',
        link: '/dashboard/v1',
        roles: ['admin','superviseurP','superviseurR']
    },{
        title: 'Gestion des Enquêtes',
        icon: 'fa fa-cogs',
        link: '/Parametrage/Parametrage',
        roles: ['admin','superviseurP','superviseurR'],
    },{
        title: 'Affectation',
        roles: ['superviseurP'],
        icon: 'fa fa-cogs',
        link:'/Parametrage/Affectation'
    },{
        title: 'Utilisateur',
        roles: ['admin'],
        icon: 'fa fa-cogs',
        link:'/utilisateur'
    },{
        title: 'Reporting',
        roles: [],
        icon: 'fa fa-cogs',
        submenu: [{
            title: 'Region',
            link: 'reporting/Region'
        },{
            title: 'Province',
            link: 'reporting'
        },{
            title: 'Agents',
            link: 'reporting/Agent'
        }]
    },{
        title: 'Collects',
        roles: ['admin'],
        icon: 'fa fa-cogs',
        link:'/collectes'
    },
    
];
}