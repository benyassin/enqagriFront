import { Component, OnInit, Input } from '@angular/core';
import { CollecteService}           from '../../services/collecte.service'
import { ProjetService } from '../../services/projet.service'
import { UserService } from '../../services/user.service'
import { PerimetreService} from '../../services/perimetre.service';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
import * as moment from "moment"
import { locale } from 'moment';
import { LocalDataSource } from 'ng2-smart-table';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {forEach} from '@angular/router/src/utils/collection';



@Component({
    selector: 'Collecte',
    templateUrl: './collecte.html',
    styleUrls: ['./collecte.css']
})


export class CollectePage implements OnInit {
    public status: null;
    constructor(
        private perimetreservice:PerimetreService,
        private collecteservice:CollecteService,
        private projetservice:ProjetService,
        private userservice:UserService,
        private router:Router
    ){
    }
    msgs : any = [];
    dataload : boolean = true;
    projet : any;
    collectes : any = [];
    projets : any;
    region : any;
    province : any;
    user;
    _region;
    _province;
    _commune;
    hide : boolean = true;
    index;
    extrapolation;
    anass;
    _filtre;
    _value;
    source : LocalDataSource;
    csv;
    communelist;
    compareById(obj1, obj2) {
        if(localStorage.getItem('storage') !== null ){
        return obj1._id === obj2._id;
        }
    }
    settings = {
        columns: {
        },
        actions:{
            add   : false,
            edit  : false,
            delete: false,
            custom: [{ name: 'consulter', title: `<a type="button" title="Plus de details" class="btn btn-primary btn-xs"><i class="fa fa-eye"></i> Consulter</a>` }],
            position: 'right'
        },
        pager:{
            perPage:25
        },
        noDataMessage:' '
    };
    exportData(){
        let options = {
            fieldSeparator: ',',
            quoteStrings: '',
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            useBom: false,
            headers: Object.keys(this.csv[0])
          };
        console.log(this.csv);
        new Angular2Csv(this.csv,'Test',options)
    }

    OnProvinceSelect(id){
        console.log(id)
        this.perimetreservice.getCommune(id).then((data)=>{
            this.communelist = data
        },(err)=>{
            console.log('err fetching communes');
            console.log(err)
        })
    }
    filtreData(filtre,data: any){
        let result = [];
        let extra = [];
        let calc = [];
        this.settings.columns =  {
            projet:{
                title:'Enquete',
            },
            type:{
                title:'Type',
            },
            agent:{
                title:'Agent'
            },
        },
        this.extrapolation.forEach(api => {

            if(api.type == 'extra'){
            this.settings.columns[api.field.key] = {'title':api.label};
            extra.push(api.field.key)
            }
            if(api.type == 'cal'){
                this.settings.columns[api.label] = {'title':api.label};
                calc.push(api)
            }

        });

        this.settings.columns['date'] = {'title': 'Date Synchornisation'};
        data.forEach(element => {
            element.collecte.forEach(formulaire => {
                formulaire.data.forEach(fdata => {
                    if((this._filtre != null && fdata.formdata.data[this._filtre.field.key] == this._value) || this._filtre == null){
                        let row = {
                            'projet':this.anass.name,
                            'type':this.anass.theme,
                            'agent':element.agent.nom +' '+ element.agent.prenom,
                            'date':moment(new Date(element.createdAt)).format("DD-MM-YYYY à h:mm"),
                            'id':element._id
                        };
                        calc.forEach(c => {
                            row[c.label] = this.calculate(fdata.formdata.data,c.formule)
                        });
                        extra.forEach(f => {
                            if(fdata.formdata.data[f]) {
                                row[f] = fdata.formdata.data[f]
                            }else {
                                row[f] = 0
                            }

                        });
                        result.push(row)
                    }
                })
            })
        });
        this.csv = result;

        this.source = new LocalDataSource(result);
        this.extrapolate(result,extra);
        this.msgs = [];
        if(result.length > 0){
            this.msgs.push({severity:'success', summary:'', detail:'Nombre de collectes correspondant à vos critères de recherche : '+ result.length });
            this.dataload = false
        }else{
            this.msgs.push({severity:'warn', summary:'', detail:'Aucune collecte ne correspond à vos critères de recherche' })
            this.dataload = true
        }
    }
    ExtrapolatedData;
    extrapolate(data,keys){
        if(data.length == 0){
            this.ExtrapolatedData = [];
            return
        }
        let results = [];
        keys.forEach(key => {

        let sum = 0;
        let count = 0
        for(let i = 0; i < data.length; i++) {
            if(data[i][key] != 0) {
                sum += (data[i][key]);
                count++
            }
        }
        let avg : number  = sum/count;
        let varr : number  = 0;

        for(let i = 0; i < count; i++) {
            if(data[i][key] != 0 ){
                varr += Math.pow(((data[i][key]) - avg),2);
            }
        }

        varr /= count

        let ec = Math.sqrt(varr);

        results.push({'key': key, 'somme':sum,'moyenne':avg,'variance':varr,'ecarttype':ec})
        });
        this.ExtrapolatedData = results;
        console.log(results)
    }

    Downloaded : any = {
        id:0,
        status:'random',
        region:0,
        province:0
    }
    search(projet,status,region,province,commune,filtre,valeur){
        this.dataload = true
    this.hide = false
    this.anass = {theme:projet.theme,name:projet.name}
    if(projet == null || status == null ){
        return
    }
    this.extrapolation = projet.extrapolation
    if(this.projet !== null){
        localStorage.setItem('storage',JSON.stringify({'projet':this.projet,'status':status,'region':region,'province':province}));
    }
    // if(this.Downloaded.id == projet._id
    //     && this.Downloaded.status == status
    //     && this.Downloaded.region == region
    //     && this.Downloaded.province == province ){
    //     console.log('data already loaded using it')
    //     this.filtreData('test',this.collectes)
    //     return
    // }
    // this.Downloaded.id = projet._id
    // this.Downloaded.status = status
    // this.Downloaded.region = region
    // this.Downloaded.province = province
    // console.log(this.Downloaded)
    if(this.user.role == 'controleur'){

        this.index = this.projet.validation.findIndex(x => x.agent==this.user._id);

        this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,commune).then((data) => {
            this.filtreData('test',data)
            this.collectes = data;
        },(err)=> {
            console.log('error trying to fetch collectes');
            console.log(err)
        })

    }else{
        this.hide = false
        if(this.user.role == 'superviseurP'){
            region = this.user.perimetre.region.id_region;
            province = this.user.perimetre.province.id_province
        }
        console.log(status)
        this.index = this.projet.validation.length - 1;
        switch(status){
            case 'valid' :
            this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,commune).then((data) => {
                this.collectes = data
                this.filtreData('test',data)
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })
            break

            case 'new':
            this.collecteservice.getCollectesByProjet(projet._id,0,status,region,province,commune).then((data) => {
                this.collectes = data
                this.filtreData('test',data)
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })
            break

            case 'reject':
            this.collecteservice.getCollecteEnTraitement(projet._id,this.index,region,province,commune).then((data) => {
                this.collectes = data
                this.filtreData('test',data)
            },(err)=> {
                console.log('error trying to fetch collectes')
                console.log(err)
            })
            break

        }
    }

    }

    OnProjetSelect(projet){
        this.projet = projet;
        console.log(projet)
    }
    action(id,action){
        let update : any = {};
        update.niveau  = this.index;
        update.action = action;
        update.id = id;

        console.log(update);
        this.collecteservice.action(update).then((data) => {
            console.log(data)
        })
    }

    reset(){
        this.projet = null;
        this.status = null;
        if(this.user.role != 'superviseurR' && this.user.role != 'superviseurP'){
            this._region = null
        }
        if(this.user.role != 'superviseurP'){
            this._province = null
        }
        this.collectes = []
        this.hide = true
        localStorage.removeItem('storage')
        this.Downloaded = {
            id:0,
            status:'random',
            region:0,
            province:0
        }
        this.ExtrapolatedData = []
        this.dataload = true
        this._value = null
      }

    getProjets(){
        if(this.user.role == 'controleur'){
            console.log('im a controller')
        this.projetservice.getProjetsByController().then((data : any) =>{
            this.projets = data;
            // this.region = data.perimetre.region;
            // this.province = data.perimetre.province;
            this.checkStorage();
        },(err : any) => {
            console.log('error fetching collectes',err)
        })
    }else if(this.user.role == 'agent'){
        let projets = []
        this.projetservice.getAgentsProjet().then((data: any) =>{
            data.forEach(element => {
                projets.push(element.projet)
            });
            this.projets = projets
            this.checkStorage();
        })
    }else{
        this.projetservice.getProjetsByPerimetre().then((data : any)=>{
            this.projets = data;
            this.checkStorage()
        })
    }
    }

    checkStorage(){
        console.log('im here');
        if(localStorage.getItem('storage') != null){
            let data = JSON.parse(localStorage.getItem('storage'));
            this.projet = data.projet;
            this.status = data.status;
            this._province = data.province;
            this._region = data.region;
            this.OnProvinceSelect(data.province);
            this.search(this.projet,this.status,this._region,this._province,this._commune,'test','test');
            console.log('here')
        }
    }
    consulter(collecte,projet){
        this.collecteservice.getCollecte(collecte).then((data : any) => {
            this.collecteservice.collecte = data
            console.log(data)
            // this.collecteservice.collecte.projet = projet;
            // this.collecteservice.collecte.agent = collecte.agent;
            if(this.collecteservice.collecte.geo == false ){
              return this.router.navigate(['collectes/geoless'])
            }
            if(data.projet.theme == 'rna'){
                this.router.navigate(['collectes/rnacollecte'])
            }else{
                this.router.navigate(['collectes/collecte'])
            }
        },(err) =>{
            console.log('error trying to fetch collecte id : ' + collecte)
            console.log(err)
        })
    }
    calculate(data,formule){
        let result;
        if(data[formule.variables[0]] && data[formule.variables[1]]){
            switch (formule.operateur) {
                case '+':
                    result = data[formule.variables[0]] + data[formule.variables[1]]
                    break;
                case '-':
                    result = data[formule.variables[0]] - data[formule.variables[1]]
                    break;
                case '*':
                    result = data[formule.variables[0]] * data[formule.variables[1]]
                break;
                case '/':
                    result = data[formule.variables[0]] / data[formule.variables[1]]
                break;
                default:
                    break;
            }
            return result
        }else {
            return 0
        }
    }
    _status:Array<Object>
    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user'))
        if(this.user.role == 'controleur'){
            this._status = [
                {name:"Validé", value:'valid'},
                {name:"En attente de validation",value:'new'},
                {name:"Refusé",value:'reject'}
            ];
        }else{
            this._status = [
                {name:"Validé", value:'valid'},
                {name:"En attente de validation",value:'new'},
                {name:"En cours de validation",value:'reject'}
            ]

            if(this.user.role == 'superviseurR'){
                this._region = this.user.perimetre.region.id_region
            }
            if(this.user.role == 'superviseurP' || this.user.role == 'agent'){
                this._province = this.user.perimetre.province.id_province
                this._region = this.user.perimetre.region.id_region
            }


        }
        this.getProjets()
    }
 }
