import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Http } from '@angular/http';
import * as env from '../environments/environment';

@Injectable()
export class DriverService {

    constructor(
        private _http: Http,
    )
    {}

    getDrivers():Observable<any>{
        
        var data;
        return this._http.post(env.environment.url+'/VendorService/DriverDetails','').map((response)=>{
          return response.json()
        })
        
      }
      getDriver():Observable<any>{
        var data;
        //console.log(body);
        //console.log(body1);

        return this._http.post(env.environment.url+'/VendorService/DriverDetails','').map(response=>response.json()
        
      );
    }

      searchDriver(body){
        return this._http.post(env.environment.url+"/VendorService/SearchDriver",body).map((response)=>{
      return response.json()
    })
  }   

  deleteDriver(body){
    return this._http.post(env.environment.url+"/VendorService/DisableDriver",body).map((response)=>{
      return response.json()
    })
  }
  
  enableDriver(body){
    return this._http.post(env.environment.url+"/VendorService/EnableDriver",body).map((response)=>{
      return response.json();
    })
  }
  adddriver(body): Observable<any>{
    return this._http.post(env.environment.url+"/VendorService/AddDriver", body);
    }

  sendfile(file_upload): Observable<any>{
      return this._http.post(env.environment.url+"/VendorService/AddImage", file_upload);
      }  

      updatedriver(body){
        return this._http.post(env.environment.url+"/VendorService/UpdateDriver",body).map((response)=>{
          return response.json();
        })
      }
}