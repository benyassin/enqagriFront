import { Component, OnInit, Input,ViewChild } from '@angular/core';
import { CollecteService}           from '../../services/collecte.service'
import { ProjetService } from '../../services/projet.service'
import { UserService } from '../../services/user.service'
import { PerimetreService} from '../../services/perimetre.service';
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from 'lodash';
import * as moment from 'moment'
import { locale } from 'moment';
import {LocalDataSource, ServerDataSource} from 'ng2-smart-table';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import {forEach} from '@angular/router/src/utils/collection';
import { saveAs } from 'file-saver';
import { HttpClient } from '../../services/Http-client'
import {
    Http, RequestOptions, XHRBackend, RequestMethod, Request, RequestOptionsArgs, BrowserXhr, ResponseOptions, CookieXSRFStrategy,
    Headers
} from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';

import { HttpHeaders } from '@angular/common/http'

declare const L:any;
import 'leaflet'
import 'leaflet-sidebar-v2'
import 'leaflet-fullscreen';
import * as url from 'url';
import {IMyDrpOptions} from 'mydaterangepicker';
import {DaterangepickerConfig, DaterangePickerComponent} from 'ng2-daterangepicker';


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
        private router:Router,
        private http: Http,
        private daterangepickerOptions: DaterangepickerConfig,
    ){
        this.daterangepickerOptions.settings = {
            locale: {format: 'YYYY-MM-DD'},
        }
    }
    @ViewChild(DaterangePickerComponent)
    private picker: DaterangePickerComponent;
    msgs : any = [];
    map
    dataload : boolean = true;
    testload : boolean = true;
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
    _agent;
    source : LocalDataSource;
    sources : ServerDataSource;
    csv;
    communelist;
    mapSettings;

    public selectedDate(value: any,range) {
        moment(new Date(value.start)).format('DD-MM-YYYY');
        console.log(moment(new Date(value.start)).format('DD-MM-YYYY'));
    }



    compareById(obj1, obj2) {
        if(localStorage.getItem('storage') !== null && obj1 !== null && obj2 !== null){
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
            position: 'left'
        },
        pager:{
            perPage:25
        },
        noDataMessage:' '
    };
    settingss = {
        columns: {
            id_collecte:{
                title:'ID',
                valuePrepareFunction: (cell,row) => {
                    return row.id_collecte+'-'+row.numero
                }
            },
            agent:{
                title:'Agent',
                valuePrepareFunction: (agent) => {
                    return agent.nom +' '+agent.prenom;
                },
                filter: false,
                sort:false
            },
            commune:{
                title:'Commune',
                valuePrepareFunction: (cell,row) => {
                    return row._commune.name
                },
                filter: false,
                sort: false
            },
            createdAt: {
                title: 'Date Synchronisation',
                valuePrepareFunction: (createdAt) => {
                    return moment(new Date(createdAt)).format('DD-MM-YYYY à HH:mm');
                },
                filter: false

            }
        },
        actions:{
            add   : false,
            edit  : false,
            delete: false,
            custom: [{ name: 'consulter', title: `<a type="button" title="Plus de details" class="btn btn-primary btn-xs"><i class="fa fa-eye"></i> Consulter</a>` }],
            position: 'left'
        },
        pager:{
            perPage:20
        },
        noDataMessage:' '
    };

    exportData(){
        let options = {
            fieldSeparator: ';',
            quoteStrings: '',
            decimalseparator: '.',
            showLabels: true,
            showTitle: false,
            useBom: true,
            headers: Object.keys(this.csv[0])
          };
        console.log(this.csv);
        new Angular2Csv(this.csv,'Test',options)
    }
    exportGeoData(){
        saveAs(new Blob(['hello world'], { type: 'text' }), 'data.txt');
    }
    agents_list = [];
    getAgents(){
        this.userservice.getAgentsByPerimetre().then((data : any) =>{
            this.agents_list = data
        },(err) =>{
            console.log(err)
        })
    }

    OnProjetSelect(){
        if(this._province){
            this.OnProvinceSelect(this._province);
        }
        let date = moment(new Date(this.projet.createdAt)).format('YYYY-MM-DD')
        this.picker.datePicker.setStartDate(date);
        this.status = null;
        if(this.user.role == 'superviseurR'){
            this._province = 0;
            this._commune = 0
        }
        if(this.user.role == 'superviseurP'){
            this._commune = 0
        }
        if(this.user.role == 'admin'){
            this._region = 0;
            this._province = 0;
            this._commune = 0
        }
        this.getAgents()

    }
    OnRegionSelect(){
        this._province = 0;
        this._commune = 0
    }
    lastProvince
    OnProvinceSelect(id){
        if(this.lastProvince && this.lastProvince != id ){
            this._commune = 0
        }
        this.perimetreservice.getCommune(id).then((data)=>{
            this.communelist = [];
            this.communelist = data;
            this.lastProvince = id

        },(err)=>{
            console.log('err fetching communes');
            console.log(err)
        })
    }
    _formulaire;

    filtreData(filtre,data: any){
        let result = [];
        this.settings.columns =  {
            collecte:{
                title:'id collecte',
            },
            agent:{
                title:'Agent'
            },
            commune:{
                title:'Commune'
            }
        };

        this.settings.columns['date'] = {'title': 'Date Synchornisation'};
        data.forEach(element => {
                        let row = {
                            'collecte': element.id_collecte+'-'+element.numero,
                            'agent': element.agent.nom + ' ' + element.agent.prenom,
                            'commune':element._commune.name,
                            'date': moment(new Date(element.createdAt)).format('YYYY-MM-DD à HH:mm'),
                            'id': element._id
                        };
                        // if(this.communelist.length > 0){
                        //     row['commune'] = this.communelist.find(x => x.id_commune == element.commune).name;
                        // }
                        result.push(row)

        });
        this.csv = result;

        this.source = new LocalDataSource(result);
        this.msgs = [];
        if(result.length > 0){
            this.msgs.push({severity:'success', summary:'', detail:'Nombre de collectes correspondant à vos critères de recherche : '+ result.length });
            this.dataload = false
        }else{
            this.msgs.push({severity:'warn', summary:'', detail:'Aucune collecte ne correspond à vos critères de recherche' });
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
        if(key.type !== 'filtre'){
            let k;
            if(key.type == 'cal'){
                k = key.label
            }else{
                k = key.field.key
            }
        let sum = 0;
        let count = 0;
        console.log(key);
        for(let i = 0; i < data.length; i++) {
            if(data[i][k] != '-') {
                sum += (data[i][k]);
                count++
            }
        }
        let avg : number  = sum/count;
        let varr : number  = 0;

        for(let i = 0; i < count; i++) {
            if(data[i][k] != '-' ){
                varr += Math.pow(((data[i][k]) - avg),2);
            }
        }

        varr /= count

        let ec = Math.sqrt(varr);

        results.push({'key': key.label,'id_field':key.form, 'somme':sum,'moyenne':avg,'variance':varr,'ecarttype':ec})
        }
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
    showmap = false
    newSearch(projet,status,args){
        this.showmap = true;
        this.dataload = true;
        let niveau = 0;
        this.extrapolation = projet.extrapolation;

        let token = localStorage.getItem('token');
        let opt :RequestOptionsArgs = {}
        opt.headers = new Headers()
        opt.headers.append('Content-Type', 'application/json');
        opt.headers.append('Accept', 'application/json');
        opt.headers.append('Authorization', token);
        const options = new RequestOptions(opt);

        const connection = new XHRBackend(new BrowserXhr(), new ResponseOptions(), new CookieXSRFStrategy());
        this.http = new Http(connection, options);

        if(this.user.role == 'controleur'){
            this.index = this.projet.validation[args.region].findIndex(x => x.agent==this.user._id);
            niveau = this.index
        }else if(this.user.role == 'superviseurP'){
            args.region = this.user.perimetre.region.id_region;
            args.province = this.user.perimetre.province.id_province;
            // if(status == 'valid' || status == 'reject'){
            //     niveau = this.index
            // }
        }else{
            this.index = this.projet.niveau -1;
            niveau = this.index;
            console.log(this.user.role);
            console.log(this.index)
        }
        for (let key in args) {
            if (args[key] == 0 || args[key] == null || args[key] == '') delete args[key];
        }
        args.niveau = niveau;
        args.status = status;

        let path = 'http://localhost/api/collectes/serverside/test/'+ projet._id;
        const requestURL =  url.format({
            pathname: path,
            query: args
        });

        this.sources = new ServerDataSource(this.http,{endPoint:requestURL,dataKey:'docs',totalKey:'total'});
        this.testload = false;
        this.dataload = false;
        if(args.commune){
            this.collecteservice.getMapCollectes(args,projet._id).then((data : any) => {
                this.collectes = data.docs;
                this.loadMapData();
                this.showmap = false;
            },(err) =>{
                console.log(err)
            })
        }
        if(this.projet !== null){
            localStorage.setItem('storage',JSON.stringify({'projet':this.projet,'status':status,'region':args.region,'province':args.province,'commune':args.commune}));
        }
    }

    search(projet,status,region,province,commune,filtre,valeur){
        this.dataload = true;
        this.showmap = true;
        this.sources = new ServerDataSource(this.http,{endPoint:'http://localhost/api/collectes/serverside/test/5acb518459a439348c61d097?region='+region,dataKey:'docs',totalKey:'total'});
        this.testload = false;

    this.hide = false;
    this.anass = {theme:projet.theme,name:projet.name};
    if(projet == null || status == null ){
        return
    }
    this.extrapolation = projet.extrapolation;
    if(this.projet !== null){
        localStorage.setItem('storage',JSON.stringify({'projet':this.projet,'status':status,'region':region,'province':province,'commune':commune}));
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

        this.index = this.projet.validation[region].findIndex(x => x.agent==this.user._id);

        this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,commune).then((data : any ) => {
            this.filtreData(data.order,data.collectes);
            this.collectes = data.collectes;
            if(typeof commune !== 'undefined' && commune !== null && commune != 0){
                this.loadMapData();
                this.showmap = false
            }
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
        this.index = this.projet.niveau -1;
        switch(status){
            case 'valid' :
            this.collecteservice.getCollectesByProjet(projet._id,this.index,status,region,province,commune).then((data : any) => {
                this.collectes = data.collectes;
                this.filtreData(data.order,data.collectes)
                if(typeof commune !== 'undefined' && commune !== null && commune != 0){
                    console.log('debug');
                    console.log(province);
                    this.loadMapData()
                    this.showmap = false

                }
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })

            break

            case 'new':
            this.collecteservice.getCollectesByProjet(projet._id,0,status,region,province,commune).then((data : any) => {
                this.collectes = data.collectes;
                this.filtreData(data.order,data.collectes)
                if(typeof commune !== 'undefined' && commune !== null && commune != 0){
                    this.loadMapData()
                    this.showmap = false

                }
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            });
            break;

            case 'all':
                this.collecteservice.getCollectesByProjet(projet._id,0,'all',region,province,commune).then((data : any) => {
                    this.collectes = data.collectes;
                    this.filtreData(data.order,data.collectes);
                    if(typeof commune !== 'undefined' && commune !== null && commune != 0){
                        console.log('debug');
                        console.log(commune);
                        this.loadMapData()
                        this.showmap = false

                    }
                },(err)=> {
                    console.log('error trying to fetch collectes');
                    console.log(err)
                });
            break;

            case 'reject':
            this.collecteservice.getCollecteEnTraitement(projet._id,this.index,region,province,commune).then((data : any) => {
                this.collectes = data.collectes;
                this.filtreData(data.order,data.collectes)
                if(typeof commune !== 'undefined' && commune !== null && commune != 0){
                    this.loadMapData()
                    this.showmap = false

                }
            },(err)=> {
                console.log('error trying to fetch collectes');
                console.log(err)
            })
            break


        }
    }



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
        if(this.user.role == 'admin'){
            this._region = null
        }
        if(this.user.role != 'superviseurP' && this.user.role != 'agent'){
            this._province = null
        }
        if(this.user.role != 'agent'){
            this._agent = null
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
        this._formulaire = null
        this._commune = null
        let today = moment(new Date()).format('YYYY-MM-DD');
        this.picker.datePicker.setStartDate(today);
        this.picker.datePicker.setEndDate(today);

      }

    getProjets(){
        console.log('working')
        if(this.user.role == 'controleur'){
            console.log('im a controller');
        this.projetservice.getProjetsByController().then((data : any) =>{
            this.projets = data;
            console.log('my data')
            console.log(data)
            // this.region = data.perimetre.region;
            // this.province = data.perimetre.province;
            this.checkStorage();
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
            this._commune = data.commune;
            if(data.province){
                this.OnProvinceSelect(data.province);
            }
            this.user.role == 'agent'?this._agent = this.user._id:0;

            this.newSearch(this.projet,this.status,
                {region:this._region,
                    province:this._province,
                    commune:this._commune,
                    agent:this._agent
                });
            let date = moment(new Date(this.projet.createdAt)).format('YYYY-MM-DD');
            this.picker.datePicker.setStartDate(date);
        }
    }
    sidebar
    controllayer
    createMap(){
        this.map = new L.Map('map').setView([0,0],3);
        L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
        }).addTo(this.map);

        this.sidebar = L.control.sidebar({
            autopan: true,       // whether to maintain the centered map point when opening the sidebar
            closeButton: true,    // whether t add a close button to the panes
            container: 'sidebarr', // the DOM container or #ID of a predefined sidebar container that should be used
            position: 'right',     // left or right
        }).addTo(this.map);
        let fullscreen = new L.Control.Fullscreen().addTo(this.map);


        let map = this.map;
        let markers = this.markers;

        let control =  L.control.layers({},{
            'Supports':this.support,
            'Numero Support':this.supportMarkers,
            'Numero Collecte':this.markers,
            'Commune':this.communeMap
        },{position: 'topleft',autoZIndex:false});


        control.addTo(this.map);

        map.on('zoomend', function() {
            if (map.getZoom() <17) {
                if (map.hasLayer(markers)) {
                    map.removeLayer(markers);
                }
            }
            if (map.getZoom() >= 17) {
                if (map.hasLayer(markers)){
                } else {
                    map.addLayer(markers);
                }
            }
        })
        let parcelles = this.Parcelles;
        parcelles.bringToFront();
        map.on('overlayadd',function(e){
            if(e.name == 'Supports' || e.name == 'Commune'){
                e.layer.bringToBack();
                parcelles.bringToFront()
            }
        })
    }

    Parcelles = new L.FeatureGroup();
    markers = new L.FeatureGroup();

    LeafIcon = L.Icon.extend({
        options: {
            iconSize: [25, 42],
            iconAnchor: [0, 0],
            popupAnchor: [2, 0]
        }
    });
    IconGreen = new this.LeafIcon({
        iconUrl: 'assets/marker-icon-green.png'
    });

    IconBlue = new this.LeafIcon({
        iconUrl: 'assets/marker-icon.png'
    });
    IconRed = new this.LeafIcon({
        iconUrl: 'assets/marker-icon-red.png'
    });
    loadMapData(){
        this.Parcelles.clearLayers();
        this.markers.clearLayers();
        this.support.clearLayers();
        this.communeMap.clearLayers();
        this.supportMarkers.clearLayers();
        if(this.collectes.length == 0){
            return
        }
        let features =  [];
        for(let i = 0;i < this.collectes.length;i++){
            for(let x = 0;x < this.collectes[i].collecte.length;x++){
                for(let y = 0;y < this.collectes[i].collecte[x].data.length;y++){
                    let element = this.collectes[i].collecte[x].data[y];
                    if(element.gjson.hasOwnProperty('geometry')){
                        element.gjson =element.gjson.geometry
                    }
                    features.push({
                        'type': 'Feature',
                        'properties':{
                            'numero':this.collectes[i].collecte[x].data[y].numero,
                            'id_collecte':this.collectes[i].id_collecte,
                            '_id':this.collectes[i]._id},geometry:element.gjson})
                    }
                    // geojson[this.collectes[i].id_collecte] = new L.GeoJSON({
                    //         "type": "Feature",
                    //         "properties":{
                    //             "numero":this.collectes[i].collecte[x].data[y].numero,
                    //             "id_collecte":this.collectes[i].id_collecte,
                    //             "_id":this.collectes[i]._id},
                    //         "geometry":element.gjson
                    //         },{onEachFeature:onEachFeature}).addTo(this.map)
                    //     }
            }
        }
        // let myIcon = L.icon({
        //     iconUrl: 'assets/marker-icon.png',
        //     iconSize: [32, 37],
        //     iconAnchor: [16, 37],
        //     popupAnchor: [0, -28]
        // });


        let that = this;

        this.Parcelles = new L.GeoJSON(features,{
            onEachFeature:onEachFeature,
            style:{color:this.mapSettings.colorCollectes,fillcolor:this.mapSettings.colorCollectes},
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: that.IconBlue});
            },
        });
        let lastClickedLayer;
        function onEachFeature(feature,layer) {
            layer.on({
                click: function (e) {
                    that.Parcelles.eachLayer((l) =>{
                        let lid_collecte = e.target.feature.properties.id_collecte;
                        let eid_collecte = l.feature.properties.id_collecte;
                        // if(l instanceof L.Marker){
                        //     l.setIcon(this.IconGreen);
                        //     console.log('is marker')
                        // }
                        if(lid_collecte === eid_collecte){
                            if(l instanceof L.Marker){
                                l.setIcon(that.IconGreen);
                            }else{
                                l.setStyle({color:that.mapSettings.colorCollecte,fillColor:that.mapSettings.colorCollecte});
                            }
                        }else{
                            if(l instanceof L.Marker){
                                l.setIcon(that.IconBlue);
                            }else{
                                l.setStyle({color:that.mapSettings.colorCollectes,fillColor:that.mapSettings.colorCollectes})
                            }
                        }
                    });

                    // if (lastClickedLayer) {
                    //     // geojson[lastClickedLayer.feature.properties.id_collecte].resetStyle(lastClickedLayer)
                    //     // geojson[lastClickedLayer.feature.properties.id_collecte].setStyle({color:'yellow',fillcolor:'yellow'})
                    //     that.Parcelles.resetStyle(lastClickedLayer)
                    // }
                    let layer = e.target;
                    if(layer instanceof L.Marker){
                        layer.setIcon(that.IconRed);
                    }else{
                        layer.setStyle({fillColor: that.mapSettings.colorSelection, color: that.mapSettings.colorSelection});
                    }
                    // geojson[layer.feature.properties.id_collecte].setStyle({color:'green',fillcolor:'green'});
                    lastClickedLayer = layer;
                    that.getData(feature.properties._id, feature.properties.numero);

                },

            });

        }


        this.setMarkers();
        this.Parcelles.setZIndex(10)
        this.Parcelles.addTo(this.map);
        this.map.fitBounds(this.Parcelles.getBounds());
        this.getSegments()


    }
    sideBarData;
    instance;
    lastCollecte;
    getData(e,i){
        if(this.lastCollecte && this.lastCollecte._id == e && this.instance != i){
            this.sideBarData.collecte = this.keytovalues({...this.lastCollecte.collecte[0].data[i-1]});

                this.sideBarData.collecte.date_creation = moment(new Date(this.sideBarData.collecte.date_creation)).format('DD-MM-YYYY à HH:mm');

            this.instance = i;
        } else{
        this.collecteservice.getCollecte(e,false).then((data : any) =>{

            this.sideBarData = {'id':data.collecte.id_collecte,
                'collecte':this.keytovalues({...data.collecte.collecte[0].data[i-1]}),
                'agent':data.collecte.agent,
                'createdAt':moment(new Date(data.collecte.createdAt)).format('DD-MM-YYYY à HH:mm'),
                '_id':data.collecte._id
            };
            if(data.collecte.exploitation !== undefined && data.collecte.exploitation.formdata !== undefined){
                this.sideBarData['identification'] = this.keytovalues(data.collecte.exploitation)
            }

            this.sideBarData.collecte.date_creation = moment(new Date(this.sideBarData.collecte.date_creation)).format('DD-MM-YYYY à HH:mm');
            this.sidebar.open('home');
            this.instance = i;
            this.lastCollecte = data.collecte;
            // let test = this.keytovalues(data.collecte.collecte[0].data[0])



        },(err)=>{
            console.log(err)
        })
        }
    }

    keytovalues(p){
        let that = this
        Object.keys(p.formdata.data).forEach(key => {
            if(typeof p.formdata.data[key] === 'object' && p.formdata.data[key] !== null){
                p.formdata.data[key] = truekeys(p.formdata.data,key)
            }else{
                let c = that.extrapolation.find(x => x.field.key === key);
                if(c && c.type == 'filtre') {
                    if(c.field.type == 'select'){
                        let value = c.field.values.json.find(x => x.value == p.formdata.data[key]);
                        if(value){
                            p.formdata.data[key] = value.label
                        }
                    }else{
                        let value = c.field.values.find(x => x.value == p.formdata.data[key]);
                        if(value){
                            p.formdata.data[key] = value.label
                        }
                    }


                }

            }

        });
        return p;
        function truekeys(data,key){
            let t = [];
            let c =  that.extrapolation.find(x => x.field.key === key);
            Object.keys(data[key]).forEach(k =>{
                if(data[key][k] === true){
                    if(c){
                        let value = c.field.values.find(x => x.value === k);
                        t.push(value.label)

                    }
                }
            });
            return t
        }
    }

    setMarkers(){
        this.markers.clearLayers();
        let markers = this.markers;

        this.Parcelles.eachLayer((layer) => {
            let center ;
            let properties = layer.feature.properties;
            if(layer instanceof L.Marker){
                center = layer.getLatLng()
            }else{
                center  = layer.getBounds().getCenter()
            }
            let myIcon = L.divIcon({
                html: '<span style=\'color:'+this.mapSettings.colorTextCollecte+';font-weight: bold;\'>'+properties.id_collecte+'('+properties.numero+')'+'</span>',
                className: 'labelClass',
            });


            let marker = new L.marker([center.lat,center.lng],{icon:myIcon});
            markers.addLayer(marker,{interactive: false});
        });
        // markers.addTo(this.map)
        // that.markers.addLayer(marker)
    }
    support = new L.GeoJSON();
    supportMarkers = new L.FeatureGroup();
    communeMap = new L.GeoJSON();
    getSegments(){
        let cid = this.projet.cid || this.projet.cid._id;
        this.collecteservice.getSupportByCommune(this._commune,cid).then((data: any) =>{
            this.support.addData(data.support);
            this.communeMap.addData({'type':'Feature','properties':{},'geometry':data.commune});
            this.support.setStyle({'color':this.mapSettings.colorSegments,'weight':4,'fillOpacity':0});
            this.communeMap.setStyle({'color':this.mapSettings.colorCommune,'fillOpacity':0});
            let markers = this.supportMarkers;
            this.support.eachLayer((layer) =>{
                let center ;
                let properties = layer.feature.properties;
                if(layer instanceof L.Marker){
                    center = layer.getLatLng()
                }else{
                    center  = layer.getBounds().getCenter()
                }
                let myIcon = L.divIcon({
                    html: '<span style=\'color:'+this.mapSettings.colorTextSegments+';font-weight: bold;font-size: 20px;\'>'+properties.id_echantillon+'</span>',
                    className: 'labelClass',
                });

                let marker = new L.marker([center.lat,center.lng],{icon:myIcon});
                markers.addLayer(marker,{interactive: false})

            });
            this.support.addTo(this.map);
            this.communeMap.addTo(this.map);
            // this.supportMarkers.addTo(this.map);

            if(this.map.hasLayer(this.communeMap)){
                this.communeMap.bringToBack()
            }
            if(this.map.hasLayer(this.support)){
                this.support.bringToBack()
            }

            // this.support.bringToBack();
            // this.communeMap.bringToBack()
            // this.map.removeLayer(this.support);
            // this.map.removeLayer(this.communeMap);

            // this.support.addTo(this.map);
            // this.support.bringToBack();


        },(err)=>{
            console.log(err)
        })
    }

    consulter(collecte,instance=1){
        this.collecteservice.getCollecte(collecte).then((data : any) => {
            this.collecteservice.collecte = data;
            this.collecteservice.collecte.instance = instance;
            console.log(this.collecteservice.collecte);
            // this.collecteservice.collecte.projet = projet;
            // this.collecteservice.collecte.agent = collecte.agent;
            if(this.collecteservice.collecte.collecte.geo == false ){
              return this.router.navigate(['collectes/geoless'])
            }
            if(data.collecte.projet.theme == 'rna'){
                this.router.navigate(['collectes/rnacollecte'])
            }else{
                this.router.navigate(['collectes/collecte'])
            }
        },(err) =>{
            console.log('error trying to fetch collecte id : ' + collecte);
            console.log(err)
        })
    }
    calculate(data,formule){
        let result;
        if(data[formule.variables[0]] && data[formule.variables[1]]){
            switch (formule.operateur) {
                case '+':
                    result = data[formule.variables[0]] + data[formule.variables[1]];
                    break;
                case '-':
                    result = data[formule.variables[0]] - data[formule.variables[1]];
                    break;
                case '*':
                    result = data[formule.variables[0]] * data[formule.variables[1]];
                break;
                case '/':
                    result = data[formule.variables[0]] / data[formule.variables[1]];
                break;
                default:
                    break;
            }
            return result
        }else {
            return '-'
        }
    }
    saveColorsSettings(){
        localStorage.setItem('mapsettings',JSON.stringify(this.mapSettings))
    }
    resetColorSettings(){
        this.mapSettings = {
            colorCollectes:'#0000FF',
            colorCollecte:'#008000',
            colorSelection:'#FF0000',
            colorSegments:'#FFFF00',
            colorTextCollecte:'#FFFF00',
            colorTextSegments:'#000000',
            colorCommune:'#FFFFFF'
        };
        localStorage.removeItem('mapsettings')
    }
    _status:Array<Object>;
    ngOnInit(){
        let colorsettings = localStorage.getItem('mapsettings');
        if(colorsettings != null){
            this.mapSettings = JSON.parse(colorsettings)
        }else{
            this.mapSettings = {
                colorCollectes:'#0000FF',
                colorCollecte:'#008000',
                colorSelection:'#FF0000',
                colorSegments:'#FFFF00',
                colorTextCollecte:'#FFFF00',
                colorTextSegments:'#000000',
                colorCommune:'#FFFFFF'


            };
        }

        this.showmap =true

        this.user = JSON.parse(localStorage.getItem('user'));

        if(this.user.role == 'controleur'){
            this._status = [
                {name:'Validé', value:'valid'},
                {name:'En attente de validation',value:'new'},
                {name:'Refusé',value:'reject'}
            ];
            this._region = this.user.perimetre.region.id_region;
            console.log('controlleur id region',this._region)
        }else{
            this._status = [
                {name:'Validé', value:'valid'},
                {name:'En attente de validation',value:'new'},
                {name:'En cours de validation',value:'reject'}
            ]

            if(this.user.role == 'superviseurR'){
                console.log('my role is admin');
                this._region = this.user.perimetre.region.id_region
            }
            if(this.user.role == 'agent'){
                this._agent = this.user._id
            }
            if(this.user.role == 'superviseurP' || this.user.role == 'agent'){
                this._province = this.user.perimetre.province.id_province;
                this._region = this.user.perimetre.region.id_region;
                console.log('if working')
                this.OnProvinceSelect(this._province);
            }


        }

        this.getAgents();
        this.getProjets();
        this.createMap()






    }
 }
