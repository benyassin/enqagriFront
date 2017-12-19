import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { CollecteService } from '../../services/collecte.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
// import * as L from 'leaflet';
declare const L:any
import 'leaflet-draw';
// import 'leaflet-fullscreen'
import * as moment from "moment"

// import * as Draw from 'leaflet-draw'
@Component({
    selector: 'RnaValidation',
    templateUrl: './rna.html',
    styleUrls: ['./rna.css']
})


export class RnaValidationPage implements AfterViewInit  {
    constructor(
      private collecteservice:CollecteService
    ){}
    collecte : any
    _parcelle : any
    url : any
    Parcelles : any = []
    ExploitationMap
    ParcelleMap
    parcelleLayers
    selectedParcelle = {numero: ""}
    markers = new L.LayerGroup();
    drawnItems = new L.FeatureGroup()
    exploitationform : any
    exploitationData : any
    invalidate(){
     let  that = this
      // window.dispatchEvent(new Event('resize'));
      setTimeout(function(){ that.ParcelleMap.invalidateSize()
        that.ParcelleMap.fitBounds(that.parcelleLayers.getBounds())      
      }, 400);
      console.log("invalidated")
    }
    invalidatex(){
      let  that = this
      setTimeout(function(){ that.ExploitationMap.invalidateSize()}, 400);
    }
 
    couche = L.geoJSON(this.collecteservice.collecte.blocs[0].gjson);
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
      parcelle.date_creation = moment(new Date(parcelle.date_creation)).format("DD.MM.YYYY à h:mm")      
      this.selectedParcelle = parcelle
      this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":JSON.parse(parcelle.formdata)}, 'http://localhost/demo.html')
      // this.parcelleLayers.redraw()
      this.drawnItems.clearLayers()
      this.markers.clearLayers()
      this.parcelleLayers.addData(this.Parcelles)
      // this.parcelleLayers.addData(this.Parcelles,{style: function(element){
      //   if(element.properties.numero == parcelle.numero) {
      //     return {"color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65};
      // }}})
    }
    getData(){
      this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'submit'}, 'http://localhost/demo.html')
    }
    onrender(){
      console.log('render')
      console.log(this.collecte.exploitation.formdata)

    }
    onSubmit(data){
      console.log(data.data)
    }  
    ngOnInit(){
      //init map
      console.log(this.collecteservice.collecte)
        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte
            this.collecte.exploitation.date_creation = moment(new Date(this.collecte.exploitation.date_creation)).format("DD.MM.YYYY à h:mm")  
        }
        // let query = this.collecte.exploitation.form
        this.exploitationform = 'http://localhost:8080/api/forms/'+ this.collecte.exploitation.form +'/fields'
        this.exploitationData = this.collecte.exploitation.formdata
        
        // let queryy = this.collecte.collecte[0].form
        // document.getElementById('exploitation').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
        // document.getElementById('parcelle').setAttribute('src', `http://localhost/demo.html?myParam=${queryy}`)
        

        
        this.receiveMessage = (event: MessageEvent) => {
            if(event.origin != 'http://localhost' ){
                return
            }
            if(event.data.window == 'exploitation' && event.data.message === 'loaded'){
              event.source.postMessage({"window":event.data.window,"message":'data',"data":JSON.parse(this.collecte.exploitation.formdata)}, event.origin)
            }
            console.log(event.data)
          };
    }
    ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage);
      }
    ngAfterViewInit() {
        this.isInited = true;


        // Test Exploitation map
        this.ExploitationMap = new L.Map('map').setView([51.505, -0.09], 13);
        let blocs : any = []
        this.collecteservice.collecte.blocs.forEach(element => {
           blocs.push(element.gjson)
        });
        let BlocLayers =new  L.GeoJSON(blocs).addTo(this.ExploitationMap)
        this.ExploitationMap.fitBounds(BlocLayers.getBounds())

        var myStyle: any = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0.65
      };
        // Test Parcelle map
        this.ParcelleMap = new L.Map('map2').setView([51.505, -0.09], 13);
        
        this.collecteservice.collecte.collecte[0].data.forEach(element => {
          this.Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
        });
        let that = this
        
        this.parcelleLayers = new L.GeoJSON(this.Parcelles,{onEachFeature: onEachFeature,style: function(element){
          if(element.properties.numero == that.selectedParcelle.numero) {
            return {"color": "#ff7800",
            "weight": 5,
            "opacity": 0.65};
        }
        }})

        //osm 

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.ParcelleMap);

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.ExploitationMap);


        // markers
        function onEachFeature(feature, layer) {
          
          var center = layer.getBounds().getCenter();
            var labelPoint = L.marker([center.lat, center.lng], {
            icon: L.divIcon({
                  className: "labelPoint",
                  // html: num,
                  html: feature.properties.numero,
                  iconSize: null
                  })
            });
          that.drawnItems.addLayer(layer)
          that.markers.addLayer(labelPoint);
        
      }
      
      // Draw Control
      var optionsDraw = {
        position:'topright',
             edit: {
                  featureGroup: this.drawnItems,
                  polygon : {
                    allowIntersection : false
                  },
                  remove:true,
                  edit:true
                },
             draw: {
                 rectangle: false,
                 circle: false,
                 txt: false,
                 marker: true,
                 circlemarker:false,
                 polyline: {
                    metric:true,
                    shapeOptions: {
                         color: 'red', 
                         weight: 3,
                         opacity: 1
                    },
                },
                polygon: {
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

      
      var drawControl = new L.Control.Draw(optionsDraw);
        this.markers.addTo(this.ParcelleMap);    
        //  drawnItems.addLayer(this.parcelleLayers)
        this.drawnItems.addTo(this.ParcelleMap)   
      // var Fullscreen = new L.Control.Fullscreen()

        // this.ParcelleMap.addControl(Fullscreen)
        this.ParcelleMap.addControl(drawControl)
        this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
        this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
          var type = e.layerType,
              layer = e.layer
              that.parcelleLayers.addLayer(layer)
            });
      }

    onIframeLoad(element) {
        if (this.isInited) {
            window.addEventListener('message', this.receiveMessage, false);
        }
      }  

 }
