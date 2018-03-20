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
    this.qlid='AP250624';
    this.employeeService.employeeDash(this.qlid).subscribe((data) => {
      // this.responseJSON = data;
      console.log(data);
      if(data.success){
        this.rosterInfo = data.rosterInfo;
        this.emp = data;
        console.log(this.emp);
        // console.log(this.rosterInfo);
      }else{
        this.showError = true;
        this.errorMessage = 'An error was encountered while fetching your details!';
      }
      this.showLoader = false;
    });
  }
}