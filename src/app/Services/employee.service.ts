import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
// import { ACTIONS } from '../Reducers/todoreducer';
import { environment } from '../../environments/environment';
import { Employee } from '../Model/employee';

import {
    ApiService,
    REQUEST_TYPE_GET,
    REQUEST_TYPE_DELETE,
    REQUEST_TYPE_POST,
    REQUEST_TYPE_PUT
} from '../Services/api.service';
import { Filter } from '../Model/filter';
import { MgrRequest } from '../Model/mgrRequest';

@Injectable()
export class EmployeeService {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Accept':       'application/json'
    });
    emp: Employee;

    private empSource = new BehaviorSubject<Employee>(this.emp);
    currentEmp = this.empSource.asObservable();

    constructor(private http: Http, private apiService: ApiService) { }

    addEmployee(employee: Employee): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.addEmployeeUrl}`,
            headers: this.headers,
            body: JSON.stringify(employee),
            shouldBlock: true
        });
    }

    editEmployee(employee: Employee): Observable<any>{
        console.log(JSON.stringify(employee));
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.editEmployeeUrl}`,
            headers: this.headers,
            body: JSON.stringify(employee),
            shouldBlock: true
        });
    }

    viewEmployee(filter: Filter): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.viewEmployeeUrl}`,
            headers: this.headers,
            body: JSON.stringify(filter),
            shouldBlock: true
        });
    }

    getEmployeeByQlid(qlid):Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.viewEmployeeByQlidUrl}`,
            headers: this.headers,
            body: JSON.stringify({qlid: qlid}),
            shouldBlock: true
        });
    }

    giveEmployee(employee:Employee){
        this.empSource.next(employee);
    }

    activateEmployee(employee:Employee): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.activateEmployeeUrl}`,
            headers: this.headers,
            body: JSON.stringify(employee),
            shouldBlock: true
        });
    }

    deactivateEmployee(employee:Employee): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.deactivateEmployeeUrl}`,
            headers: this.headers,
            body: JSON.stringify(employee),
            shouldBlock: true
        });
    }

    getManagerByName(mgrRequest:MgrRequest): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.getManagerByNameUrl}`,
            headers: this.headers,
            body: JSON.stringify(mgrRequest),
            shouldBlock: true
        });
    }

    getAllManagers():Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.getAllManagersUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    getAllRoles():Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.getAllRolesUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    employeeDash(): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.employeeDashUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    employeeManagerDetails(): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.employeeManagerDetailsUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    unscheduledRequest(req): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.unscheduledRequestUrl}`,
            headers: this.headers,
            body: JSON.stringify(req),
            shouldBlock: true
        });
    }

    getRole(): Observable<any>{
        return this.apiService.callApiService({
            requestType: REQUEST_TYPE_POST,
            url: `${environment.getRoleUrl}`,
            headers: this.headers,
            body: JSON.stringify({}),
            shouldBlock: true
        });
    }

    uploadExcel(formData): Observable<any>{
        return this.http.post(`${environment.uploadEmployeeExcelUrl}`, formData)
        .map(res => {
            return this.getResponseContent(`${environment.uploadEmployeeExcelUrl}`, res);
        })
        .catch(err => {
            return Observable.throw(err);
        });
    }

    sendfile(formData){
        return this.uploadExcel(formData);
    }

    
    // checkManager(manager): Observable<any>{
    //     return this.apiService.callApiService({
    //         requestType: REQUEST_TYPE_POST,
    //         url: `${environment.deactivateEmployeeUrl}`,
    //         headers: this.headers,
    //         body: JSON.stringify({manager: manager}),
    //         shouldBlock: true
    //     });
    // }    

    private getResponseContent(url: string, res: Response) {
        try {
            let contentType = res.headers.get('content-type');
            if (contentType && contentType.indexOf(';') !== -1) {
                // strip the charset declaration to simplify the comparison
                contentType = contentType.substring(0, contentType.indexOf(';'));
            }
            // console.log(`contentType => [${contentType}]`);
            switch (contentType) {

                case 'application/x-file-download':
                    return res;

                case 'application/json':
                    return res.json();

                case 'text/plain':
                case 'text/html':
                    return res.text();

                case 'application/vnd.ms-excel':
                    return res.blob();

                case null:
                    return null;

                default:
                    return res.text() ? res.json() : {};
            }
        } catch (e) {
            const resContent = JSON.stringify(res).substr(0, 512);
             throw (e);
        }
        finally {}
    }
}

//Sending Excel Data 

