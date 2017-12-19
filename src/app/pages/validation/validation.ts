import { Component, AfterViewInit, ChangeDetectionStrategy, ViewChild, ElementRef, Inject, Optional, Renderer } from '@angular/core';
import { CollecteService } from '../../services/collecte.service'
import { Router } from '@angular/router';
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import * as _ from "lodash";
// import * as L from 'leaflet';
declare const L:any
import 'leaflet-draw';
import 'leaflet-fullscreen'
import * as moment from 'moment'

// import * as Draw from 'leaflet-draw'
@Component({
    selector: 'Validation',
    templateUrl: './validation.html',
    styleUrls: ['./validation.css']
})


export class ValidationPage implements AfterViewInit  {
  data: any;
    constructor(
      private collecteservice:CollecteService,
      private router:Router
    ){}
    collecte : any
    _parcelle : any = ''
    _type : any = 0
    url : any
    Parcelles : any = []
    ExploitationMap
    ParcelleMap
    parcelleLayers
    selectedParcelle
    markers = new L.LayerGroup();
    drawnItems = new L.FeatureGroup()
    
    selected
    hidden = false
    
    validation
    user
    lenght
    index

    form
    selectedindex
    selectedformindex
    tester
    action(action){
      let update : any = {}
      update.niveau  = this.index;      
      update.action = action;
      update.id = this.collecte._id

      console.log(update)
      this.collecteservice.action(update).then((data) => {
        this.router.navigate(['collectes/'])
        
          console.log(data)
      })
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
    
    @ViewChild('iframe') iframe: ElementRef;
    @ViewChild('parcelle') parcelle: ElementRef;
    
      receiveMessage: EventListener;
      private renderer: Renderer;
      
      private isInited: boolean;
    
    debug(){
      console.log(this.collecte.collecte)
    }
    OnParcelleChange(){
      console.log(this._parcelle)
      console.log(this.collecte.collecte[this._type])
      let query = this.collecte.collecte[this._type].form
      this.form = 'http://localhost:8080/api/forms/'+ query +'/fields'
      // this.collecte.collecte[this.selectedformindex].data[index].date_creation = moment(new Date(this.collecte.collecte[this.selectedformindex].data[index].date_creation)).format("DD.MM.YYYY à h:mm")
      // this.selectedParcelle = this.collecte.collecte[this._type].data[this._parcelle]
       // this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":parcelle.formdata}, 'http://localhost/demo.html')
      // this.parcelleLayers.redraw()
      this.drawnItems.clearLayers()
      this.markers.clearLayers()
      // this.loadMapData()
      // this.parcelleLayers.addData(this.Parcelles)
      // this.parcelleLayers.addData(this.Parcelles,{style: function(element){
      //   if(element.properties.numero == parcelle.numero) {
      //     return {"color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65};
      // }}})
    }
    OnTypeChange(data){
      this.selectedformindex = data
      this.selected = this.collecte.collecte[data]
      let query = this.collecte.collecte[data].form
      this.form = 'http://localhost:8080/api/forms/'+ query +'/fields'
      // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
      this.hidden = false
      this.clear()
      this.loadMapData()
    }

    onSubmit(data){
      delete data.data['submit']
      console.log(data)
      this.collecte.collecte[this._type].data[this._parcelle].formdata = data
      console.log(this.collecte.collecte[this._type].data[this._parcelle].formdata)
      // console.log(this.collecte.collecte[this._type].data[this._parcelle])
    }

    getData(){
      this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'submit'}, 'http://localhost/demo.html')
    }

    clear(){
      this.drawnItems.clearLayers()
      this.markers.clearLayers()
    }
    loadMapData(){
      let Parcelles = []
      this.collecte.collecte[this._type].data.forEach(element => {
        Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
      });
      let that = this
      
      this.parcelleLayers = new L.GeoJSON(Parcelles,{onEachFeature: onEachFeature,style: function(element){
      //   if(that.collecte.collecte[this._type].data[this._parcelle] && element.properties.numero == that.collecte.collecte[this._type].data[this._parcelle]['numero']) {
      //     return {"color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65};
      // }
      }})

      // markers
      function onEachFeature(feature, layer) {
        let type = that.collecte.collecte[that._type].type
        var center
        // console.log(layer)
        // console.log(feature)
        if(type !== 'point'){
          center = layer.getBounds().getCenter();
          
          var labelPoint = L.marker([center.lat, center.lng], {
            icon: L.divIcon({
                  className: "labelPoint",
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
          if(feature.properties.numero == that.collecte.collecte[this._type].data[this._parcelle].numero){
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
        this.drawnItems.addTo(this.ParcelleMap)   

        this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())

    }
    ngOnInit(){
      //init map

        console.log(this.collecteservice.collecte)

        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte
        }else{
          this.router.navigate(['collectes/'])
        }
        // let query = this.collecte.exploitation.form
        // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
        this.validation = this.collecte.validation
        this.user = JSON.parse(localStorage.getItem('user'))
        this.lenght = this.collecte.projet.validation.lenght
        this.index = this.collecte.projet.validation.findIndex(x => x.agent==this.user._id)  
    

        this.receiveMessage = (event: MessageEvent) => {
            if(event.origin != 'http://localhost' ){
                return
            }
            if(event.data.window == 'exploitation' && event.data.message === 'loaded'){
              event.source.postMessage({"window":event.data.window,"message":'data',"data":this.collecte.exploitation.data}, event.origin)
            }
          };
    }
    ngOnDestroy() {
        window.removeEventListener('message', this.receiveMessage);
      }
    ngAfterViewInit() {

        this.isInited = true;


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
        this.ParcelleMap = new L.Map('map').setView([51.505, -0.09], 13);
        let CustomMarker = L.Icon.extend({
          options: {
              iconAnchor: new L.Point(12, 12),
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: null
          }
      });   
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.ParcelleMap);
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
                 marker: {
                  icon: new CustomMarker()
                },
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
    //     this.markers.addTo(this.ParcelleMap);    
    //     drawnItems.addLayer(this.parcelleLayers)
    //     this.drawnItems.addTo(this.ParcelleMap)   
      var Fullscreen = new L.Control.Fullscreen()

        this.ParcelleMap.addControl(Fullscreen)
        this.ParcelleMap.addControl(drawControl)
    //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
      let that = this
        this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
          var type = e.layerType,
              layer = e.layer
              that.drawnItems.addLayer(layer)
            });
      }

    onIframeLoad(element) {
        if (this.isInited) {
            window.addEventListener('message', this.receiveMessage, false);
        }
      }  

 }
