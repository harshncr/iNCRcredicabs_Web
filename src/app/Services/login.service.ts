import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers, BrowserXhr} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { ACTIONS } from '../Reducers/todoreducer';
import { environment } from '../../environments/environment';
import { User } from '../Model/user';

import { ApiService, REQUEST_TYPE_GET , REQUEST_TYPE_DELETE , REQUEST_TYPE_POST , REQUEST_TYPE_PUT} from '../Services/api.service';

@Injectable()
export class LoginService extends BrowserXhr {
    headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'//,
        // withCredentials: true
    });
    constructor(private http: Http, private apiService: ApiService) {
        super();
    }

    build(): any{
        let xhr = super.build();
        xhr.withCredentials = true;
        return <any> (xhr);
    }

    startLogin(user: User): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.loginUrl}`,
            headers: this.headers,
            body: JSON.stringify(user),
            shouldBlock: true
        });
    }

    logout(): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.logoutUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    checkLoginStatus(): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.checkLoginUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }
}
