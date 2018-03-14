import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Http } from '@angular/http';
import * as env from '../environments/environment';

@Injectable()
export class CabService {

    constructor(
        private _http: Http,
    )
    {}

    getCabs(body):Observable<any>{
        
        var data = body;
        console.log(JSON.stringify(data));
        return this._http.post(env.environment.url+'/VendorService/CabDetails',JSON.stringify(body)).map((response)=>{
          return response.json()
        })
        
      }
      searchCab(body){
        return this._http.post(env.environment.url+"/VendorService/SearchCab",body).map((response)=>{
      return response.json()
    })
  }

  deleteCab(body){
    return this._http.post(env.environment.url+"/VendorService/DisableCab",body).map((response)=>{
      return response.json()
    })
  }
  updateCab(body){
    return this._http.post(env.environment.url+"/VendorService/Updatecab",body).map((response)=>{
      return response.json();
    })
  }
  
  enableCab(body){
    return this._http.post(env.environment.url+"/VendorService/EnableCab",body).map((response)=>{
      return response.json();
    })
  }

  driverCab(body): Observable<any>{
    return this._http.post(env.environment.url+"/VendorService/DriverType",body);
    
        }
        addcab(body): Observable<any>{
          return this._http.post(env.environment.url+"/VendorService/Addcab", body);
          } 
          
        sendfile(Rcert): Observable<any>{
            return this._http.post(env.environment.url+"/VendorService/AddImage", Rcert);
            } 
        
        
}