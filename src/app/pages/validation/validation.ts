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
    msgs : any = []
    collecte : any
    _parcelle : any = ''
    _type : any = ''
    url : any
    Parcelles : any = []
    ExploitationMap
    ParcelleMap
    parcelleLayers
    selectedParcelle
    markers = new L.LayerGroup();
    drawnItems = new L.FeatureGroup()
    selected
    hidden = true
    
    validation
    user
    lenght
    index
    rmessage
    testvar = null
    srcformio 
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
      private isInited: boolean;
    

    OnParcelleChange(parcelle :any){
      parcelle.date_creation = moment(new Date(parcelle.date_creation)).format("DD.MM.YYYY à h:mm");
      this.selectedParcelle = parcelle;
      // this.parcelle.nativeElement.contentWindow.postMessage({"window":"parcelle","message":'data',"data":parcelle.formdata}, 'http://localhost/demo.html');
      // this.parcelleLayers.redraw()
        this.hidden = false;
      this.drawnItems.clearLayers();
      this.markers.clearLayers();
      // this.loadMapData()
      // this.parcelleLayers.addData(this.Parcelles)
      // this.parcelleLayers.addData(this.Parcelles,{style: function(element){
      //   if(element.properties.numero == parcelle.numero) {
      //     return {"color": "#ff7800",
      //     "weight": 5,
      //     "opacity": 0.65};
      // }}})
      this.loadMapData()
    }
    OnTypeChange(data){
      this.srcformio = "http://localhost:8080/api/forms/"+data.form+"/fields"
      this.hidden = true;
      // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`);
    } 
    saveChange(){
      console.log(this.selectedParcelle.formdata)
      let cdata = {'id':this.collecte._id,data:this.selectedParcelle.formdata}
      this.collecteservice.updateCollecte(cdata).then((data) => {
        console.log(data)
      })
    }
    onSubmit(submission: any) {
      console.log('submission')
      console.log(submission.data)
      if(submission.data){
        this.selectedParcelle.formdata.data = submission.data
      }
      // this.selectedParcelle.formdata = submission.data
      console.log('selectedParcelle')
      console.log(this.selectedParcelle.formdata.data); // This will print out the full submission from Form.io API.
    }
    clear(){
      this.drawnItems.clearLayers()
      this.markers.clearLayers()
    }
    loadMapData(){
      let Parcelles = [];
      this._type.data.forEach(element => {
        Parcelles.push({"type": "Feature","properties":{"numero":element.numero},geometry:element.gjson})
      });
      let that = this;
      
      this.parcelleLayers = new L.GeoJSON(Parcelles,{onEachFeature: onEachFeature,style: function(element){
        if(element.properties.numero == that.selectedParcelle['numero'] || 1 ) {
          return {
            weight: 2,
            opacity: 0.4,
            color: 'black',
            dashArray: '3',
            fillOpacity: 0.6,
            fillColor: 'blue'
        };
      }
      }})

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
    ngOnInit(){
      //init map

        console.log(this.collecteservice.collecte);

        if(this.collecteservice.collecte !== null){
            this.collecte = this.collecteservice.collecte
        }else{
          this.router.navigate(['collectes/'])
        }
        this._type = this.collecte.collecte[0]
        this.srcformio="http://localhost:8080/api/forms/"+this._type.form+"/fields"

        // this.OnParcelleChange(this._type.data[0])
        
        // let query = this.collecte.exploitation.form
        // document.getElementById('data').setAttribute('src', `http://localhost/demo.html?myParam=${query}`)
        this.validation = this.collecte.validation
        this.user = JSON.parse(localStorage.getItem('user'))
        this.lenght = this.collecte.projet.validation.length
        this.index = this.collecte.projet.validation.findIndex(x => x.agent==this.user._id)  

        if(this.collecte.rmessage != null && this.validation[this.index] == 'reject'){
          this.msgs.push({severity:'error', summary:'message:', detail:this.collecte.rmessage});
        }
        
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
    this.ParcelleMap.pm.addControls(options)
      var Fullscreen = new L.Control.Fullscreen();
        this.ParcelleMap.addControl(Fullscreen);
    //     this.ParcelleMap.fitBounds(this.parcelleLayers.getBounds())
      this.AddParcelleLayer(this.collecte.collecte[0].data[0].id_segment)
      let that = this
        // this.ParcelleMap.on(L.Draw.Event.CREATED,function(e){
        //   var type = e.layerType,
        //       layer = e.layer
        //       that.drawnItems.addLayer(layer)
        //     });

        this._parcelle = this.collecte.collecte[0].data[0]
        this.OnParcelleChange(this.collecte.collecte[0].data[0])
    }

    AddParcelleLayer(id){
      console.info('id_segment ',id)
      this.collecteservice.getSegment(id).then((data : any ) => {
        let Parcelles = [];
        data.segment.parcelles.forEach(element => {
          Parcelles.push({"type": "Feature","properties":{"numero":element.id},geometry:element.geometry})
        });
        let styleP = {"color": 'red',
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
      let voisin = []
      let intersect = []
        data.voisin.forEach(element => {
          let e = element.collecte[0].data[0]
          if(this.collecte.collecte[0].data[0].numero != e.numero){
          voisin.push({"type":"Feature","properties":{"numero":e.numero},geometry:e.gjson})
          let _int = turf.intersect(this.collecte.collecte[0].data[0].gjson,e.gjson)
          if(_int){
            intersect.push(_int)
          }
        }
        });
        let _intersection = new L.GeoJSON(intersect,{style:styleI})
        _intersection.addTo(this.ParcelleMap)
        let _voisin = new L.GeoJSON(voisin,{style: styleV,pmIgnore: true })
        _voisin.addTo(this.ParcelleMap)
       let layer = new L.GeoJSON(Parcelles,{style: styleP,pmIgnore: true })
        layer.addTo(this.ParcelleMap)
        let aa = {"type": "Feature","properties":{"numero":data.segment.id},geometry:data.segment.geometry}
       let test = new L.GeoJSON(aa,{style:styleS,pmIgnore: true})
       test.addTo(this.ParcelleMap)

      let control =  L.control.layers({},{"segment":test,"parcelles":layer,"voisins":_voisin,"intersection":_intersection})
        control.addTo(this.ParcelleMap)
      })


    }

    ngOnDestroy() {

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