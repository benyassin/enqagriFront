import { Component, OnInit } from '@angular/core';

import { FormService }  from '../../../services/form.service'
import { PerimetreService } from '../../../services/perimetre.service'
import { ProjetService } from '../../../services/projet.service'
import { UserService } from '../../../services/user.service'
import { Select2OptionData } from 'ng2-select2'
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { Router} from '@angular/router'
import { take } from 'rxjs/operator/take';
import * as _ from 'lodash';

@Component({
  selector: 'projet',
  templateUrl: 'projet.html',
  styleUrls: ['./projet.css'],
})
export class ProjetPage implements OnInit  {
  constructor(
    private formservice:FormService,
    private perimetreservice:PerimetreService,
    private confirmationservice:ConfirmationService,
    private projetservice:ProjetService,
    private userservice:UserService,
    private router:Router
  ) {  }

 projet: any = {};
  msgs: any = [];
  forms_selected : any = [];
  forms_disponnible : any = [];
  forms  = [];
  selected = [];
  // provinces = []
    public list_regions = [];
    public list_provinces = [];
  // public ProvinceData = []
  // public exampleData = []
    dropdownList = [];
    selectedItems = [];
    RegionSettings = {};
    ProvinceSettings = {};
    controllers = [];
    apiKey;
    label;
    updating
  // public options: Select2Options;
  // public valueRegion: string[];
  // public valueProvince: string[];
  // public current: string;
    error : String 
    addLevel(name,agent){
        if(!name){
            this.error = "name est obligatoire"
        }else{
        if(this.projet.validation.length < 5 && !this.agentExists(agent)){
            this.projet.validation.push({"name":name,'agent':agent})
        }
    }
    }
    removeLevel(key){
        this.projet.validation.splice(key,1)
    }
    agentExists(id) {
        return this.projet.validation.some(function(el) {
          return el.agent === id;
        }); 
      }
    getControllers(){
        this.userservice.getControlleurs().then((data : any)=> {
            data.forEach(element => {
                this.controllers.push({'name':element.nom + ' ' + element.prenom,'id':element._id})
            });
        },(err)=>{
            console.log('fetch controllers',err)
        } )
    }

  onThemeChange(theme){
      this.formservice.getFormsByTheme(theme).then((data) => {
          this.forms_disponnible = data;
          // retiré les blocs déja selectionné pour la duplication et l'update
          for (var i = 0, len = this.forms_selected.length; i < len; i++) {
              for (var j = 0, len2 = this.forms_disponnible.length; j < len2; j++) {
                  if (this.forms_selected[i]._id === this.forms_disponnible[j]._id) {
                      this.forms_disponnible.splice(j, 1);
                      len2=this.forms_disponnible.length;
                  }
              }
          }
          console.log(this.forms_disponnible);
      },(err) => {
          console.log("can't retreive Forms ");
      });
   }
//    onProvinceChange(province){
//        this.projet['province'] = province.value
//    }
//    onRegionChange(region){
//        console.log
//        let that = this
//
//        let id_mongo = []
//        region.value.forEach(element => {
//             id_mongo.push(element.split('|').pop())
//        });
//        this.projet['region'] = id_mongo
//        let provinces = []
//        let count = 0
//        for(let i = 0;i < region.value.length;i++ ){
//          let id_region = region.value[i].split('|').shift()
//         this.perimetreservice.getProvinces(id_region).then((data) => {
//             let children = []
//             for(var key in data){
//                 children.push({id: data[key].id,text: data[key].name})
//             }
//             count++;
//             provinces.push({'id': id_region,'text': id_region,children: children})
//             if (count > region.value.length - 1) done();
//         }, (err) => {
//           console.info("can't retreive provinces ");
//         })
//        }
//
//        function done(){
//            console.log(provinces),
//            console.log('done here')
//             that.exampleData = provinces
//        }
//
//
// };
//
    onRegionSelect(){
        let that = this;
        let thisregions = this.projet['regions'];
        let region = [];
        let count = 0
        for(let i = 0;i < thisregions.length;i++){
            let id = thisregions[i].id.split('|').shift();
            this.perimetreservice.getProvinces(id).then((data) => {
                for(var key in data) {
                    region.push({'id': data[key]._id, 'itemName': data[key].name})
                }
                count++
            if (count > thisregions.length - 1) done();
            })
        }
        function done(){
           console.log(region),
           console.log('done here');
            that.list_provinces = region
       }
    }

    getRegions(){
    this.perimetreservice.getRegions().then((data) => {
        let regions = []
        for(var key in data){
            regions.push({'id': data[key].id_region + '|' + data[key].id,'itemName': data[key].name})
        }
        this.list_regions = regions
        console.log(regions)
    }, (err) => {
      console.log("can't retreive regions ");
    });
    }
    onItemSelect(item){
        console.log('Selected Item:');
        console.log(item);
    }
    OnItemDeSelect(item){
        console.log('De-Selected Item:');
        console.log(item);
    }
//     done(){
//
//     }

    // moveItem(items,from,to){    
    // for(let index in items){
    //     let idx=from.indexOf(items[index]);
    //     console.log(idx);
    //     if(idx != -1){
    //         from.splice(idx, 1);
    //         to.push(items[index])
    //         if(this.disabled.includes(items[index].geometry) && items[index].geometry !== 'none'){
    //             this.disabled = this.disabled.filter(item => item !== items[index].geometry)
    //             console.log(this.disabled)
    //         }else{
    //             this.disabled.push(items[index].geometry)
    //             console.log(this.disabled)
    //         }
    //     }
    // }
    // }
    disabled = [];
    move(item,from,to){
        
        let idx= from.indexOf(item);
        if(idx != -1){
        from.splice(idx, 1);
        to.push(item);
        this.getfields(item);
        this.disabled.push(item.geometry);
        this.forms = []
    }
    
    }
    removeitem(item,from,to) {
        let idx = from.indexOf(item);
        if (idx != -1) {

            from.splice(idx, 1);
            this.extrapolation.splice(idx, 1);
            to.push(item);
            let idy = this.disabled.indexOf(item.geometry);
            this.disabled.splice(idy, 1);
            this.selected = []

        }
    }
    table = [];
    add(key,label){
        // let test = _.find(this.extrapolation, _.flow(
        //     _.property('fields'),
        //     _.partialRight(_.some, { key: key.key })
        // ));
        // console.log('test',test);
        // console.log(this.extrapolation);
        // let index =key.split('|').shift();
        // let findex = key.split('|').pop();
        this.table.push({'key':key,'label':label});
        console.log('object added');
        console.log(this.table)
    }
    remove(index){
        this.table.splice(index,1);
        console.log('element deleted')
    }
    update(index){
        this.updating = index;
      let data = this.table[index];
      this.apiKey = data.key;
      this.label = data.label;
    }
    set(key,label){
        this.table[this.updating] = {'key':key,'label':label};
        this.updating = null
    }
    cancel(){
        this.updating = null
    }
    contains(key,value){
      var isThere =  this.table.some(function(element) {
            return element[key] == value
        });
      return isThere
    }
    extrapolation : any = [];
    getfields(form){
        if(form.id_fields){
            this.formservice.getExtrapolation(form.id_fields).then((data) => {
                this.extrapolation.push({label:form.name,fields:data});
                console.log('loaded correctly')
            })
        }

    }
    createProjet() {
        this.confirmationservice.confirm({
            message: "Voulez vous confirmer l'enregistrement ?",
            accept: () => {
                if(this.forms_selected){
                this.projet['forms'] = this.forms_selected.map(function (element) {
                    return element._id
                });
                }
                if(this.projet['provinces']){
                this.projet['province'] = this.projet['provinces'].map(function (element) {
                    return element.id
                });
                }
                if(this.projet['regions']){
                this.projet['region'] = this.projet['regions'].map(function (element) {
                    return element.id.split('|').pop();
                });
                }
                delete this.projet['provinces'];
                delete this.projet['regions'];
                delete this.projet['perimetre'];
                this.projet['extrapolation'] = this.table;
                this.projetservice.createProjet(this.projet).then((data) => {
                    console.log('projet created')
                    console.log(data)
                    this.router.navigate(['Parametrage/Parametrage'])
                }, (err) => {
                    this.msgs = [];                    
                    this.msgs.push({severity:'error', summary:'Error', detail:err.message});
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    console.log("can't create projet")
                    console.log(err)
                });
            }
        })
    }

    clearProjet(){
        this.projet = {}
        this.forms_selected = []
    }

    moveAll(from,to){
        for(let index in from){
            to.push(from[index])
        }
    }

    themes:Array<Object> = [
        {name:"Annuelle", value:"annuelle"},
        {name:"Modulaire", value:"modulaire"},
        {name:"Complémentaire", value:"complementaire"},
        {name:"RNA", value:"rna"},
    ];
//
//     changed(data: {value: string[]}) {
//         console.log(data.value)
//         this.current = data.value.join(' | ');
//     }
    ngOnInit () {
        this.updating = null;
    this.RegionSettings = {
            singleSelection: false,
            text:"Regions",
            selectAllText:'Tout sélectionner',
            unSelectAllText:'Tout désélectionner',
            enableSearchFilter: true
    };
    this.ProvinceSettings = {
        singleSelection: false,
        text:"Provinces",
        selectAllText:'Tout sélectionner',
        unSelectAllText:'Tout désélectionner',
        enableSearchFilter: true
    }
    

    this.getRegions();
    this.getControllers();
    // this.exampleData = []
    // this.regionsData = []
    // this.ProvinceData = []
    // this.options = {
    //     multiple: true
    //   }
    // this.valueRegion = ['Tanger-Tétouan-Al Hoceima']
    //
    console.log(this.projetservice.Projet)
    if(this.projetservice.Projet !== null){
        this.projet = this.projetservice.Projet ;
        this.onThemeChange(this.projet['theme']);
        this.forms_selected = this.projet['forms'] || [];
        this.table = this.projet['extrapolation']
        this.forms_selected.forEach(element => {
            this.disabled.push(element.geometry)
        });
        this.forms_selected.forEach(element => {
            this.getfields(element)
        });
        this.projet['regions'] = this.projet['perimetre'].region.map(function(element){
            return {'id': element.id_region+'|'+element._id,'itemName':element.name}
        })
        this.projet['provinces'] = this.projet['perimetre'].province.map(function(element){
            return {'id': element._id,'itemName':element.name}
        })
    }else{
        this.projet.validation = []
    }




    }
  
}