//reportservice.ts
import { Injectable } from '@angular/core';
import { Http , Response , RequestOptions , Headers, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {RequestModel} from '../Model/requestModel';
import { environment } from '../../environments/environment';
import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';


@Injectable()
export class ReportService {

  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http, private apiService: ApiService) { }

 
  getEmployeeReport():Observable<any>{
    
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.employeeRequest}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
  });
  
   
  }
   

  getManagerReport():Observable<any>{
    
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
  });
  
   
  }

  getVendorReport():Observable<any>{
    
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendorUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
  });
  
   
  }

}