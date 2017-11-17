import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReportingService } from '../../../services/reporting.service'
@Component({
    selector: 'dashboard-v2',
    templateUrl: './dashboard-v2.html',
    styleUrls: ['./dashboard-v2.css'],
    encapsulation: ViewEncapsulation.None
})

export class DashboardV2Page implements OnInit {
    constructor(private reportingservice:ReportingService){}
total
daily
    getData(){
        this.reportingservice.getDashboardData().then((data : any) => {
            this.total = data.total
            this.daily = data.daily
            console.log()
        },(err)=> {
            console.log("error")
            console.log(err)
        })
    }
    ngOnInit() {
        this.getData()
    }
}