import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs';
import * as env from '../environments/environment';
import 'rxjs/Rx';
import { retry } from 'rxjs/operators';


@Injectable()
export class RelationService {

  constructor(
    private _http: Http,
  ) { }
  getRelations():Observable<any>{
    
    return this._http.post(env.environment.url+'/VendorService/relationship','').map((response)=>{
      return response.json();
      
    })
    
  }
}