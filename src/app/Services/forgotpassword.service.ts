import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { ACTIONS } from '../Reducers/todoreducer';
import { environment } from '../../environments/environment';

import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';

@Injectable()
export class ForgotpasswordService {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Accept':       'application/json'
    });
  qlid: String;

    private empSource = new BehaviorSubject<String>(this.qlid);
    currentEmp = this.empSource.asObservable();

    constructor(private http: Http, private apiService: ApiService) { }

    forgotpassword(eqlid): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.forgotpasswordUrl}`,
            headers: this.headers,
            body: JSON.stringify(eqlid),
            shouldBlock: true
        });
    }

}