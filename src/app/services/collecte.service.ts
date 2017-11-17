import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpClient } from './Http-client';




@Injectable()

export class CollecteService {
    constructor(
    private http:HttpClient
    ){}
collecte : any = null
getCollecte(id){
    return new Promise((resolve, reject) => {
        this.http.get('collectes/' + id)
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

createCollecte(){
    return new Promise((resolve, reject) => {

        this.http.post('collectes/', JSON.stringify(this.data),)
            .map(res => res.json())
            .subscribe(res => {
                resolve(res);
            },(err:Response) => {
                let details = err.json()
                reject(details); 
            });

    });
}

data : any = {
	"projet": "59edb8aa25c41403e8eee1f1",
	"id_exploitation": "59edb8aa25c41403e8eee1f1",
	"collecte": [{
		"type": "point",
		"form": "_ccom7uaps",
		"formname": "plantation",
		"data": [{
			"numero": 1,
			"shape": "POINT(611926.9882354921 3274197.218054936)",
			"gjson": {
				"type": "Point",
				"coordinates": [-7.84423828125, 29.592565403314087]
			},
			"date_creation": "2017-11-01 16:57:40",
			"formdata": {
				"data": {
					"undefinedPp": "pt1"
				}
			}
		}, {
			"numero": 2,
			"shape": "POINT(392312.00969663303 3227477.1469472)",
			"gjson": {
				"type": "Point",
				"coordinates": [-10.107421874999998, 29.171348850951507]
			},
			"date_creation": "2017-11-01 16:57:43",
			"formdata": {
				"data": {
					"undefinedPp": "pt2"
				}
			}
		}]
	}, {
		"type": "polygone",
		"form": "_vvnypgwux",
		"formname": "piste",
		"data": [{
			"numero": 1,
			"shape": "LINESTRING(632084.1462638101 3187263.4475999326,488381.4964660639 3145919.0157237523,400001.1218790745 3127055.295374434)",
			"gjson": {
				"type": "LineString",
				"coordinates": [
					[-7.646484374999999, 28.806173508854776],
					[-9.11865234375, 28.43971381702788],
					[-10.01953125, 28.265682390146477]
				]
			},
			"date_creation": "2017-11-01 16:57:47",
			"formdata": {
				"data": {
					"undefinedNom": "line1"
				}
			}
		}, {
			"numero": 2,
			"shape": "LINESTRING(730103.2875573016 3220773.3417440252,740808.9276769548 3116195.8342841864,688350.0707930368 3018235.2713342193,631284.6384780013 3065010.3435514257)",
			"gjson": {
				"type": "LineString",
				"coordinates": [
					[-6.6357421875, 29.094577077511826],
					[-6.5478515625, 28.14950321154457],
					[-7.09716796875, 27.27416111737468],
					[-7.66845703125, 27.702983735525862]
				]
			},
			"date_creation": "2017-11-01 16:57:50",
			"formdata": {
				"data": {
					"undefinedNom": "line2"
				}
			}
		}, {
			"numero": 3,
			"shape": "LINESTRING(551766.0994042372 3395882.669527719,678488.6806765874 3369971.354752976,732005.4947697201 3335209.1463102642)",
			"gjson": {
				"type": "LineString",
				"coordinates": [
					[-8.459472656249998, 30.694611546632277],
					[-7.14111328125, 30.44867367928756],
					[-6.591796875, 30.12612436422458]
				]
			},
			"date_creation": "2017-11-01 16:57:52",
			"formdata": {
				"data": {
					"undefinedNom": "line3"
				}
			}
		}]
	}]
}
}