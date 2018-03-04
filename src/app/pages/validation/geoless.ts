import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { CollecteService } from '../../services/collecte.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
// import * as L from 'leaflet';
declare const L:any
import 'leaflet-draw';
import 'leaflet-fullscreen'
import * as moment from "moment"

// import * as Draw from 'leaflet-draw'
@Component({
    selector: 'geoless',
    templateUrl: './geoless.html',
})


export class GeolessPage implements AfterViewInit  {
    constructor(
      private collecteservice:CollecteService,
      private confirmationservice:ConfirmationService,
      private router:Router
    ){}
    collecte : any
    url : any
    Parcelles : any = []
    ExploitationMap
    ParcelleMap
    parcelleLayers
    selectedParcelle = {numero: ""}
    markers = new L.LayerGroup();
    drawnItems = new L.FeatureGroup()
    selected
    hidden = true

 
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
    
    @ViewChild('iframe') iframe: ElementRef;
    @ViewChild('parcelle') parcelle: ElementRef;
    
      receiveMessage: EventListener;
      private renderer: Renderer;
      
      private isInited: boolean;
    

    OnParcelleChange(parcelle){
      // console.log(parcelle)
      // this.hidden = false
      // this.selectedParcelle = parcelle
      // this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":parcelle.formdata}, 'http://localhost/demo.html')
      // // this.parcelleLayers.redraw()
      // this.drawnItems.clearLayers()
      // this.markers.clearLayers()
      // this.loadMapData()
      // this.parcelleLayers.addData(this.Parcelles)
      // this.parcelleLayers.addData(this.Parcelles,{style: function(element){
      //   if(element.properties.numero == parcelle.numero) {
      //     return {"color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65};
      // }}})
    }
    // OnTypeChange(data){
    //   this.hidden = true
    //   console.log(data)
    //   this.selected = data
    //   let query = data.form
    //   document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
    //   this.clear()
    //   this.loadMapData()
    // }
    msgs : any = [];
    rmessage
    action(action){
        this.confirmationservice.confirm({
            message: "Voulez-vous confirmer cette opération?",
            accept: () => {

                let update : any = {}
                update.niveau  = this.index;
                update.action = action;
                update.id = this.collecte._id
                if(action == 'reject'){
                    if(this.rmessage == "" || this.rmessage == null){
                        update.rmessage = "le contrôleur n'a laissé aucun message"
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
    clear(){
      console.log(this.drawnItems)
      this.drawnItems.clearLayers()
      this.markers.clearLayers()
    }
    // loadMapData(){

    //   let Parcelles = []
    //   this.selected.data.forEach(element => {
    //     Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
    //   });
    //   let that = this
      
    //   this.parcelleLayers = new L.GeoJSON(Parcelles,{onEachFeature: onEachFeature,style: function(element){
    //     if(element.properties.numero == that.selectedParcelle.numero) {
    //       return {"color": "#ff7800",
    //       "weight": 5,
    //       "opacity": 0.65};
    //   }
    //   }})

    //   // markers
    //   function onEachFeature(feature, layer) {
    //     let type = that.selected.type
    //     var center
    //     // console.log(layer)
    //     // console.log(feature)
    //     if(type !== 'point'){
    //       center = layer.getBounds().getCenter();
          
    //       var labelPoint = L.marker([center.lat, center.lng], {
    //         icon: L.divIcon({
    //               className: "labelPoint",
    //               // html: num,
    //               html: feature.properties.numero,
    //               iconSize: null,
    //               // iconUrl: 'assets/marker-icon.png',
    //               // shadowUrl: 'assets/marker-shadow.png'
    //               })
    //         });
          
    //           that.drawnItems.addLayer(layer)
    //           that.markers.addLayer(labelPoint);
          
    //     }else{
    //       let icon = 'assets/marker-icon.png'
    //       if(feature.properties.numero == that.selectedParcelle.numero){
    //         icon = 'assets/marker-icon-green.png'
    //       }
    //       center = layer.getLatLng()

    //       var labelPoint = L.marker([center.lat, center.lng], {
    //         icon: L.icon({
    //               // className: "labelPoint",
    //               // html: num,
    //               // html: feature.properties.numero,
    //               // iconSize: null,
    //               iconUrl: icon,
    //               shadowUrl: 'assets/marker-shadow.png'
    //               })
    //         });

    //         that.drawnItems.addLayer(labelPoint)
            
          
    //     }

      
        
    //   }
    //     this.markers.addTo(this.ParcelleMap);    
    //     //  drawnItems.addLayer(this.parcelleLayers)
    //     this.drawnItems.addTo(this.ParcelleMap)   

    //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())

    // }
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
            this.dataformio.data = JSON.parse(JSON.stringify(submission.data))
        }
        // this.selectedParcelle.formdata = submission.data
    }
    _type
    srcformio
    dataformio
    validation
    user
    index
    lenght
    ngOnInit(){
      //init map

      
        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte.collecte;
            this.collecte.collecte[0].data[0].date_creation = moment(new Date(this.collecte.collecte[0].data[0].date_creation)).format("DD.MM.YYYY à HH:MM")
        }else{
          this.router.navigate(['collectes/'])
        }
        console.log('this.collecte');
        console.log(this.collecte);
        console.log('collecte[0]');
        console.log(this.collecte.collecte[0]);
        this._type = this.collecte.collecte[0];
        this.dataformio = this.collecte.collecte[0].data[0].formdata;
        this.srcformio="http://localhost:8080/api/forms/"+this._type.form+"/fields?rsubmit=true";

        this.hidden = false;
        this.validation = this.collecte.validation;
        this.lenght = this.collecte.projet.niveau;

        this.user = JSON.parse(localStorage.getItem('user'));
        if(this.user.role === 'admin'){
            this.index = 0
        }else{
            this.index = this.collecte.projet.validation[this.user.perimetre.region.id_region].findIndex(x => x.agent==this.user._id);
        }

        if(this.collecte.rmessage != null && this.validation[this.index] == 'reject'){
            this.msgs.push({severity:'error', summary:'message:', detail:this.collecte.rmessage});
        }
        this.ExploitationMap = new L.Map('map').setView([34.0375,-6.7516], 6);
        L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains:['mt0','mt1','mt2','mt3'],
        }).addTo(this.ExploitationMap);

    }
    ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage);
      }
    ngAfterViewInit() {

        this.isInited = true;


        // Test Exploitation map
        // let blocs : any = []
        // this.collecteservice.collecte..forEach(element => {
        //    blocs.push(element.gjson)
        // });
        // let BlocLayers =new  L.GeoJSON(blocs).addTo(this.ExploitationMap)
        // this.ExploitationMap.fitBounds(BlocLayers.getBounds())

      //   var myStyle: any = {
      //     "color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65
      // };
    //     // Test Parcelle map
    //     this.ParcelleMap = new L.Map('map').setView([51.505, -0.09], 13);
    //     let CustomMarker = L.Icon.extend({
    //       options: {
    //           iconAnchor: new L.Point(12, 12),
    //           iconUrl: 'assets/marker-icon.png',
    //           shadowUrl: null
    //       }
    //   });


    // L.marker([this.collecteservice.collecte.lat, this.collecteservice.collecte.lng],{
    //   icon: L.icon({
    //
    //         iconUrl: 'assets/marker-icon.png',
    //         shadowUrl: 'assets/marker-shadow.png'
    //         })
    //   }).addTo(this.ExploitationMap)

    //   // Draw Control
    //   var optionsDraw = {
    //     position:'topright',
    //          edit: {
    //               featureGroup: this.drawnItems,
    //               polygon : {
    //                 allowIntersection : false
    //               },
    //               remove:true,
    //               edit:true
    //             },
    //          draw: {
    //              rectangle: false,
    //              circle: false,
    //              txt: false,
    //              marker: {
    //               icon: new CustomMarker()
    //             },
    //              circlemarker:false,
    //              polyline: {
    //                 metric:true,
    //                 shapeOptions: {
    //                      color: 'red', 
    //                      weight: 3,
    //                      opacity: 1
    //                 },
    //             },
    //             polygon: {
    //             allowIntersection: false, // Restricts shapes to simple polygons
    //             drawError: {
    //                 color: '#e1e100', // Color the shape will turn when intersects
    //                 message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    //             },
    //                 shapeOptions: {
    //                     weight: 2,
    //                     opacity: 0.4,
    //                     color: 'black',
    //                     dashArray: '3',
    //                     fillOpacity: 0.3,
    //                     fillColor: 'blue'
    //                 },
    //               },
    //             }
    // };

      
    //   var drawControl = new L.Control.Draw(optionsDraw);
    // //     this.markers.addTo(this.ParcelleMap);    
    // //     drawnItems.addLayer(this.parcelleLayers)
    // //     this.drawnItems.addTo(this.ParcelleMap)   
    //   var Fullscreen = new L.Control.Fullscreen()

    //     this.ParcelleMap.addControl(Fullscreen)
    //     this.ParcelleMap.addControl(drawControl)
    // //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
    //   let that = this
    //     this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
    //       var type = e.layerType,
    //           layer = e.layer
    //           that.drawnItems.addLayer(layer)
    //         });
      }

    onIframeLoad(element) {

      }  

 }
