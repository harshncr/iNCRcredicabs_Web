import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, BrowserXhr } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RequestModel } from '../Model/requestModel';
import { environment } from '../../environments/environment';
import { ApiService, REQUEST_TYPE_GET, REQUEST_TYPE_DELETE, REQUEST_TYPE_POST, REQUEST_TYPE_PUT } from '../Services/api.service';
import { FetchRequest } from '../Model/fetchRequest';


@Injectable()
export class UnscheduledRequestService {

  public req: FetchRequest;

  headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  excelHeaders = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/vnd.ms-excel'
    // 'Accept': 'application/octet-stream'
  });


  constructor(private http: Http, private apiService: ApiService) { }

  getAllUnscheduledRequest(defaultRequest): Observable<any> {

    this.req = new FetchRequest();
    this.req.Allocated = 0;

    if (defaultRequest === "Allocated") {
      this.req.Allocated = 1;
    }

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.getrequestUrl}`,
      headers: this.headers,
      body: JSON.stringify(this.req),
      shouldBlock: true
    });

  }

  doAllocateRequest(requestid_Arr): Observable<any> {
    // console.log("in service"+requestid_Arr);

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.allocateRequest}`,
      headers: this.headers,
      body: "{'Request_ids':[" + requestid_Arr + "]}",
      shouldBlock: true
    });

  }

  downloadExcelFile(downloadReqArr,defaultRequest): Observable<any> {

    console.log("in service:downloadExcel()" + downloadReqArr);

    this.req = new FetchRequest();
    this.req.Allocated = 0;

    if (defaultRequest === "Allocated") {
      this.req.Allocated = 1;
    }

    return this.apiService.callApiService({
      requestType: REQUEST_TYPE_POST,
      url: `${environment.downloadRequestExcelUrl}`,
      // headers: this.excelHeaders,
      headers: this.headers,
      body: "{'Request_ids':[" + downloadReqArr + "],'Allocated':'"+this.req.Allocated+"'}",
      shouldBlock: true
    });

  }


  pending: any = [{
    "Request_ID": "1",
    "Emp_Qlid": "WN215649",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name1",
    "Gender": "M",
    "Name": "Will Smith",
    "Shift_ID": "4",
    "Mobile": "9876554321",
    "Rqst_Date_Time": "2001-00-08 03:45:33",
    "Start_Date_Time": "2001-00-08 03:45:33",
    "End_Date_Time": "2002-00-08 03:45:33",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Meeting",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon",
    "Pickup_Address": "North avenue, greater kailash"
  },

  {
    "Request_ID": "2",
    "Emp_Qlid": "NB398473",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name2",
    "Gender": "M",
    "Name": "Naveen bansal",
    "Shift_ID": "4",
    "Mobile": "9876554321",
    "Rqst_Date_Time": "2014-04-00 10:09:37",
    "Start_Date_Time": "2014-04-00 10:09:37",
    "End_Date_Time": "2015-04-00 10:09:37",
    "Approval": "0",
    "Destination": "H",
    "Reason": "ILL",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon",
    "Pickup_Address": "North avenue, greater kailash"
  },

  {
    "Request_ID": "3",
    "Emp_Qlid": "VD039682",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name3",
    "Gender": "M",
    "Name": "van dam",
    "Mobile": "9876554321",
    "Pickup_Address": "sec 8 ,rohini",
    "Shift_ID": "4",
    "Rqst_Date_Time": "2006-04-16 01:04:57",
    "Start_Date_Time": "2006-04-16 01:04:57",
    "End_Date_Time": "2006-04-16 01:04:57",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Fever",
    "Allocated": "0",
    "Other_Address": "North avenue, greater kailash"
  },

  {
    "Request_ID": "4",
    "Emp_Qlid": "SP285563",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name4",
    "Gender": "F",
    "Name": "Suman kumari",
    "Mobile": "9876554321",
    "Pickup_Address": "hno. 709, sheesh mahal, azad mkt,",
    "Shift_ID": "4",
    "Rqst_Date_Time": "2005-12-12 12:12:54",
    "Start_Date_Time": "2005-12-12 12:12:54",
    "End_Date_Time": "2005-12-12 12:12:54",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Marriage",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon"
  }];


  allocated: any = [{
    "Request_ID": "1",
    "Emp_Qlid": "WN215649",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name1",
    "Gender": "M",
    "Name": "Joseph",
    "Shift_ID": "4",
    "Mobile": "9876554321",
    "Rqst_Date_Time": "2001-00-08 03:45:33",
    "Start_Date_Time": "2001-00-08 03:45:33",
    "End_Date_Time": "2002-00-08 03:45:33",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Meeting",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon",
    "Pickup_Address": "North avenue, greater kailash",
    "Cab_no": "4269"
  },

  {
    "Request_ID": "2",
    "Emp_Qlid": "NB398473",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name2",
    "Gender": "M",
    "Name": "Mandeep Singh",
    "Shift_ID": "4",
    "Mobile": "9876554321",
    "Rqst_Date_Time": "2014-04-00 10:09:37",
    "Start_Date_Time": "2014-04-00 10:09:37",
    "End_Date_Time": "2015-04-00 10:09:37",
    "Approval": "0",
    "Destination": "H",
    "Reason": "ILL",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon",
    "Pickup_Address": "North avenue, greater kailash",
    "Cab_no": "1323"
  },

  {
    "Request_ID": "3",
    "Emp_Qlid": "VD039682",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name3",
    "Gender": "F",
    "Name": "Sunita Pawar",
    "Mobile": "9876554321",
    "Pickup_Address": "sec 8 ,rohini",
    "Shift_ID": "4",
    "Rqst_Date_Time": "2006-04-16 01:04:57",
    "Start_Date_Time": "2006-04-16 01:04:57",
    "End_Date_Time": "2006-04-16 01:04:57",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Fever",
    "Allocated": "0",
    "Other_Address": "North avenue, greater kailash",
    "Cab_no": "4221"
  },

  {
    "Request_ID": "4",
    "Emp_Qlid": "SP285563",
    "Mgr_Qlid": "WN215649",
    "Mgr_name": "some name4",
    "Gender": "F",
    "Name": "Lata Kapor",
    "Mobile": "9876554321",
    "Pickup_Address": "hno. 709, sheesh mahal, azad mkt,",
    "Shift_ID": "4",
    "Rqst_Date_Time": "2005-12-12 12:12:54",
    "Start_Date_Time": "2005-12-12 12:12:54",
    "End_Date_Time": "2005-12-12 12:12:54",
    "Approval": "0",
    "Destination": "H",
    "Reason": "Marriage",
    "Allocated": "0",
    "Other_Address": "hn. 67/8,model town, gurgaon",
    "Cab_no": "6772"
  }];

}
