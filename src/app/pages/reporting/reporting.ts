import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { Http,Response} from "@angular/http";
import * as _ from "lodash";
import * as moment from "moment"
@Component({
    selector: 'Reporting',
    templateUrl: './reporting.html',
    styleUrls: ['./reporting.css']
    
})


export class ReportingPage implements OnInit {
    constructor(
        private router:Router,
        private http:Http
    ){}
    // data = require('./reporting.json');    
    collectes : any = []
    data : any 
    loading : boolean = true 
    settings = {
        columns: {
        },
        actions:{
            add   : false,
            edit  : false,
            delete: false
        }
      };
      getdata(){
          
      }
    ngOnInit(){
        this.http.get("./assets/reporting.json")
        .map((res:Response) => res.json())
        .subscribe((data) => {
            console.log("what is in the data ", data);
            this.data = data            
            this.loading = false
                let i = 0
                for(var key in data[0]){
                    console.log(key,data[0][key])
                        if(i > 1){
                            this.settings.columns[key] = {"title":key,"filter": false,}                                              
                        }else{
                            this.settings.columns[key] = {"title":key}  
                        }
                        i++
                }
            
        })
    }
 }
