import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
//import { ACTIONS } from '../Reducers/todoreducer';
import { filter_model } from '../Model/route-filter';
import { environment } from '../../environments/environment';

import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';
import { ShowRouteComponent } from '../show-route/show-route.component';


@Injectable()
export class RosterService {
//http://localhost:8090/NCAB/RosterService/UploadFileData
  // constructor(private _http:Http,f_m:filter_model,private apiService: ApiService) { }

  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept':       'application/json'
});

  // URL = "http://localhost:8080/";
  constructor(private _http:Http,private apiService: ApiService) { }

getdriverdetails(){
  return this._http.post(`${environment.getDriverDetailUrl}`,"");
}

  getVendorDetails(){
    return this._http.post(`${environment.getVendorDetailUrl}`,"");
   }
  
   getAvailableCab(cabjson){
    return this._http.post(`${environment.getAvailableCabUrl}`,cabjson);
   }
  
   getEmployeesDetails(empqlid){
    return this._http.post(`${environment.getEmployeeDetailUrl}`,empqlid);
   }
   
   getQlidList(){
    return this._http.post(`${environment.getQlidUrl}`,"");
   }
 
   getunchQlidList(){
    return this._http.post(`${environment.getunchQlidUrl}`,"");
   }
  
   postunscheduledroute(jsonstring){
    const headers= new Headers({'Content-Type': 'application/json'});
    return this._http.post(`${environment.insertRouteUnschUrl}`,JSON.stringify(jsonstring),{headers:headers});
   }
  
   getUnshEmpDetails(empqlid){
    return this._http.post(`${environment.getUnshEmpDetails}`,empqlid);
  }
  
   postEmployeeDeactive(jsonstring){
    const headers= new Headers({'Content-Type': 'application/json'});
     return this._http.post(`${environment.empDeactiveUrl}`,jsonstring,{headers:headers});
  
   }
  
   postscheduledroute(jsonstring){
    const headers= new Headers({'Content-Type': 'application/json'});
    return this._http.post(`${environment.createScheduleRouteUrl}`,JSON.stringify(jsonstring),{headers:headers});
   }
  
 public upload:boolean=false;
 public cab_clicked;
  public getJsonData(){
    return this._http.get(`${environment.getCabListUrl}`)
    .map(res => res.json());  
  }



public getRouteData(cab,shift){ 
  let body={"c_n":cab,"s_n":shift};
  let headers=new Headers();
    headers.append('Content-Type','application/JSON');
  return this._http.post(`${environment.getRouteDataUrl}`,body,{headers: headers}).map(res =>res.json());          
  }

  // Get Filtered data
public postJsonData(c_no,qlid,s_id,e_name,vname){ 
let body={"c_n":c_no,"qlid":qlid,"s_i":s_id,"e_n":e_name,"vname":vname};
let headers=new Headers();
  headers.append('Content-Type','application/JSON');
return this._http.post(`${environment.rosterDataUrl}`,body,{headers: headers}).map(res =>res.json());          
}


//downlode excel sheet
public downloadExcelData(c_no,qlid,s_id,e_name,vname){ 
  let body={"c_n":c_no,"qlid":qlid,"s_i":s_id,"e_n":e_name,"vname":vname};
  let headers=new Headers();
    headers.append('Content-Type','application/JSON');
  return this._http.post(`${environment.downloadExcelDataUrl}`,body,{headers: headers}).map(res =>res.json());          
  }

//get Add Emp qlid
public getAddData(c_no,sid){ 
  let body={"c_n":c_no,"s_id":sid};
  let headers=new Headers();
    headers.append('Content-Type','application/JSON');
  return this._http.post(`${environment.getAddQlidUrl}`,body,{headers: headers}).map(res =>res.json());          
  }
  
//get cab list editemp
public getcablist(e_s,e_c){ 
  let body={"shiftid" : e_s,"cabno":e_c};
  let headers=new Headers();
    headers.append('Content-Type','application/JSON');
  return this._http.post(`${environment.getCabListUrl}`,body,{headers: headers}).map(res =>res.json());          
  }

//get Add Emp qlid
public addEmpToDb(qlid,c_no,s_id){ 
  let body={"qlid":qlid,"c_n":c_no,"s_i":s_id};
  let headers=new Headers();
    headers.append('Content-Type','application/JSON');
  return this._http.post(`${environment.getEmpToDbUrl}`,body,{headers: headers}).map(res =>res.json());            
}


public sendData(){
  let json=JSON.stringify({"r_no":"route_no","emp_qlid":"qlid","shift_time":"time"});
    let  params=json;
    let headers=new Headers();
    headers.append('Content-Type','application/x-www-form-urlencoded');
    return this._http.post(`${environment.rosterDataUrl}`,params,{headers: headers}).map(res =>res.json());   
}

// Sending Excel Data
public sendfile(formdata:any){
  let body=formdata;
    return this._http.post(`${environment.uploadFileDataUrl}`,body).map(res =>res.json());   
}

public changeUploadValue(){
  console.log(this.upload);
  return this.upload;
}

public change_cab_clicked(cab){
  this.cab_clicked=cab;
} 


public deleteQlid(qlid,sid){
  let json={"emp_qlid":qlid,"s_id":sid};
    let  body=json;
    let headers=new Headers();
    headers.append('Content-Type','application/json');
    return this._http.post(`${environment.inactiveDataUrl}`,body,{headers: headers}).map(res =>res.json());   
}

//saurav
public posteditinfo(a,b,d,e,f){
  let body={"cabno":a,"picktime":b,"qlid":d,"sdate":e,"edate":f};
  let headers=new Headers();
  headers.append('Content-Type','application/json');
  return this._http.post(`${environment.editDataUrl}`,body).map(res =>res.json());
}

//richa
getAddData1(){ 
  
  let headers=new Headers();
      
  headers.append('Content-Type','application/JSON');
    
  return this._http.post(`${environment.getRouteUrl}`,{headers: headers}).map(res =>res.json());          
  
    }
  
  

    public getvendorData(){ 
      
      let headers=new Headers();
           
       headers.append('Content-Type','application/JSON');
        
        return this._http.post(`${environment.getVendorUrl}`,{headers: headers}).map(res =>res.json());          
      
          }




    public getcabData(){ 
      
  let headers=new Headers();
   headers.append('Content-Type','application/JSON');
    
    return this._http.post(`${environment.getCabNumberUrl}`,{headers: headers}).map(res =>res.json());          
  
      }
    
   
     public updater(a,b,c,d,e,f){ 
      let headers=new Headers();
      headers.append('Content-Type','application/JSON');
       let body={"r_n":a, "c_n":b,"s_i":c,"ven":d,"s_date":e,"e_date":f};
  
        return this._http.post(`${environment.updateRouteUrl}`,body).map(res =>res.json()); 
           
        }
        
        //start date and end date
        public getstartandend(qlid,cab,shift){
          let body={"e_qlid":qlid,"e_cab":cab,"e_sid":shift};
          let headers=new Headers();
          headers.append('Content-Type','application/JSON');
          return this._http.post(`${environment.getStartAndEndUrl}`,body,{headers: headers}).map(res=>res.json());
          }

          fetchdefaultdata(rno){
            let body={"r_n":rno};
            let headers=new Headers();
            headers.append('Content-Type','application/JSON');
            return this._http.post(`${environment.getdefaultdataUrl}`,body,{headers: headers}).map(res=>res.json());
          }

}
