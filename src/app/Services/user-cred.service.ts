import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { ACTIONS } from '../Reducers/todoreducer';
import { environment } from '../../environments/environment';
import { Employee } from '../Model/employee';

import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';
import { Filter } from '../Model/filter';
import { MgrRequest } from '../Model/mgrRequest';

@Injectable()
export class UserCredService {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Accept':       'application/json'
    });
    constructor(private http: Http, private apiService: ApiService) { }

    accSetupEnterQlid(qlid):Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.newAccSetupQlidUrl}`,
            headers: this.headers,
            body: JSON.stringify({qlid: qlid}),
            shouldBlock: true
        });
    }

    accSetupSetPassword(userCred):Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.accSetupSetPasswordUrl}`,
            headers: this.headers,
            body: JSON.stringify(userCred),
            shouldBlock: true
        });
    }

    verifyPwdToken(qlid, token):Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.verifyPwdTokenUrl}`,
            headers: this.headers,
            body: JSON.stringify({qlid: qlid, token: token}),
            shouldBlock: true
        });
    }

    forgotpassword(qlid): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.forgotpasswordUrl}`,
            headers: this.headers,
            body: JSON.stringify({qlid:qlid}),
            shouldBlock: true
        });
    }

    forgotPassSetPass(userCred): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.forgotpassSetPasswordUrl}`,
            headers: this.headers,
            body: JSON.stringify(userCred),
            shouldBlock: true
        });
    }
}