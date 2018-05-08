import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ServerService {
    constructor(public http: Http){}
    storeServers(servers: any[]){
      const headers = new Headers({ 'Content-Type':'application/json'}) //  this one is optional by                                                                              default its  take headers
    //   return  this.http.post('https://httptest-d2108.firebaseio.com/new-data.json', 
    //   servers, {headers: headers});
    return  this.http.put('https://httptest-d2108.firebaseio.com/new-data.json', 
      servers, {headers: headers});
    }

    getServers() {
        return this.http.get('https://httptest-d2108.firebaseio.com/new-data.json')
        .map(
            (result: Response) => {
                const data = result.json();
                for(const myServers of data){
                    myServers.name = 'FETCHED_' + myServers.name;
                }
                return data;
            }
        )
        .catch(
            (err: Response) => {
                console.log('Something Went Wrong!!')
                return Observable.throw(err)
            }
        )
    }
}