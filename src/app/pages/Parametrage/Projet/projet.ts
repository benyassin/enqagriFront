import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';

import { FormService }  from '../../../services/form.service'
import { PerimetreService } from '../../../services/perimetre.service'
import { ProjetService } from '../../../services/projet.service'
import { UserService } from '../../../services/user.service'
import { Select2OptionData } from 'ng2-select2'
import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import { Router} from '@angular/router'
import { take } from 'rxjs/operator/take';
import * as _ from 'lodash';
import { keyframes } from '@angular/animations/src/animation_metadata';


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
    updating;
    advanced = false;
    _name;
    _agent;
  // public options: Select2Options;
  // public valueRegion: string[];
  // public valueProvince: string[];
  // public current: string;
    error : String;
    lock = false;
    __region
    @ViewChild('slider') input:ElementRef;
    validation : Object = {};
    addLevel(alias,agent,region){
        console.log('validation ==== ')
        console.log(this.validation)
        if(!alias){
            this.error = "Alias est obligatoire"
        }else{
            let r = region
            if(!this.validation[r]){
                this.validation[r] = []
            }
        if(this.validation[region].length < this._niveau && !this.agentExists(agent,region)){

        let index = this.controllers.findIndex(x => x.id==agent);
            this.validation[region].push({"alias":alias,'agent':this.controllers[index].id,'name':this.controllers[index].name});
        }
        this.error = ""
    }
    console.log(this.validation)
    this._name = "";
    this._agent = ""
    }



    test(){
        this.lock = !this.lock

    }
    _niveau = 0
    public incCount() {
        if (this._niveau < 5){
            this._niveau += 1;
        }
    }
    public decCount(){
        if(this._niveau > 0 || this.validation[Object.keys(this.validation)[0]].lenght < this._niveau){
        this._niveau -= 1;
        Object.keys(this.validation).forEach(key =>{
            this.validation[key].splice(this._niveau,5)
        })
        }
    }

    // clearLast(event){
    //     console.log(event)
    //
    // }

    removeLevel(key,region){
        this.projet.validation[region].splice(key,1)
    }
    updatinglevel : any = null
    setLevel(i,region){
        this.updatinglevel = i
        this._name = this.validation[region][i].alias
        this._agent = this.validation[region][i].agent
    }
    updateLevel(alias,agent,region){
        if(!alias){
            this.error = "Alias est obligatoire"
        }else{
        let index = this.controllers.findIndex(x => x.id==agent)
        this.validation[region][this.updatinglevel].alias = alias
        this.validation[region][this.updatinglevel].agent = this.controllers[index].id
        this.validation[region][this.updatinglevel].name = this.controllers[index].name
        this.updatinglevel = null
        this.error = ""
        }      
    }
    agentExists(id,region) {
        if(this.validation[region] != null){
       return this.validation[region].some(function(el) {
          return el.agent === id;
        });
    }
      }
    getControllers(id){
        this.controllers = [];
        this.userservice.getControlleursByRegion(id).then((data : any)=> {
            data.forEach(element => {
                this.controllers.push({'name':element.nom + ' ' + element.prenom,'id':element._id})
            });
        },(err)=>{
            console.log('fetch controllers',err)
        } )
    }
    CollectionList
    getCollection(){
        this.perimetreservice.getCollection().then( (data: any) =>{
            this.CollectionList = data
        })
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
    Support : any = [];
    compareFn(c1,c2){
        return c1 && c2 ? c1.id === c2.id : c1 === c2
    }
    onCollectionChange(cid){
        if(cid == undefined){
            return
        }
        this.Support = [];
        this.perimetreservice.getSupportKeys(cid._id).then((data) =>{
            this.Support = data
        },(err) =>{
            console.log(err)
        })
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
        let regions = [];
        for(let key in data){
            regions.push({'id': data[key].id_region,'itemName': data[key].name,'_id':data[key]._id})
        }
        this.list_regions = regions;
        let array :any  = [];
        if(this.projet['perimetre']){
        this.projet['perimetre'].region.forEach(element => {
            let object = {'id': element.id_region,'itemName': element.name,'_id':element._id}
            array.push(object)
            this.OnRegionChange(object)
        });
        }
        this.projet.regions = array
    }, (err) => {
      console.log("can't retreive regions ");
      console.log(err)
    });
    }
    _listprovinces = [];
    OnRegionChange(region){
        if(Array.isArray(region)){
            this._listprovinces = this.list_provinces
        }else{
            console.log(this.list_provinces);
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
            this._listprovinces = [];
            this.projet.provinces = []
        }else{
            let provinces = this._listprovinces.filter(function(el){
                return el.id_region !== region.id
            });
            console.log(this.projet.provinces);
            let _provinces = this.projet.provinces.filter(function(el){
                return el.id_region !== region.id
            });
            this.projet.provinces = _provinces;
            console.log(this.projet.provinces);
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
                    array.push({'id': element.id_province, 'itemName': element.name, 'id_region': element.id_region, '_id': element._id})
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
        if(to.length == 1){
            this.onFormSelect(item.id_fields)
            this.formulaire = item.id_fields
        }
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
            if (idx != -1) {
            from.splice(idx,1)
            this.extrapolation.splice(idx, 1);
            let idy = this.disabled.indexOf(item.geometry);
            this.disabled.splice(idy, 1);
            this.extrapolation = []
        }
        }
        let re = this.table.filter(function(element){
            return element.form != item.id_fields
        })
        if(from.length == 1){
            this.onFormSelect(item.id_fields)
            this.formulaire = item.id_fields
        }
        this.table = re
}
    table = [];

    add(key,label,form,api1,op,api2){
        if((this.apiKey == null || this.apiKey == "") && this.advanced == false  || label == null || this.label == "" ){
            return
        }
        if((api1 == null || api2 == null || op == null) && this.advanced == true){
            return
        } 
        console.log('here')
        if(this.table.findIndex(x => x.label==label) == -1){
        let v = this.extrapolation.find(x => x.key==key)
        console.log(v)
        let formule = null
        let type  = 'extra'
        switch (this.fieldtype) {
            case 'number':
                type = 'extra'
                break;
            case 'other':
                type = 'filtre'
                break;
            default:
                break;
        }
        if(op){
            formule = {operateur : op,variables:[api1,api2]}
            type = 'cal'
        }
        console.log('form',form)
        this.table.push({'field':v,'label':label,'form':form,'formule':formule,'type':type});
        this.apiKey = ""
        this.label = ""
        this.apikey1 = null
        this.apikey2 = null
        this.operateur = null
        this.advanced = false
        console.log(this.table)
    }
    }
    remove(index){
        this.table.splice(index,1);
        console.log('element deleted')
    }
    apikey1
    apikey2
    operateur
    formulaire
    update(index){ 
        this.updating = index;
      let data = this.table[index];
      this.label = data.label;
      this.advanced = false
      this.formulaire = data.form
      this.onFormSelect(data.form)
      if(data.type == 'cal'){
          this.advanced = true
          this.apikey1 = data.formule.variables[0]
          this.operateur = data.formule.operateur
          this.apikey2 = data.formule.variables[1]
      }else{
        this.apiKey = data.field.key;
      }

        
    }
    set(key,label,form,api1,op,api2){
        if((this.apiKey == null || this.apiKey == "") && this.advanced == false || this.label == null  || this.label == "" ){
            return
        }
        if((api1 == null || api2 == null  || op == null) && this.advanced == true){
            return
        } 
        console.log('here')
        if(this.table.findIndex(x => x.label==label) == this.updating || this.table.findIndex(x => x.label==label) == -1){
            let v = this.extrapolation.find(x => x.key==key)
        let row = this.table[this.updating]
        row.field = v
        row.label = label
        row.form = form

        if(this.advanced == true){
            if(api1 == null || api2 == null || op == null){
                return
            } 
            console.log('row')
            console.log(row)
            row.formule.variables[0] = api1
            row.formule.variables[1] = api2
            row.formule.operateur = op
            console.log(row)
            this.advanced = false
        }
        this.updating = null
        this.apiKey = ""
        this.label = ""
        this.apikey1 = null
        this.apikey2 = null
        this.operateur = null
        }

    }
    cancel(status){
        this.apiKey = ""
        this.label = ""
        if(status){
        this.updating = null
        }
        else{
            this.updatinglevel = null
        }

    }
    advance(){
        this.advanced = !this.advanced
        this.apikey1 = null;
        this.apikey2 = null;
        this.operateur = null
    }
    onFormSelect(form){
        console.log(form);
        this.apiKey = null;
        if(form){
            this.formservice.getExtrapolation(form).then((data :any) => {
                console.log('fields loaded correctly')
                console.log(data.length)
                if(data.length > 0){
                    this.extrapolation = data

                    console.log('fields loaded correctly')
                }

            })
        }
    }
    fieldtype
    contains(key,value){
        let types = ['select','checkbox','radio','selectboxes']
        let types2 = ['number','textfield']
        if(this.fieldtype == 'other' && !types.includes(value.type)){
            return true
        }else if(this.fieldtype == 'number' && !types2.includes(value.type)){
            return true
        }else{
        let isThere =  this.table.some(function(element) {
            if(element.type == 'extra' || element.type == 'filtre'){
            return element[key].key == value.key
            }
            });
        return isThere
        }
        // if(this.fieldtype == 'number' && value.type !== 'number'){
        //     return true
        // }


    }
    extrapolation : any = [];

    createProjet() {
        if(this.projet.name == '' || this.projet.theme == undefined || this.projet.name == undefined){
            this.msgs.push({severity:'error', summary:'Error', detail:"Champs 'Nom' et 'Type' sont obligatoire"});
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            return
        }
        if(this.projet.cid !== undefined && this.projet.cid !== null && this.forms_selected.length > 0  && this.projet.cid.type == 'spatial' && this.forms_selected[0].geometry == 'none'){
            this.msgs = [];
            this.msgs.push({severity:'error', summary:'Error', detail:"Pas possible d'avoir un support spatial dans une enquête uniquement sans géométrie"});
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            return
        }
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

                this.projet.validation = this.validation;
                this.projet.niveau = this._niveau;
                this.projetservice.createProjet(this.projet).then((data) => {
                    console.log('projet created')
                    console.log(data)
                    this.router.navigate(['Parametrage/Parametrage']);
                    localStorage.removeItem('storage')
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
        this.projet = {};
        this.forms_selected = [];
        this.table = [];
        this.projet.validation = [];
        this.label = "";
        this.extrapolation = [];
        this.disabled = [];
        this._name = "";
        this._agent = "";
        this.forms_disponnible = [];
        this.advanced = false;
        this.apikey1 = null;
        this.apikey2 = null;
        this.operateur = null;
        this.validation = {};
        this._niveau = 0
    }

    moveAll(from,to){
        for(let index in from){
            to.push(from[index])
        }
    }

    themes:Array<Object> = [
        {name:"Annuelle", value:"annuelle"},
        {name:"Modulaire", value:"modulaire"},
        {name:"RNA", value:"rna"},
    ];
//
//     changed(data: {value: string[]}) {
//         console.log(data.value)
//         this.current = data.value.join(' | ');
//     }

    editable :boolean = false
    ngOnInit () {
        // window.dispatchEvent(new CustomEvent('form-slider-switcher-ready'));
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        this.updating = null;
    this.RegionSettings = {
            singleSelection: false,
            text:"Regions",
            selectAllText:'Tout sélectionner',
            unSelectAllText:'Tout désélectionner',
            enableSearchFilter: true,
            searchPlaceholderText:'Rechercher',
            badgeShowLimit:10,
            disabled:false

    };
    this.ProvinceSettings = {
        singleSelection: false,
        text:"Provinces",
        selectAllText:'Tout sélectionner',
        unSelectAllText:'Tout désélectionner',
        enableSearchFilter: true,
        searchPlaceholderText:'Rechercher',
        badgeShowLimit:10,
        disabled:false
    }





    this.getCollection();

    console.log(this.projetservice.Projet)
    if(this.projetservice.Projet !== null){
        this.projet = this.projetservice.Projet ;
        this.onThemeChange(this.projet['theme']);
        this.onCollectionChange(this.projet.cid);
        this.forms_selected = this.projet['forms'] || [];
        this.table = this.projet['extrapolation']
        this.forms_selected.forEach(element => {
            this.disabled.push(element.geometry)
        });
        this.forms_selected.forEach(element => {
            // this.getfields(element)
        });
        if(this.projet !== null && this.projet.edit == false){
            this.RegionSettings['disabled'] = true;
            this.ProvinceSettings['disabled'] = true;
            this.editable = true
        }
        console.log('perimetre');
        console.log(this.projet.perimetre);
        console.log(this.projetservice.Projet);
        this.projet['provinces'] = this.projet['perimetre'].province
    }else{
        this.projet.validation = {}
    }
    this.getProvinces();
    this.getRegions();
    this.validation = this.projet.validation || {};
    this._niveau = this.projet.niveau || 0
    }
  
}