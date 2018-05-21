import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { CollecteService } from '../../services/collecte.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
// import * as L from 'leaflet';
declare const L:any;
import 'leaflet'
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css'
import 'leaflet-fullscreen';
import 'leaflet-extra-markers';
import * as moment from 'moment-timezone';
import { createForm } from 'formiojs';
import { FormioOptions } from 'angular-formio'
declare global {
    interface Window { setLanguage: any; }
}
@Component({
    selector: 'Validation',
    templateUrl: './validation.html',
    styleUrls: ['./validation.css']
})




export class ValidationPage implements AfterViewInit  {
    constructor(
        private collecteservice:CollecteService,
        private router:Router,
        private confirmationservice:ConfirmationService
    ){}
    msgs : any = [];
    collecte : any;
    voisin : any;
    _parcelle : any = '';
    _type : any = '';
    url : any;
    Parcelles : any = [];
    ExploitationMap;
    ParcelleMap;
    parcelleLayers;
    selectedParcelle;
    markers = new L.LayerGroup();
    drawnItems = new L.FeatureGroup();
    selected;
    hidden = true;

    validation;
    user;
    lenght;
    index;
    rmessage;
    testvar = null;
    srcformio ;
    public options: FormioOptions;

    action(action){
        this.confirmationservice.confirm({
            message: "Voulez-vous confirmer cette opération?",
            accept: () => {

                let update : any = {};
                update.niveau  = this.index;
                update.action = action;
                update.id = this.collecte._id;
                if(action == 'reject'){
                    if(this.rmessage == "" || this.rmessage == null){
                        update.rmessage = "le contrôleur n'a laissé aucun message"
                    }else{
                        update.rmessage = this.rmessage
                    }
                }
                console.log(update);
                this.collecteservice.action(update).then((data) => {
                    this.router.navigate(['collectes/'])
                })
            }})
    }




    extraGreen = L.ExtraMarkers.icon({
        icon: 'fa-number',
        markerColor: 'red',
        number:12,
        shape: 'square',
        prefix: 'fa'
    });
    LeafIcon = L.Icon.extend({
        options: {
            iconSize: [25, 42],
            iconAnchor: [0, 0],
            popupAnchor: [2, 0]
        }
    });
    IconGreen = new this.LeafIcon({
        iconUrl: "assets/marker-icon-green.png"
    });

    IconRed = new this.LeafIcon({
        iconUrl: "assets/marker-icon-red.png"
    });

    IconBlue = new this.LeafIcon({
       iconUrl: 'assets/marker-icon.png'
    });



    OnParcelleChange(parcelle :any){
        this.hidden = true;
        // this.selectedParcelle = {}
        this.selectedParcelle = JSON.parse(JSON.stringify(parcelle));
        this.selectedParcelle.date_creation = moment(new Date(this.selectedParcelle.date_creation)).add(-1,'hours').format("DD-MM-YYYY à HH:mm");

        // this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":parcelle.formdata}, 'http://localhost/demo.html');
        // this.parcelleLayers.redraw()
        this.hidden = false;

        if(this.parcelleLayers){
        this.parcelleLayers.eachLayer(layer => {

            if(layer.feature.properties.numero == parcelle.numero){
                if(layer instanceof L.Marker) {
                    layer.setIcon(this.IconRed);
                }else{
                    layer.setStyle({fillColor: 'red', color: "red"});
                    this.ParcelleMap.fitBounds(layer.getBounds())
                }

                // layer.setIcon({iconUrl:})
            }else{
                if(layer instanceof L.Marker) {
                    layer.setIcon(this.IconBlue);
                }else{
                    layer.setStyle({fillColor:'blue',color:"blue"})
                }

            }
            // if(layer.feature.properties.numero == parcelle.numero){
            //     layer.setStyle({fillColor:'red',color:"red"})
            // }else{
            //     layer.setStyle({fillColor:'blue',color:"blue"})
            // }

        })

        }
    }
    OnTypeChange(data : any){
        this.srcformio = location.protocol+'//'+location.hostname+"/api/forms/"+data.form+"/fields";
        this.hidden = true;

        this.drawnItems.clearLayers();
        this.markers.clearLayers();

        if(this.voisinLayer){
            this.voisinLayer.eachLayer(layer => {
                if(layer instanceof L.Polygon && this._type.type == 'polygone'){
                    layer.setStyle({opacity:0.4,fillOpacity:0.3});
                    console.log('im a polygone')
                }
                else if((layer instanceof L.Polyline && !(layer instanceof L.Polygon)) && this._type.type == "polyline"){
                    layer.setStyle({opacity:1,fillOpacity:1});
                    console.log('im a polyline')

                }else{
                    layer.setIcon({iconUrl:"assets/marker-icon-green.png"});
                    console.log('aaaaaaa')
                }

            })
        }
        this.loadMapData()
    }
    delete(){
        this.confirmationservice.confirm({
            message: "Voulez-vous confirmer cette opération?",
            accept: () => {
                this.collecteservice.deleteCollecte(this.collecte._id).then((data)=>{
                    this.router.navigate(['collectes/'])
                },(err)=>{
                    this.msgs = [];
                    this.msgs.push({severity:'error', summary:'message:', detail:'Impossible de supprimer cette collecte'});
                })
            }
        })

    }
    saveChange(){
        this.collecteservice.updateCollecte({'id':this.collecte._id,'exploitation':this.collecte.exploitation,'collecte':this.collecte.collecte}).then((data) => {
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'message:', detail:'Modification avec succès'});
        },(err) =>{
            console.log('error updating colelcte');
            console.log(err)
        })
    }
    onSubmit(submission: any) {
        console.log('WATTTTTTTTTTTTTTTT')

        this._parcelle.formdata.data = JSON.parse(JSON.stringify(submission.data))

        // this.selectedParcelle.formdata = submission.data
    }
    OnSubmitId(submit:any){
        console.log(submit.data)
        console.log('WATTTTTTTTTTTTTTTT');
            this.collecte.exploitation.formdata.data = JSON.parse(JSON.stringify(submit.data))
    }


    clear(){
        this.drawnItems.clearLayers();
        this.markers.clearLayers()
    }
    loadMapData(){
        let Parcelles = [];
        this._type.data.forEach(element => {
            if(element.gjson.hasOwnProperty('geometry')){
                element.gjson =element.gjson.geometry
            }
            Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
        });
        let that = this;

        this.parcelleLayers = new L.GeoJSON(Parcelles,{onEachFeature: onEachFeature,
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {icon: that.IconBlue});
                },},
            );
        // markers
        function onEachFeature(feature, layer) {
            let type = that._type.type;
            let center;

            // console.log(layer)
            // console.log(feature)
            // if(type !== 'point'){
            if(layer instanceof L.Marker){
                center = layer.getLatLng()
            }else{
                center  = layer.getBounds().getCenter()
            }
                // console.info('center',center);

                let myIcon = L.divIcon({
                    html: "<span style='color:yellow;font-weight: bold;'>"+feature.properties.numero+"</span>",
                    className: "labelClass",
                });

                let redMarker = L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    markerColor: 'blue',
                    number:feature.properties.numero,
                    shape: 'square',
                    prefix: 'fa'
                });
                let labelPoint = L.marker([center.lat, center.lng], {
                    icon: myIcon
                });

                that.drawnItems.addLayer(layer);
                that.markers.addLayer(labelPoint);

            // } else{
            //     let icon = 'assets/marker-icon.png';
            //
            //     // if(feature.properties.numero == this.selectedParcelle.numero){
            //     //     icon = 'assets/marker-icon-green.png'
            //     // }
            //     center = layer.getLatLng();
            //
            //     let redMarker = L.ExtraMarkers.icon({
            //         icon: 'fa-number',
            //         markerColor: 'blue',
            //         number:feature.properties.numero,
            //         shape: 'square',
            //         prefix: 'fa'
            //     });
            //
            //
            //
            //     let marker = L.marker([center.lat, center.lng], {
            //         icon: redMarker
            //     });
            //
            //
            //
            //     // layer.bindTooltip(number.toString(),{permanent:true,opacity:0.2}).openTooltip();
            //     that.drawnItems.addLayer(marker);
            //     // that.markers.addLayer(marker);
            //
            //
            // }



        }
        this.markers.addTo(this.ParcelleMap);
        //  drawnItems.addLayer(this.parcelleLayers)
        this.drawnItems.addTo(this.ParcelleMap)   ;

        this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds());

        let guideLayers = this.parcelleLayers;
        let optionsDraw = {
            position:'topright',
            edit: {
                featureGroup: this.drawnItems,
                remove:true,
                edit:true,
                guideLayers: guideLayers

            },
            draw: {
                rectangle: false,
                circle: false,
                txt: false,
                marker: {
                    guideLayers: guideLayers
                },
                circlemarker:false,
                polyline: {
                    guideLayers: guideLayers,
                    metric:true,
                    shapeOptions: {
                        color: 'red',
                        weight: 3,
                        opacity: 1
                    },
                },
                polygon: {
                    guideLayers: guideLayers,
                    allowIntersection: false, // Restricts shapes to simple polygons
                    drawError: {
                        color: '#e1e100', // Color the shape will turn when intersects
                        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                    },
                    shapeOptions: {
                        weight: 2,
                        opacity: 0.4,
                        color: 'black',
                        dashArray: '3',
                        fillOpacity: 0.3,
                        fillColor: 'blue'
                    },
                },
            }
        };
        console.log('parcelle layers');
        console.log(guideLayers)
        // var drawControl = new L.Control.Draw(optionsDraw);
        // this.ParcelleMap.addControl(drawControl);

    }
    voisinLayer;
    voisinMarkers = new L.FeatureGroup();
    AddParcelleLayer(collecte){
        let Parcelles = [];
        let listsupport = [];
        if(this.collecte.projet.cid != null){
        collecte.forEach(c =>{
            c.data.forEach(element => {
                if(!listsupport.includes(element.id_support._id)){
                    listsupport.push(element.id_support._id);
                    Parcelles.push({"type": "Feature","properties":element.id_support.properties,geometry:element.id_support.geometry})

                }
            });
        });
        }
        // console.log('list support utiliser ====>');
        // console.log(listsupport);


        let styleP = {"color": '#faff06',
            "weight": 2,
            "opacity": 1,
            "fillOpacity": 0
        };
        let styleS = {"color": "#ffffff",
            "weight": 2,
            "opacity": 1,
            "fillOpacity": 0
        };
        let styleV = {
            weight: 2,
            opacity: 0.4,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.3,
            fillColor: 'green'
        };
        let styleI = {"color": "black",
            "weight": 2,
            "opacity": 1,
            "fillOpacity": 1
        };
        let voisin = [];
        // this.collecteservice.getVoisin(this.collecte._id,)
        this.voisin.forEach(element => {
            if(element.gjson.hasOwnProperty('geometry')){
                element.gjson =element.gjson.geometry
            }
            voisin.push({"type":"Feature","properties":{id_collecte:element.id_collecte,numero:element.numero},geometry:element.gjson})
        });
        let intersect = [];
        // data.voisin.forEach(element => {
        //     let e = element.collecte[0].data[0];
        //     if(this.collecte.collecte[0].data[0].numero != e.numero){
        //         voisin.push({"type":"Feature","properties":{"numero":e.numero},geometry:e.gjson})
        //         let _int = turf.intersect(this.collecte.collecte[0].data[0].gjson,e.gjson)
        //         if(_int){
        //             intersect.push(_int)
        //         }
        //     }
        // });
        // let _intersection = new L.GeoJSON(intersect,{style:styleI});
        // _intersection.addTo(this.ParcelleMap);
        let icon = this.IconGreen;
        this.voisinLayer = new L.GeoJSON(voisin,{style: styleV,pmIgnore: true,
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng, {icon: icon});
            },},);

        let markers = this.voisinMarkers;
        this.voisinLayer.eachLayer((layer) =>{
            let center ;
            let properties = layer.feature.properties;
            if(layer instanceof L.Marker){
                center = layer.getLatLng()
            }else{
                center  = layer.getBounds().getCenter()
            }
            let myIcon = L.divIcon({
                html: "<span style='color:yellow;font-weight: bold;'>"+properties.id_collecte+'('+properties.numero+')'+"</span>",
                className: "labelClass",
            });
            let marker = new L.marker([center.lat,center.lng],{icon:myIcon});
            markers.addLayer(marker)
        });
        this.voisinLayer.addTo(this.ParcelleMap);
        this.voisinMarkers.addTo(this.ParcelleMap);
        let layer = new L.GeoJSON(Parcelles,{style: styleP,pmIgnore: true });
        layer.addTo(this.ParcelleMap);
        // let aa = {"type": "Feature","properties":{"numero":''},geometry:{}}
        // let test = new L.GeoJSON(aa,{style:styleS,pmIgnore: true})
        // test.addTo(this.ParcelleMap);
        //
        // let control =  L.control.layers({},{"segment":test,"parcelles":layer,"voisins":_voisin,"intersection":_intersection})
        // control.addTo(this.ParcelleMap)


    }

    identification;
    identificationData;
    ngOnInit(){
        //init map
        this.options = {
             i18n: { 'en': {
                 Submit: 'Sauvegarder',
                 error : "Veuillez corriger les erreurs suivantes avant de soumettre.",
                 next:'Suivant',
                 previous : "Précedent",
                 complete:'Modification avec succès'
             } } };
        console.log(this.collecteservice.collecte);

        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte.collecte;
            this.voisin = this.collecteservice.collecte.voisin
        }else{
            this.router.navigate(['collectes/'])
        }
        console.log('collecte ');
        console.log(this.collecte.collecte[0]);
        this._type = this.collecte.collecte[0];
        if(this.collecte.hasOwnProperty('exploitation')){
        this.identification =location.protocol+'//'+location.hostname+"/api/forms/"+this.collecte.exploitation.form+"/fields";
        this.identificationData = JSON.parse(JSON.stringify(this.collecte.exploitation))
        }
        this.srcformio=location.protocol+'//'+location.hostname+"/api/forms/"+this._type.form+"/fields";






        // this.OnParcelleChange(this._type.data[0])

        // let query = this.collecte.exploitation.form
        // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
        this.validation = this.collecte.validation;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.lenght = this.collecte.projet.niveau;
        if(this.user.role !== 'controleur'){
            this.index = 0
        }else{
        this.index = this.collecte.projet.validation[this.user.perimetre.region.id_region].findIndex(x => x.agent==this.user._id);
        }
        if(this.collecte.rmessage != null && this.validation[this.index] == 'reject'){
            this.msgs.push({severity:'error', summary:'message:', detail:this.collecte.rmessage});
        }


        // DEFINE MAP
        this.ParcelleMap = new L.Map('map').setView([0, 0], 3);
        console.log('map created');


        let CustomMarker = L.Icon.extend({
            options: {
                iconAnchor: new L.Point(12, 12),
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: null
            }
        });
        L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
        }).addTo(this.ParcelleMap);


        // CHECK COMMITS BEFORE 2MARS for backup
        let Fullscreen = new L.Control.Fullscreen();
        this.ParcelleMap.addControl(Fullscreen);
        //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
        this.AddParcelleLayer(this.collecte.collecte);


        //separate
        console.log('parcelle 1');
        let instance = this.collecteservice.collecte.instance -1;
        this.loadMapData();

        this._parcelle = this._type.data[instance];
        this.OnParcelleChange(this._type.data[instance])

    }



    ngAfterViewInit() {

    }
}