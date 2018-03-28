import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Model/employee';
import { EmployeeData } from '../view-employee/employeeData';
import { debug } from 'util';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader              = true;
  loaderText              = "Loading...";
  ////-----------------------------------------

  showError               = false;
  errorMessage            = '';

  emp: Employee;
  rosterInfo;
  
  responseJSON;
  qlid: string;
  plid;

  constructor(
    public _employeeData: EmployeeData,
    public employeeService: EmployeeService  
  ){}

  ngOnInit() {
    let data = {"empCreatedBy":"Hanif","empLastUpdateDate":"2017-12-06","rosterInfo":[{"Cab_number":"DL3CAB2367","l_name":"Sati","vendor_name":"Absolute Solutions","Qlid":"GS250365","roster_id":"","m_name":"","p_a":"shahdara","shift_id":"1","f_name":"Gaurav","e_mob":"7895305782","pickup_time":"8:00","Route_number":"001","occu_left":0,"Roster_Id":"1426"},{"Cab_number":"DL3CAB2367","l_name":"Gunwant","vendor_name":"Absolute Solutions","Qlid":"AG250497","roster_id":"","m_name":"","p_a":"moti bagh","shift_id":"1","f_name":"Abhinav","e_mob":"9760852188","pickup_time":"00:16","Route_number":"001","occu_left":0,"Roster_Id":"1427"},{"Cab_number":"DL3CAB2367","l_name":"Bansal","vendor_name":"Absolute Solutions","Qlid":"RB250491","roster_id":"","m_name":"","p_a":"shahdara","shift_id":"1","f_name":"Rahul","e_mob":"9084420467","pickup_time":"08:00","Route_number":"001","occu_left":0,"Roster_Id":"1462"},{"Cab_number":"DL3CAB2367","l_name":"Gupta","vendor_name":"Absolute Solutions","Qlid":"PG250235","roster_id":"","m_name":"","p_a":"gtb nagar","shift_id":"1","f_name":"Pulkit","e_mob":"9871663894","pickup_time":"08:00","Route_number":"001","occu_left":0,"Roster_Id":"1463"}],"empCreationDate":"2017-12-06","empMobNbr":"9760852188","empMgrQlid2":"SG250533","empAddLine1":"R.No. 20, B-2, Birla Institute of Applied Sciences","empFName":"Abhinav","empAddLine2":"Bhimtal","empStatus":"a","empMgrQlid1":"gs250365","empPin":"110047","empBloodGrp":"O+","mgr1Name":"Gaurav  Sati","mgr1Contact":"7895305782","empLastUpdatedBy":"Hanif","rolesId":"1","mgr2Name":"Shruti  Gupta","shiftInfo":[{"shiftId":"1","shiftName":"SCHEDULED","startTime":"07:00:00","endTime":"16:00:00"},{"shiftId":"2","shiftName":"REGULAR","startTime":"10:00:00","endTime":"19:00:00"},{"shiftId":"3","shiftName":"SCHEDULED","startTime":"12:00:00","endTime":"21:00:00"},{"shiftId":"4","shiftName":"UNSCHEDULED","startTime":"","endTime":""},{"shiftId":"5","shiftName":"SCHEDULED","startTime":"14:00:00","endTime":"23:00:00"}],"empEmergNbr":"9760852188","empGender":"M","empMName":"","driverDetails":{"driverName":"Raj","driverContact":"9856453456"},"empPickupArea":"moti bagh","mgr2Contact":"9953269700","success":true,"empQlid":"AG250497","empZone":"West Delhi","contacts":[{"contactSos":"2","contactId":"1","contactEmail":"shradha.jalhotra@ncr.com","contactName":"Shradha","contactSosPriority":"1","contactNbr":"9711264599","contactRole":"NCR"},{"contactSos":"2","contactId":"2","contactEmail":"sudhanshu.bhardwaj@ncr.com","contactName":"Sudhanshu","contactSosPriority":"2","contactNbr":"9811940128","contactRole":"Transport"},{"contactSos":"2","contactId":"10","contactEmail":"ag250497@ncr.com","contactName":"Abhinav","contactSosPriority":"3","contactNbr":"9760852188","contactRole":"NCR"}],"empLName":"Gunwant"};
    this.rosterInfo = data.rosterInfo;
    this.emp = data;
    this.showLoader = false;
    console.log(this.emp);

    // this.employeeService.employeeDash().subscribe((data) => {
    //   // this.responseJSON = data;
    //   console.log(data);
    //   if(data.success){
    //     this.rosterInfo = data.rosterInfo;
    //     this.emp = data;
    //     console.log(this.emp);
    //     // console.log(this.rosterInfo);
    //   }else{
    //     this.showError = true;
    //     this.errorMessage = 'An error was encountered while fetching your details!';
    //   }
    //   this.showLoader = false;
    // });
  }
}