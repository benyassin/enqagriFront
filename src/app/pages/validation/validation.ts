import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { CollecteService } from '../../services/collecte.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
// import * as L from 'leaflet';
declare const L:any
import 'leaflet'
import 'leaflet.pm';
import 'leaflet.pm/dist/leaflet.pm.css'
import 'leaflet-fullscreen';
import * as moment from 'moment';
import * as turf from '@turf/turf';
import {forEach} from '@angular/router/src/utils/collection';
// import * as Draw from 'leaflet-draw'
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
    rmessage
    testvar = null;
    srcformio ;
    action(action){
        this.confirmationservice.confirm({
            message: "Voulez-vous confirmer cette opÃ©ration?",
            accept: () => {

                let update : any = {}
                update.niveau  = this.index;
                update.action = action;
                update.id = this.collecte._id
                if(action == 'reject'){
                    if(this.rmessage == "" || this.rmessage == null){
                        update.rmessage = "le contrÃ´leur n'a laissÃ© aucun message"
                    }else{
                        update.rmessage = this.rmessage
                    }
                }
                console.log(update)
                this.collecteservice.action(update).then((data) => {
                    this.router.navigate(['collectes/'])
                })
            }})
    }

    invalidate(){
        let  that = this
        // window.dispatchEvent(new Event('resize'));
        setTimeout(function(){ that.ParcelleMap.invalidateSize()
            that.ParcelleMap.fitBounds(that.parcelleLayers.getBounds())
        }, 400);
    }
    invalidatex(){
        let  that = this
        setTimeout(function(){ that.ExploitationMap.invalidateSize()}, 400);
    }

    // couche = L.geoJSON(this.collecteservice.collecte.blocs[0].gjson);
    // options = {
    //   layers: [
    //       L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    //   ],
    //   fullscreenControl: true,
    //   zoom: 17,
    //   center: L.latLng([34.0229,-6.8426 ])
    // };
    // layers = [
    //     this.couche
    //   ];
    // fitBounds = this.couche.getBounds()
    // onMapReady(map : L.Map) {
    // }



    OnParcelleChange(parcelle :any){
        this.hidden = true;
        this.selectedParcelle = JSON.parse(JSON.stringify(parcelle));
        this.selectedParcelle.date_creation = moment(new Date(this.selectedParcelle.date_creation)).format("DD.MM.YYYY â  h:mm");

        // this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":parcelle.formdata}, 'http://localhost/demo.html');
        // this.parcelleLayers.redraw()
        this.hidden = false;
        if(this.parcelleLayers){
        this.parcelleLayers.eachLayer(layer => {
            if(layer.feature.properties.numero == parcelle.numero){
                layer.setStyle({fillColor:'red',color:"red"})
            }else{
                layer.setStyle({fillColor:'blue',color:"blue"})
            }

        })
        }
        // this.loadMapData()
        // this.parcelleLayers.addData(this.Parcelles)
        // this.parcelleLayers.addData(this.Parcelles,{style: function(element){
        //   if(element.properties.numero == parcelle.numero) {
        //     return {"color": "#ff7800",
        //     "weight": 5,
        //     "opacity": 0.65};
        // }}})
    }
    OnTypeChange(data : any){
        this.srcformio = "http://localhost:8080/api/forms/"+data.form+"/fields";
        this.hidden = true;

        this.drawnItems.clearLayers();
        this.markers.clearLayers();

        if(this.voisinLayer){
            this.voisinLayer.eachLayer(layer => {
                if(layer instanceof L.Polygon && this._type.type == 'polygone'){
                    layer.setStyle({opacity:0.4,fillOpacity:0.3})
                    console.log('im a polygone')
                }
                else if((layer instanceof L.Polyline && !(layer instanceof L.Polygon)) && this._type.type == "polyline"){
                    layer.setStyle({opacity:1,fillOpacity:1})
                    console.log('im a polyline')

                }else{
                    layer.setStyle({fillOpacity:0,opacity:0})
                    console.log('aaaaaaa')
                }

            })
        }
        this.loadMapData()
        // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`);
    }
    saveChange(){
        // console.log(this.collecte);
        // console.log(this.selectedParcelle)
        // let test = this.collecte
        // test.delete('instance')
        // console.log(test)
        this.collecteservice.updateCollecte({'id':this.collecte._id,'exploitation':this.collecte.exploitation,'collecte':this.collecte.collecte}).then((data) => {
            console.log(data)
        },(err) =>{
            console.log('error updating colelcte')
            console.log(err)
        })
    }
    onSubmit(submission: any) {
        if(submission.changed && submission.isValid == true){
            this._parcelle.formdata.data = JSON.parse(JSON.stringify(submission.data))
        }
        // this.selectedParcelle.formdata = submission.data
    }
    OnSubmitId(submission:any){
        if(submission.data){
            this.collecte.exploitation.formdata.data = JSON.parse(JSON.stringify(submission.data))
        }
    }
    clear(){
        this.drawnItems.clearLayers();
        this.markers.clearLayers()
    }
    loadMapData(){
        let Parcelles = [];
        this._type.data.forEach(element => {
            Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
        });
        let that = this;

        this.parcelleLayers = new L.GeoJSON(Parcelles,{onEachFeature: onEachFeature})
        // markers
        function onEachFeature(feature, layer) {
            let type = that._type.type
            var center
            // console.log(layer)
            // console.log(feature)
            if(type !== 'point'){
                center = layer.getBounds().getCenter();
                console.info('center',center)
                var labelPoint = L.marker([center.lat, center.lng], {
                    icon: L.divIcon({
                        // className: "labelPoint",
                        // html: num,
                        html: feature.properties.numero,
                        iconSize: null,
                        // iconUrl: 'assets/marker-icon.png',
                        // shadowUrl: 'assets/marker-shadow.png'
                    })
                });

                that.drawnItems.addLayer(layer)
                that.markers.addLayer(labelPoint);

            }else{
                let icon = 'assets/marker-icon.png'
                if(feature.properties.numero == that.selectedParcelle.numero){
                    icon = 'assets/marker-icon-green.png'
                }
                center = layer.getLatLng()

                var labelPoint = L.marker([center.lat, center.lng], {
                    icon: L.icon({
                        // className: "labelPoint",
                        // html: num,
                        // html: feature.properties.numero,
                        // iconSize: null,
                        iconUrl: icon,
                        shadowUrl: 'assets/marker-shadow.png'
                    })
                });

                that.drawnItems.addLayer(labelPoint)


            }



        }
        this.markers.addTo(this.ParcelleMap);
        //  drawnItems.addLayer(this.parcelleLayers)
        this.drawnItems.addTo(this.ParcelleMap)   ;

        this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())

        let guideLayers = this.parcelleLayers
        var optionsDraw = {
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
        console.log('parcelle layers')
        console.log(guideLayers)
        // var drawControl = new L.Control.Draw(optionsDraw);
        // this.ParcelleMap.addControl(drawControl);

    }
    identification
    ngOnInit(){
        //init map

        console.log(this.collecteservice.collecte);

        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte.collecte;
            this.voisin = this.collecteservice.collecte.voisin
        }else{
            this.router.navigate(['collectes/'])
        }
        this._type = this.collecte.collecte[0];
        this.identification ="http://localhost:8080/api/forms/"+this.collecte.exploitation.form+"/fields?rsubmit=true";
        this.srcformio="http://localhost:8080/api/forms/"+this._type.form+"/fields?rsubmit=true";

        // this.OnParcelleChange(this._type.data[0])

        // let query = this.collecte.exploitation.form
        // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
        this.validation = this.collecte.validation;
        // this.user = JSON.parse(localStorage.getItem('user'));
        // this.lenght = this.collecte.projet.validation.length;
        // this.index = this.collecte.projet.validation[this.user.perimetre.region].findIndex(x => x.agent==this.user._id);
        //
        // if(this.collecte.rmessage != null && this.validation[this.index] == 'reject'){
        //     this.msgs.push({severity:'error', summary:'message:', detail:this.collecte.rmessage});
        // }
        //
        // this.receiveMessage = (event: MessageEvent) => {
        //     if(event.origin != 'http://localhost' ){
        //         return
        //     }
        //     if(event.data.window == 'exploitation' && event.data.message === 'loaded'){
        //       event.source.postMessage({"window":event.data.window,"message":'data',"data":this.collecte.collecte[0].data[0].formdata.data}, event.origin)
        //     }
        //   };
        //   this.isInited = true;

        this.ParcelleMap = new L.Map('map').setView([0, 0], 3);
        console.log('map created')


        let CustomMarker = L.Icon.extend({
            options: {
                iconAnchor: new L.Point(12, 12),
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: null
            }
        });
        L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
        }).addTo(this.ParcelleMap);
        //   L.tileLayer.wms('http://192.168.1.77:8086/geoserver/DSS/wms?',
        // {
        //     layers:'DSS:region',
        //     format:'image/png',
        //     transparent:true,
        //     CQL_filtre:"id_region in (0,42)"
        // }).addTo(this.ParcelleMap)


        //   L.tileLayer.wms('http://192.168.1.77:8086/geoserver/DSS/wms',
        //   {
        //       layers:'DSS:region',
        //       format:"image/png",
        //       transparent:true,
        //       CQL_FILTER:"id_region=(1*" +this.collecte.region +")",
        //       tileSize:256,
        //       tiled:true
        //   },{buffer: 0}).addTo(this.ParcelleMap)

        //  L.tileLayer.wms('http://192.168.1.77:8086/geoserver/DSS/wms',
        //  {
        //       layers:'DSS:province',
        //       format:"image/png",
        //       transparent:true,
        //       CQL_FILTER:"id_province=(1*" +this.collecte.province +")",
        //       tileSize:256,
        //       tiled:true
        //  },{buffer: 0}).addTo(this.ParcelleMap)


        //     this.markers.addTo(this.ParcelleMap);
        //     drawnItems.addLayer(this.parcelleLayers)
        //     this.drawnItems.addTo(this.ParcelleMap)
        var options = {
            position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
            drawMarker: true, // adds button to draw markers
            drawPolyline: true, // adds button to draw a polyline
            drawRectangle: false, // adds button to draw a rectangle
            drawPolygon: true, // adds button to draw a polygon
            drawCircle: false, // adds button to draw a cricle
            cutPolygon: true, // adds button to cut a hole in a polygon
            editMode: true, // adds button to toggle edit mode for all layers
            removalMode: true, // adds a button to remove layers
        };
        this.ParcelleMap.pm.addControls(options);
        var Fullscreen = new L.Control.Fullscreen();
        this.ParcelleMap.addControl(Fullscreen);
        //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
          this.AddParcelleLayer(this.collecte.collecte);


        // this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
        //   var type = e.layerType,
        //       layer = e.layer
        //       that.drawnItems.addLayer(layer)
        //     });
        this.loadMapData()
        this._parcelle = this.collecte.collecte[0].data[0];
        this.OnParcelleChange(this.collecte.collecte[0].data[0])

    }
    voisinLayer
    AddParcelleLayer(collecte){
        let Parcelles = [];
        let listsupport = [];
            collecte.forEach(c =>{
                c.data.forEach(element => {
                    if(!listsupport.includes(element.id_support._id)){
                        listsupport.push(element.id_support._id);
                        Parcelles.push({"type": "Feature","properties":element.id_support.properties,geometry:element.id_support.geometry})

                    }
                });
            });
            console.log('list support utiliser ====>');
            console.log(listsupport);


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
                voisin.push({"type":"Feature","properties":{},geometry:element})
            })
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
            this.voisinLayer = new L.GeoJSON(voisin,{style: styleV,pmIgnore: true });
            this.voisinLayer.addTo(this.ParcelleMap)
            let layer = new L.GeoJSON(Parcelles,{style: styleP,pmIgnore: true });
            layer.addTo(this.ParcelleMap);
            // let aa = {"type": "Feature","properties":{"numero":''},geometry:{}}
            // let test = new L.GeoJSON(aa,{style:styleS,pmIgnore: true})
            // test.addTo(this.ParcelleMap);
            //
            // let control =  L.control.layers({},{"segment":test,"parcelles":layer,"voisins":_voisin,"intersection":_intersection})
            // control.addTo(this.ParcelleMap)


    }
    ngAfterViewInit() {



        // Test Exploitation map
        //     this.ExploitationMap = new L.Map('map').setView([51.505, -0.09], 13);
        //     let blocs : any = []
        //     this.collecteservice.collecte.blocs.forEach(element => {
        //        blocs.push(element.gjson)
        //     });
        //     let BlocLayers =new  L.GeoJSON(blocs).addTo(this.ExploitationMap)
        //     this.ExploitationMap.fitBounds(BlocLayers.getBounds())

        //     var myStyle: any = {
        //       "color": "#ff7800",
        //       "weight": 5,
        //       "opacity": 0.65
        //   };
        //     // Test Parcelle map
        //     this.ParcelleMap = new L.Map('map2').setView([51.505, -0.09], 13);
        //     console.log('map created')
        //     let CustomMarker = L.Icon.extend({
        //       options: {
        //           iconAnchor: new L.Point(12, 12),
        //           iconUrl: 'assets/marker-icon.png',
        //           shadowUrl: null
        //       }
        //   });
        //   L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        // }).addTo(this.ParcelleMap);
        // Draw Control



        //   var drawControl = new L.Control.Draw(optionsDraw);
        // //     this.markers.addTo(this.ParcelleMap);
        // //     drawnItems.addLayer(this.parcelleLayers)
        // //     this.drawnItems.addTo(this.ParcelleMap)
        //   var Fullscreen = new L.Control.Fullscreen();

        //     this.ParcelleMap.addControl(Fullscreen);
        //     this.ParcelleMap.addControl(drawControl);
        // //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
        //   let that = this
        //     this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
        //       var type = e.layerType,
        //           layer = e.layer
        //           that.drawnItems.addLayer(layer)
        //         });
    }
}