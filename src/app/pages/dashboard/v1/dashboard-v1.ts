import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service'
import { ProjetService} from '../../../services/projet.service';
import { UserService} from '../../../services/user.service';
import * as moment from "moment"
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
        private userservice:UserService
    ){}
    user = this.userservice.user || {'nom': 'undefined','prenom':'undefined'}
    total : any 
    daily : any 
    loading : boolean = true
    data : any
    projets
    show : boolean = false
      // Pie
      public doughnutChartLabels:string[] = ['Synchroniser','Valider', 'En Cours','En Attente'];
      public doughnutChartData:number[] = [];
      public doughnutChartType:string = 'doughnut';
      public doughnutChartLegend:boolean = false;      
      
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

    getProjets(){
        if(this.user.role == 'controleur'){
            console.log('im a controller')
            this.projetservice.getProjetsByController().then((data : any) =>{
                this.projets = data;
                // this.region = data.perimetre.region;
                // this.province = data.perimetre.province;
            },(err : any) => {
                console.log('error fetching collectes',err)
                this.getData(this.projets[0]._id);

            })
        }else if(this.user.role == 'agent'){
            let projets = []
            this.projetservice.getAgentsProjet().then((data: any) =>{
                data.forEach(element => {
                    projets.push(element.projet)
                });
                this.projets = projets
                this.getData(this.projets[0]._id);

            })
        }else{
            this.projetservice.getProjetsByPerimetre().then((data : any)=>{
                this.projets = data;
                this.getData(this.projets[0]._id);
            })
        }

    }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
    // lineChart
    public lineChartData:Array<any> = [
        {data: [], label: 'Synchoniser'},
        {data: [], label: 'Valider'},
      ];
      public lineChartLegend:boolean = true;      
      public lineChartLabels:Array<any> = [];
      public lineChartType:string = 'line';


    getData(projet){
        this.reportingservice.getDashboardData().then((data : any) => {
            this.total = data.total;
            this.daily = data.daily;
            this.doughnutChartData = [this.total.polygone, this.total.polyline, this.total.point]
            data.daily.forEach(element => {
                this.lineChartData[0].data.push(element.polygone);
                this.lineChartData[1].data.push(element.polyline);
                this.lineChartLabels.push(moment(new Date(element.createdAt)).format("dddd"))
            });
            console.log(this.lineChartData)
        },(err)=> {
            console.log("error");
            console.log(err)
        })
        this.reportingservice.getDashboard2(projet,0,'new',0,0,0,1).then((data:any)=>{
            this.data = data;
            let v = {data: [],label:[]}
            this.doughnutChartData = [data.total,data.valid,data.entraitment,data.wait]
            data.totalPerDay.forEach(day =>{
                this.lineChartData[0].data.push(day.count);
                this.lineChartLabels.push(moment(new Date(day._id.date)).format("dddd"));
            });
            console.log(this.lineChartData);
            console.log(this.lineChartLabels);
            this.loading = false
        })
    }
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('dashboard-v1-ready'));
        this.user = this.userservice.user;
        this.getProjets()

    }
}