import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service'
import * as moment from "moment"
@Component({
    selector: 'dashboard-v1',
    templateUrl: './dashboard-v1.html',
    styleUrls: ['./dashboard-v1.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardV1Page implements OnInit {
    constructor(private reportingservice:ReportingService){}
    total : any 
    daily : any 
    loading : boolean = true
      // Pie
      public doughnutChartLabels:string[] = ['Polygone', 'Polyline', 'Point'];
      public doughnutChartData:number[] = [];
      public doughnutChartType:string = 'doughnut';
      public doughnutChartLegend:boolean = false;      
      
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
  
    // lineChart
    public lineChartData:Array<any> = [
        {data: [], label: 'Polygone'},
        {data: [], label: 'Polyline'},
        {data: [], label: 'Point'}
      ];
      public lineChartLegend:boolean = true;      
      public lineChartLabels:Array<any> = [];
      public lineChartType:string = 'line';


            getData(){
                this.reportingservice.getDashboardData().then((data : any) => {
                    this.total = data.total
                    this.daily = data.daily
                    this.doughnutChartData = [this.total.polygone, this.total.polyline, this.total.point]
                    data.daily.forEach(element => {
                        this.lineChartData[0].data.push(element.polygone)
                        this.lineChartData[1].data.push(element.polyline)
                        this.lineChartData[2].data.push(element.point)
                        this.lineChartLabels.push(moment(new Date(element.createdAt)).format("DD-MM"))
                    });
                    console.log(this.lineChartData)
                    this.loading = false
                },(err)=> {
                    console.log("error")
                    console.log(err)
                })
            }
        ngOnInit() {
            window.dispatchEvent(new CustomEvent('dashboard-v1-ready'));
            this.getData()
        }
}