import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client';
import * as url from 'url';



@Injectable()

export class CollecteService {
    constructor(
    private http:HttpClient
    ){}
collecte : any = null
getCollecte(id,geometry=true){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/' + id+'?geometry='+geometry)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}
getCollectes(){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/')
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

getMapCollectes(request,projet){
    let path = 'collectes/serverside/test/'+ projet;
    const requestURL =  url.format({
        pathname: path,
        query: request
    });
        return new Promise((resolve, reject) =>{
            this.http.get(requestURL)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        })
}

getCollectesByProjet(id,niveau,status,region,province,commune){
    if(typeof region == "undefined" || region == null){
        region = 0
    }
    if(typeof province == "undefined" || province == null){
        province = 0
    }
    if(typeof commune == "undefined" || commune == null){
        commune = 0
    }
    return new Promise((resolve, reject) => {
        this.http.get('collectes/projet/' + id + '?niveau=' + niveau + "&status=" + status + "&region=" + region + "&province=" +province +"&commune=" + commune)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

getCollecteEnTraitement(id,index,region,province,commune){
    if(typeof region == "undefined" || region == null){
        region = 0
    }
    if(typeof province == "undefined" || province == null){
        province = 0
    }
    if(typeof commune == "undefined" || commune == null){
        commune = 0
    }
    return new Promise((resolve, reject) => {
        this.http.get('collectes/traitement/'+ id + "?region=" + region + "&province=" +province + "&index=" + index +"&commune=" + commune)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });

}

action(data){
		return new Promise((resolve, reject) => {
			this.http.post('collectes/validate', JSON.stringify(data))
				.map(res => res.json())
				.subscribe(res => {
					resolve(res);
				},(err:Response) => {
					let details = err.json()
					reject(details); 
				});
	
		});
}

updateCollecte(data){
    return new Promise((resolve, reject) => {
        this.http.post('collectes/update',JSON.stringify(data))
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            },(err:Response) => {
                let details = err.json()
                reject(details); 
            });
    });
}



getSegment(id){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/segment/' + id)
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}
getVoisin(projet,support,collectid){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/voisin/?pid=' + projet + '&sid=' + support + '&cid='+collectid )
            .map(res => res.json())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}

deleteCollecte(id){
        return new Promise((resolve, reject) => {
            this.http.delete('collectes/'+id)
                .map(res => res.json())
                .subscribe(data => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
        });

    }

exportData(id,query){
    let path = 'collectes/export/'+ id;
    const requestURL =  url.format({
        pathname: path,
        query: query
    });
    return new Promise((resolve, reject) => {
        this.http.getBlob(requestURL)
            .map(res => res.blob())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}
getSupportByCommune(id,cid){
    let path = 'collectes/segcomm/'+ id;
    const requestURL =  url.format({
        pathname: path,
        query:{
            cid:cid
        }
    });
    return new Promise((resolve, reject) => {
        this.http.get(requestURL)
            .map(res => res.json())
            .subscribe(res => {
                resolve(res);
            },(err:Response) => {
                let details = err.json();
                reject(details);
            });
    });
}
exportGeo(id,query){
    let path = 'collectes/exportgeo/'+ id;
    const requestURL =  url.format({
        pathname: path,
        query: query
    });
    return new Promise((resolve, reject) => {
        this.http.getBlob(requestURL)
            .map(res => res.blob())
            .subscribe(data => {
                resolve(data);
            }, (err) => {
                reject(err);
            });
    });
}
}

