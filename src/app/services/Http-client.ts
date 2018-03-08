import { Injectable } from '@angular/core';
import { Http, Headers,ResponseContentType } from '@angular/http';

@Injectable()
export class HttpClient {
    token: string  

    constructor(private http: Http){
    }
    url = 'http://localhost:8080/api/';
    injectHeader(headers: Headers) {
        headers.append('Authorization',this.token || localStorage.getItem('token') );
    }

    get(endpoint) {
        let headers = new Headers();
        this.injectHeader(headers);
        return this.http.get(this.url + endpoint,{headers: headers});
    }

    getBlob(endpoint) {
        let headers = new Headers();
        this.injectHeader(headers);
        return this.http.get(this.url + endpoint,{headers: headers,responseType: ResponseContentType.Blob },);
    }


    getWithParams(endpoint,optional) {
        let headers = new Headers();
        this.injectHeader(headers);
        return this.http.get(this.url + endpoint,{params:optional,headers: headers});
    }
    post(endpoint, data) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.injectHeader(headers);
        return this.http.post(this.url + endpoint, data, {headers: headers});

    }

    delete(endpoint) {
        let headers = new Headers();
        this.injectHeader(headers);
        return this.http.delete(this.url + endpoint, {headers: headers})
    }
}