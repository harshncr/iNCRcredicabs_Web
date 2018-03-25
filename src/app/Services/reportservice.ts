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
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.employeeRequest}`,
      headers: this.headers,
       body:JSON.stringify(object),
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
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.employeeDetailUrl}`,
      headers: this.headers,
      body:JSON.stringify(object),
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
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.managerUrl}`,
      headers: this.headers,
      body: JSON.stringify(object),
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
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_GET,
      url: `${environment.managerDetailUrl}`,
      headers: this.headers,
      body:JSON.stringify(object),
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
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.vendorDetailUrl}`,
      headers: this.headers,
      body:JSON.stringify(object),
      shouldBlock: true

    });

  }

  getVendorReport(toDate, fromDate, filterVal): Observable<any> {
    var object={
      toDate: toDate,
      fromDate: fromDate
    }
    if(!toDate){
      object.toDate=""
    }
    if(!fromDate){
      object.fromDate="";
    }
    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.vendorUrl}`,
      headers: this.headers,
      body: JSON.stringify(object),
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
    });


  }



  getBillingSummary(shift_id,vendor_name,FromDate,ToDate):Observable<any>{

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.billingsummaryUrl}`,
      headers: this.headers,
      body: "{'shift_id':"+shift_id+",'vendor_name':"+vendor_name+",'FromDate':"+FromDate+",'ToDate':"+ToDate+"}",
      shouldBlock:true
    });
  }


  getTransportationReport(month,year,f):Observable<any>{

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.transportationBillingUrl}`,
      headers: this.headers,
      body: "{"+
        "'month':"+month+",'year':"+year+",'hrtax_regular_cab':"+f.hrtax_regular_cab+",'toll_regular_cab':"+f.toll_regular_cab +","+
        "'uptax_regular_cab':"+f.uptax_regular_cab+",'emp_contrib_regular':"+f.emp_contrib_regular+","+
        "'emp_contrib_shift':'0','gstTax_regular_cab':"+f.gstTax_regular_cab+","+
        "'gps_regular_cab':"+f.gps_regular_cab+",'gps_shift_cab':"+f.gps_shift_cab+","+
        "'gstTax_shift_cab':"+f.gstTax_shift_cab+",'hrtax_shift_cab':"+f.hrtax_shift_cab+","+
        "'uptax_shift_cab':"+f.uptax_shift_cab+",'toll_shift_cab':"+f.toll_shift_cab+","+
        "'toll_unscheduled_cab':"+f.toll_unscheduled_cab+",'gstTax_unscheduled':"+f.gstTax_unscheduled+","+
        "'standByCab_extraKms':"+f.standByCab_extraKms+",'ratePerKm':"+f.ratePerKm+","+
        "'extraMileageCost':"+f.extraMileageCost+",'standByCost':"+f.standByCost+","+
        "'standByTax':"+f.standByTax+",'otherCabCost':"+f.otherCabCost+","+
        "'otherCabGST':"+f.otherCabGST+",'escortGuardCost':"+f.escortGuardCost+","+
        "'escortGuardDropDutyCost':"+f.escortGuardDropDutyCost+",'escortGuardTaxes':"+f.escortGuardTaxes+","+
        "'tptMobCost':"+f.tptMobCost+",'overallUPtax':"+f.overallUPtax+","+
        "'overallHRtax':"+f.overallHRtax+",'overallTaxes':"+f.overallTaxes+","+
        "'overallToll':"+f.overallToll+",'overallGPS':"+f.overallGPS+",'foreignExPrice':"+f.foreignExPrice+"}",
      shouldBlock:true
    });
  }

  getCheckinoutreport(route_no,from_date,to_date,cab_no,emp_fname,emp_lname,vendor_name):Observable<any>{

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.checkinoutreportUrl}`,
      headers: this.headers,
      body: "{'route_no':'"+route_no+"','from_date':'"+from_date+"','to_date':'"+to_date+"','cab_no':'"+cab_no+"','emp_fname':'"+emp_fname+"','vendor_name':'"+vendor_name+"','emp_lname':'"+emp_lname+"'}",
      shouldBlock:true
    });
  
    }
  
    getRouteNos(VendorName):Observable<any>{

      return this.apiService.callApiService({
  
        requestType: REQUEST_TYPE_POST,
        url: `${environment.routenoUrl}`,
        headers: this.headers,
        body: VendorName,
        shouldBlock: true
      })
    }
  
      getCabnobyVendorandRouteNo(VendorName,RouteNo):Observable<any>{
  
      return this.apiService.callApiService({
  
        requestType: REQUEST_TYPE_POST,
        url: `${environment.cabnobyvendorandrouteUrl}`,
        headers: this.headers,
        body: "{'VendorName':'"+VendorName+"','RouteNo':'"+RouteNo+"'}",
        shouldBlock: true
      })
  
    }
  



}

