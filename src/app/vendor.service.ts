import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';
import * as env from '../environments/environment';
import 'rxjs/Rx';
import { retry } from 'rxjs/operators';

@Injectable()
export class VendorService {

  constructor(
    private _http: Http,
  ) { }
  getVendors():Observable<any>{
    
    var data;
    let body=[{"name":"rishabh","gender":"male","age":"30"},
              {"name":"sonia","gender":"female","age":"40"}];
    return this._http.post(env.environment.url+"/VendorService/VendorDetails",'').map((response)=>{
      return response.json()
      
    })
    
  }
  getVendorByKey(body)
  {
    return this._http.post(env.environment.url+"/VendorService/VendorDetails/id",JSON.stringify({vendor_id:body})).map(response=>response.json());
  }
  
  searchVendor(body){
    
    return this._http.post(env.environment.url+"/VendorService/SearchVendor",body).map((response)=>{
      return response.json()
    })
  }
  deleteVendor(body){
    return this._http.post(env.environment.url+"/VendorService/DisableVendor",body).map((response)=>{
      return response.json()
    })
  }
  addVendor(body): Observable<any>{
   
    
    return this._http.post(env.environment.url+"/VendorService/AddVendor", body);
  }

  updateVendor(vendor){
    return this._http.post(env.environment.url+"/VendorService/UpdateVendor",JSON.stringify(vendor)).map((response)=>{
      return response.json()
    })
  }
  enableVendor(body){
    return this._http.post(env.environment.url+"/VendorService/EnableVendor",body).map((response)=>{
      return response.json();
    })
  }
  getimage(body): Observable<any>{
    return this._http.post(env.environment.url+"/VendorService/downloadimage", body);
  }

}
