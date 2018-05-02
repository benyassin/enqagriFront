import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {PerimetreService } from '../../services/perimetre.service';
import { ReactiveFormsModule,
    FormsModule,
    FormGroup,
    FormControl,
    Validators,
    ValidationErrors,
    FormBuilder } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {LowerCaseTextDirective} from '../../lower-case-text.directive'


//TODO: validation // traitement du return 
// utiliser Splice pour actualiser la list des utilisateur (getUser,createUser,deleteUser )
//trouver une solution pour les array (region,province,commune et role)
@Component({
    moduleId: module.id,    
    selector: 'creation',
    templateUrl: './utilisateur.html',
    styleUrls: ['./utilisateur.css'],
})



export class CreationUtilisateurPage implements OnInit {
    constructor(public userService: UserService,private confirmationService: ConfirmationService,private perimetreService: PerimetreService,private router: Router){}

    myform: FormGroup;
    nom: FormControl;
    prenom: FormControl;
    email: FormControl;
    login: FormControl
    password: FormControl;
    confirmPassword: FormControl;
    role: FormControl;
    telephone: FormControl;
    region: FormControl;
    province: FormControl;
    dpa: FormControl;
    office: FormControl;

    users: any;
    user : any;
    model: any = {};
    msgs :any = [];
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('utilisateur-ready'));

        this.createFormControls();
        this.createForm();
        this.myform.get('role').valueChanges.subscribe(
            (role:string) =>{
                if(role !== 'admin' ){
                    if(role === 'superviseurR' || role === 'controleur'){
                    this.myform.get('province').clearValidators();
                    this.myform.get('region').setValidators([Validators.required]);
                    this.myform.patchValue({
                        province:null,
                    })
                    this.myform.get('region').enable();
                    this.myform.get('province').disable()                    
                    // this.myform.get('dpa').disable()
                    // this.myform.get('office').disable();
                    }else{
                    this.myform.get('region').setValidators([Validators.required]),
                    this.myform.get('province').setValidators([Validators.required])
                    this.myform.get('region').enable()
                    this.myform.get('province').enable()
                    // this.myform.get('dpa').enable()
                    // this.myform.get('office').enable();
                }
                this.loadregion()
                }else{
                    this.myform.get('province').clearValidators();
                    this.myform.get('region').clearValidators();
                    this.myform.get('province').disable()
                    this.myform.get('region').disable();
                    // this.myform.get('dpa').disable()
                    // this.myform.get('office').disable();
                    this.myform.patchValue({
                        region:null,
                        province:null,
                        // dpa:null,
                        // office:null
                    })
                }
                this.myform.get('region').updateValueAndValidity();
                this.myform.get('province').updateValueAndValidity();    
            }
            
        )
        if(this.userService.selectedUser !== null){
            let user: any = this.userService.selectedUser
            if(user.role != 'admin' && user.role != 'controleur'){
                this.onRegionChange(user.perimetre.region)
            }

            this.loadUser(user)
        }

    }

    

    createFormControls() {
        this.nom = new FormControl('', Validators.required);
        this.prenom = new FormControl('', Validators.required);
        this.email = new FormControl('', [
          Validators.required,
          Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        ]);
       this.password = new FormControl('', [
         Validators.required,
         Validators.minLength(8)
       ]);
        // this.password = new FormControl('');
        this.confirmPassword = new FormControl('',[
            Validators.required,
            Validators.minLength(8)
      ]);
        this.login = new FormControl('',[
            Validators.required,
            Validators.minLength(4)
        ]);
        this.telephone = new FormControl('',
            Validators.pattern("(0|\\+212|00212)[5-7][0-9]{8}")
        );
        this.role = new FormControl('',Validators.required);
        this.region = new FormControl({value:'',disabled: true});
        this.province = new FormControl({value:'',disabled: true});
        this.dpa = new FormControl({value:'',disabled: true});
        this.office = new FormControl({value:'',disabled: true});
        
        
    }
    createForm() {
        this.myform = new FormGroup({
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
        login: this.login,
        role: this.role,
        telephone:this.telephone,
        region: this.region,
        province: this.province,
        // dpa: this.dpa,
        // office: this.office
        }); 
    }
    


    
    loadUser(user){
        console.log(user)
        this.myform.patchValue({
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            login: user.login,
            password: user.plaintext,
            confirmPassword: user.plaintext,
            telephone: user.telephone,
            role: user.role,
            region: user.perimetre.region,
            province: user.perimetre.province,
            // dpa: user.perimetre.dpa,
            // office: user.perimetre.office
        })
        this.user = user._id
        this.myform.get('password').clearValidators();
        this.myform.get('confirmPassword').clearValidators();
        this.myform.get('password').setValidators([
            Validators.minLength(8)]),
        this.myform.get('password').updateValueAndValidity();
        this.myform.get('confirmPassword').updateValueAndValidity();

       // this.model = user;
       // this.model.region = user.perimetre.region;
       // this.model.commune = user.perimetre.commune;
       // this.model.province = user.perimetre.province;

      //  console.log(user)





    //    this.userService.getUser(id).then((data) => {
    //        this.model = data;
    //    this.msgs.push({severity:'info', summary:'Info Message', detail:'User information loaded loaded'});
            
    //  }, (err) => {
    //      console.log("err trying to fetch user " + err );
    //  });
        
    }
    createUser(){
        if(this.myform.valid){
            if(this.myform.value.password !== this.myform.value.confirmPassword){
                document.body.scrollTop = document.documentElement.scrollTop = 0;
                this.msgs = [];                
                this.msgs.push({severity:'error', summary:"Erreur", detail: "les deux passwords ne sont pas identiques" })
                return 
            }
            // if(this.myform.value.role == 'superviseurP' || this.myform.value.role == 'agent'){
            //     if(!this.myform.value.dpa && !this.myform.value.office){
            //         console.log(this.myform.value.role)
            //     document.body.scrollTop = document.documentElement.scrollTop = 0;
            //     this.msgs = [];                
            //     this.msgs.push({severity:'error', summary:"Erreur", detail: "Veuillez choisir au moins DPA ou OFFICE"})
            //     return 
            //     }
            // }
        this.confirmationService.confirm({
            message: "Voulez vous confirmer l'enregistrement ?",
            accept: () => {
                delete this.model.confirmPassword;
                console.log(this.myform.value)
                let data = this.myform.value;
                console.log(data)
                if(this.user) {
                    data._id = this.user;
                }
                if(!data.password || data.password == ""){
                    delete data.password
                }
                this.userService.createUser(data).then(() =>{
                    this.myform.reset();
                    this.msgs = [];                    
                    this.msgs.push({severity:'success', summary:"Success", detail:'Utilisateur a été crée avec succès  '});
               //     this.myform.get('password').setValidators([Validators.required,Validators.minLength(8)]),
               //     this.myform.get('confirmPassword').setValidators([Validators.required])  
               //     this.myform.get('password').updateValueAndValidity();
               //     this.myform.get('confirmPassword').updateValueAndValidity(); 
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                    this.user = null;
                    this.router.navigate(['utilisateur/'])
                },(err) => {
                    this.msgs = []; 
                    this.msgs.push({severity:'error', summary:"Error", detail:err.message});
                    console.log("err creating user");
                });
            }
        });
        
    }else{
        this.msgs = [];        
        this.msgs.push({severity:'error', summary:"Error", detail:'Veuillez remplir tous les champs obligatoires du formulaire! '});
        
    }
    function removeEmpty(obj) {
        Object.keys(obj).forEach(function(key) {
          (obj[key] && typeof obj[key] === 'object') && removeEmpty(obj[key]) ||
          (obj[key] === '' || obj[key] === null) && delete obj[key]
        });
        return obj;
      };
    }


    onSubmit() {
        if (this.myform.valid) {
          console.log("Form Submitted!");
        }
      }
    clearFields(){
        this.user = null;
        this.myform.reset()
    }
    loadregion(){
        if(!this.reg){
        this.perimetreService.getRegions().then((data) => {
                this.reg = data
        }, (err) => {
          console.log("can't retreive regions ");
        });
        // this.perimetreService.getDpaOffice().then((data) => {
        //     this.list_office = data['office']
        //     this.list_dpa = data['dpa']
        // }, (err) => {
        // console.log("can't retreive Office  & Dpa ");
        // }); 
        }else {
            console.log('already loaded region')
        }
    };
    onRegionChange(region){
        this.myform.patchValue({
            province:null,
        })
        console.log(region);
        this.perimetreService.getProvinces(region).then((data) => {
            this.prov = data;
        }, (err) => {
          console.log("can't retreive provinces ");
        });

    };
    reg: any
    prov: any
    list_dpa : any
    list_office : any
    comm:Array<Object> = [
        {value: 1,name:"commune 1"},
        {value: 2,name:"commune 2"},
        {value: 3,name:"commune 3"},
        {value: 4,name:"commune 4"}
    ];
    roles:Array<Object> = [
        {value:"admin",name:"Admin"},
        {value:"superviseurR",name:"Superviseur Regional"},
        {value:"superviseurP",name:"Superviseur Provincial"},
        {value:"controleur",name:"Contrôleur"},
        {value:"agent",name:"Agent de Collecte"},
    ];

}