//reportservice.ts
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestModel } from '../Model/requestModel';
import { environment } from '../../environments/environment';
import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_DELETE, REQUEST_TYPE_POST, REQUEST_TYPE_PUT } from '../Services/api.service';


@Injectable()
export class ReportService {

  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  constructor(private http: Http, private apiService: ApiService) { }


  getEmployeeReport(toDate, fromDate, filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.employeeRequest}`,
      headers: this.headers,
      body: "{'toDate':"+toDate+",'fromDate':"+fromDate+"}",
      shouldBlock: true
    });


  }

  getEmployeeReport1(filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.employeeRequest1}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true
    });
  }

  getEmployeeReportDetail(toDate, fromDate, filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.employeeDetailUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true

    });
  }

  getEmployeeReportDetail1(filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.employeeDetailUrl1}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true

    });
  }


  getManagerReport(toDate, fromDate, filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
    });


  }
  getManagerReport1(filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerUrl1}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true
    });
  }

  getManagerReportDetail(toDate, fromDate, filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerDetailUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
    });
  }

  getManagerReportDetail1(filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerDetailUrl1}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true
    });
  }

  getVendorReportDetail(toDate, fromDate, filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendorDetailUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true

    });
  }

  getVendorReport(toDate, fromDate, filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendorUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
    });


  }

  getVendorReport1(filterVal): Observable<any> {

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendorDetailUrl1}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true
    });
  }
  
  getVendorReportDetail1(filterVal): Observable<any> {
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendorDefaultDetailUrl}`,
      headers: this.headers,
      body: "{'filterVal':["  +  filterVal  +  "]}",
      shouldBlock: true

    });
  }

  getVendorNames():Observable<any>{

    return this.apiService.callApiService({

      requestType: REQUEST_TYPE_GET,
      url: `${environment.vendornameUrl}`,
      headers: this.headers,
      body: "",
      shouldBlock: true
    })


  }



  getBillingSummary(shift_id,vendor_name,FromDate,ToDate):Observable<any>{



    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.billingsummaryUrl}`,
      headers: this.headers,
      body: "{'shift_id':"+shift_id+",'vendor_name':"+vendor_name+",'FromDate':"+FromDate+",'ToDate':"+ToDate+"}",
      shouldBlock:true
    })



  }








}

