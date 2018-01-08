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
  ) {
      this.projet.validation = []
      this.projet.regions = []
   }

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
    ProvinceSettings : any =  {};
    controllers = [];
    apiKey;
    label;
    updating
    _name
    _agent
  // public options: Select2Options;
  // public valueRegion: string[];
  // public valueProvince: string[];
  // public current: string;
    error : String 
    addLevel(alias,agent){
        if(!alias){
            this.error = "Alias est obligatoire"
        }else{
        if(this.projet.validation.length < 5 && !this.agentExists(agent)){
        let index = this.controllers.findIndex(x => x.id==agent)
            this.projet.validation.push({"alias":alias,'agent':this.controllers[index].id,'name':this.controllers[index].name})
        }

    }
    this._name = ""
    this._agent = ""
    }
    removeLevel(key){
        this.projet.validation.splice(key,1)
    }
    updatinglevel : any = null
    setLevel(i){
        this.updatinglevel = i
        this._name = this.projet.validation[i].alias
        this._agent = this.projet.validation[i].agent
    }
    updateLevel(alias,agent){
        let index = this.controllers.findIndex(x => x.id==agent)
        this.projet.validation[this.updatinglevel].alias = alias
        this.projet.validation[this.updatinglevel].agent = this.controllers[index].id
        this.projet.validation[this.updatinglevel].name = this.controllers[index].name
        this.updatinglevel = null
    }      

    agentExists(id) {
        if(this.projet.validation != null){
       return this.projet.validation.some(function(el) {
          return el.agent === id;
        });
    }
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
    //     let that = this;
    //     let thisregions = this.projet['regions'];
    //     let region = [];
    //     let count = 0
    //     for(let i = 0;i < thisregions.length;i++){
    //         let id = thisregions[i].id.split('|').shift();
    //         this.perimetreservice.getProvinces(id).then((data) => {
    //             for(var key in data) {
    //                 region.push({'id': data[key]._id, 'itemName': data[key].name})
    //             }
    //             count++
    //         if (count > thisregions.length - 1) done();
    //         })
    //     }
    //     function done(){
    //        console.log(region),
    //        console.log('done here');
    //         that.list_provinces = region
    //    }
    }

    getRegions(){
    this.perimetreservice.getRegions().then((data) => {
        let regions = []
        for(var key in data){
            regions.push({'id': data[key].id_region,'itemName': data[key].name,'_id':data[key]._id})
        }
        this.list_regions = regions
        console.log(regions)
        let array :any  = []
        this.projet['perimetre'].region.forEach(element => {
            let object = {'id': element.id_region,'itemName': element.name,'_id':element._id}
            array.push(object)
            this.OnRegionChange(object)
        });
        this.projet.regions = array
    }, (err) => {
      console.log("can't retreive regions ");
    });
    }
    _listprovinces = []
    OnRegionChange(region){
        if(Array.isArray(region)){
            this._listprovinces = this.list_provinces
        }else{
        this.list_provinces.forEach(element => {
            if(element.id_region == region.id){
                this._listprovinces.push(element)
            }
        });

    }
      console.log(this._listprovinces)
    }
    OnRegionDeselect(region){
        if(Array.isArray(region)){
            this._listprovinces = []
            this.projet.provinces = []
        }else{
            let provinces = this._listprovinces.filter(function(el){
                return el.id_region !== region.id
            })
            console.log(this.projet.provinces)
            let _provinces = this.projet.provinces.filter(function(el){
                return el.id_region !== region.id
            })
            this.projet.provinces = _provinces;
            console.log(this.projet.provinces)        
            this._listprovinces = provinces;
        }
    }
    getProvinces(){
        this.perimetreservice.getProvinces(0).then((data : any) => {
            let provinces = []
            data.forEach(element => {
                provinces.push({'id':element.id_province,'itemName':element.name,'id_region':element.id_region,'_id':element._id})
            });
            this.list_provinces = provinces

            let array :any  = []
            this.projet['perimetre'].province.forEach(element => {
                array.push({'id':element.id_province,'itemName':element.name,'id_region':element.id_region,'_id':element._id})
            });
            this.projet.provinces = array
        })
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
        this.disabled.push(item.geometry);
        this.forms = []
    }
    
    }
    removeitem(item,from,to) {
        let idx = from.indexOf(item);
        if(this.projet.theme == item.theme){
        if (idx != -1) {
            from.splice(idx, 1);
            this.extrapolation.splice(idx, 1);
            to.push(item);
            let idy = this.disabled.indexOf(item.geometry);
            this.disabled.splice(idy, 1);
            this.selected = []
            this.extrapolation = []    
        }

        }else{
            from.splice(idx,1)
            this.extrapolation.splice(idx, 1);
            this.extrapolation = []
        }
        let re = this.table.filter(function(element){
            return element.form != item.id_fields
        })
        
        this.table = re
}
    table = [];

    add(key,label,form){
        if(key == null || label == null || this.label == "" ){
            return
        }
        if(this.table.findIndex(x => x.label==label) == -1){
        
        let v = this.extrapolation.find(x => x.key==key)
        console.log(v)

        this.table.push({'field':v,'label':label,'form':form.id_fields});
        this.apiKey = ""
        this.label = ""
        console.log(this.table)
    }
    }
    remove(index){
        this.table.splice(index,1);
        console.log('element deleted')
    }
    update(index){
        this.updating = index;
      let data = this.table[index];
      this.apiKey = data.field.key;
      this.label = data.label;
        
    }
    set(key,label,form,data){
        if(this.apiKey == null || this.label == null || this.label == ""){
            return
        }
        if(this.table.findIndex(x => x.label==this.label) == -1){
            let v = this.extrapolation.find(x => x.key==key)
            console.log(v)
        this.table[this.updating] = {'field':v,'label':label,'form':form.id_fields};
        this.updating = null
        this.apiKey = ""
        this.label = ""
        }

    }
    cancel(status){
        if(status){
        this.updating = null
        }
        else{
            this.updatinglevel = null
        }

    }
    onFormSelect(form){
        console.log(form)
        if(form.id_fields){
            this.formservice.getExtrapolation(form.id_fields).then((data) => {
                this.extrapolation = data
                console.log('fields loaded correctly')
            })
        }

    }
    fieldtype
    contains(key,value){
        let types = ['select','checkbox','radio','selectboxes']
        if(this.fieldtype == 'other' && !types.includes(value.type)){
            return true
        }else if(this.fieldtype == 'number' && value.type != this.fieldtype){
            return true
        }else{
        var isThere =  this.table.some(function(element) {
            return element[key].key == value.key
            });
        return isThere
        }
        // if(this.fieldtype == 'number' && value.type !== 'number'){
        //     return true
        // }


    }
    extrapolation : any = [];
    getfields(form){
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
                    return element._id
                });
                }
                if(this.projet['regions']){
                this.projet['region'] = this.projet['regions'].map(function (element) {
                    return element._id
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
        this.table = []
        this.projet.validation = []
        this.label = ""
        this.extrapolation = []
        this.disabled = []
        this._name = ""
        this._agent = ""
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
            enableSearchFilter: true,
            searchPlaceholderText:'Rechercher',
            badgeShowLimit:10,

    };
    this.ProvinceSettings = {
        singleSelection: false,
        text:"Provinces",
        selectAllText:'Tout sélectionner',
        unSelectAllText:'Tout désélectionner',
        enableSearchFilter: true,
        searchPlaceholderText:'Rechercher',
        badgeShowLimit:10
    }
    


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
            // this.getfields(element)
        });
        let array = []

        console.log('array')
        console.log(array)
        this.projet['provinces'] = this.projet['perimetre'].province
    }else{
        this.projet.validation = []
    }
    this.getProvinces();
    this.getRegions();



    }
  
}