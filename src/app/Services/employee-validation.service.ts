import { Injectable } from '@angular/core';
import { Http, Response , RequestOptions , Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeValidationService {
    headers = new Headers({
        'Content-Type': 'application/json',
        'Accept':       'application/json'
    });

  formError = {
    empQlid:        {error: false, message: ''},
    empFName:       {error: false, message: ''},
    empMName:       {error: false, message: ''},
    empLName:       {error: false, message: ''},
    empMobNbr:      {error: false, message: ''},
    empGender:      {error: false, message: ''},
    rolesId:        {error: false, message: ''},
    empMgrQlid1:    {error: false, message: ''},
    empMgrQlid2:    {error: false, message: ''},
    empAddLine1:    {error: false, message: ''},
    empAddLine2:    {error: false, message: ''},
    empZone:        {error: false, message: ''},
    empPin:         {error: false, message: ''},
    empPickupArea:  {error: false, message: ''},
    empHomeNbr:     {error: false, message: ''},
    empEmergNbr:    {error: false, message: ''},
    empBloodGrp:    {error: false, message: ''}
  };

  constructor(private employeeService: EmployeeService) {}
  
}