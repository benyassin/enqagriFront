import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service'
import { ProjetService} from '../../../services/projet.service';
import { UserService} from '../../../services/user.service';
import * as moment from "moment"
import 'moment/locale/fr';


@Component({
    selector: 'dashboard-v1',
    templateUrl: './dashboard-v1.html',
    styleUrls: ['./dashboard-v1.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardV1Page implements OnInit {
    constructor(
        private reportingservice:ReportingService,
        private projetservice:ProjetService,
        private userservice:UserService,
){}
    user = this.userservice.user || {'nom': 'undefined','prenom':'undefined'}
    total : any;
    daily : any;
    loading : boolean = true;
    data : any;
    projets;
    show : boolean = false;
    title : string;
      // Pie
      public doughnutChartLabels:string[] = ['Synchronisé','En Attente','Validé','En Traitement'];

      public doughnutChartData:number[] = [];
      public doughnutChartType:string = 'doughnut';
      public doughnutChartLegend:boolean = false;

    options = {
        scales: {
            yAxes: [{
                ticks: {
                    stepSize: 1
                }
            }]
        }
    };
    getProjets(){

        if(this.user.role == 'controleur'){
            this.doughnutChartLabels = ['Synchronisé','En Attente','Validé','Refusé']

            console.log('im a controller');
            this.projetservice.getProjetsByController().then((data : any) =>{
                this.projets = data;
                // this.region = data.perimetre.region;
                // this.province = data.perimetre.province;
                this.getData(this.projets[0]);
            },(err : any) => {
                console.log('error fetching collectes',err)
            })
        }else if(this.user.role == 'agent'){
            let projets = [];
            this.projetservice.getAgentsProjet().then((data: any) =>{
                data.forEach(element => {
                    projets.push(element.projet)
                });
                this.projets = projets;
                this.getData(projets[0]);

            },(err)=>{
                console.log(err)
            })
        }else{
            this.projetservice.getProjetsByPerimetre().then((data : any)=>{
                this.projets = data;
                this.getData(this.projets[0]);
            },(err)=>{
                console.log(err)
            })
        }

    }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
    // lineChart
    public lineChartData:Array<any> = [
        {data: [], label: 'Synchonisé'},
        {data: [], label: 'Validé'},
      ];
      public lineChartLegend:boolean = true;      
      public lineChartLabels:Array<any> = [];
      public lineChartType:string = 'line';
      public


    switch() {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    }

    public lineChartColors:Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];

    doughnutChartColors: any[] = [{ backgroundColor: ["#39a34b","#348fe2","#727cb6","#ff5b57"] }]
    getData(projet){
        // this.reportingservice.getDashboardData().then((data : any) => {
        //     this.total = data.total;
        //     this.daily = data.daily;
        //     this.doughnutChartData = [this.total.polygone, this.total.polyline, this.total.point]
        //     data.daily.forEach(element => {
        //         this.lineChartData[0].data.push(element.polygone);
        //         this.lineChartData[1].data.push(element.polyline);
        //         this.lineChartLabels.push(moment(new Date(element.createdAt)).format("dddd"))
        //     });
        //     console.log(this.lineChartData)
        // },(err)=> {
        //     console.log("error");
        //     console.log(err)
        // })
        if(projet == undefined){
            return
        }
        let perimetre : any = {};
        if(this.user.role == 'admin'){
            perimetre = this.user.perimetre
        }else{
            perimetre.region = this.user.perimetre.region.id_region;
            if(this.user.perimetre.province !== null) {
                perimetre.province = this.user.perimetre.province.id_province;
            }

        }
        if(projet.niveau == 0 )
        {
            projet.niveau = -1;
        }

        let index  = 0
        if(this.user.role == 'controleur'){
            index = projet.validation[perimetre.region].findIndex(x => x.agent==this.user._id);
        }


        this.reportingservice.getDashboard2(projet._id,index,'new',perimetre.region,perimetre.province,0,projet.niveau-1).then((data:any)=>{
            this.data = data;
            moment.locale('fr');


            // fix pour dss a changer urgent
            this.lineChartLabels =[];
            this.lineChartData[0].data = [0,0,0,0,0,0,0];
            this.lineChartData[1].data = [0,0,0,0,0,0,0];
            this.doughnutChartData = [data.total,data.wait,data.valid,data.entraitment];
            if(this.user.role == 'controleur'){
                this.doughnutChartData = [data.total,data.wait,data.valid,data.refus]
            }

            for(let i=0; i<=6; i++) {
                this.lineChartLabels.push(moment().subtract(i, 'days').format("dddd"));
            }
            this.lineChartLabels = this.lineChartLabels.reverse();

            data.totalPerDay.forEach(day =>{
               let index = this.lineChartLabels.indexOf(moment(day._id.date).format("dddd"));
                this.lineChartData[0].data[index] = day.count;
            });
            data.validePerDay.forEach(day =>{
                let index = this.lineChartLabels.indexOf(moment(day._id.date).format("dddd"));
                this.lineChartData[1].data[index] = day.count;
            });

            console.log(this.lineChartData);
            console.log(this.lineChartLabels);
            this.loading = false;
            this.title = projet.name
        })
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('dashboard-v1-ready'));
        this.user = this.userservice.user;
        this.getProjets()

        // this.lineChartLabels =[];
        //
        // this.lineChartData[0].data = [0,0,0,0,0,0,0];
        // this.lineChartData[1].data = [0,0,0,0,0,0,0];


        //
        // this.loading = false
    }
}