import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../app/employee/employee.component';
import { Router } from '@angular/router';
import { DashData } from './dashData';
import { ReportEmpDetail } from '../Model/ReportEmpDetail';
import { ReportVendorDetail } from '../Model/ReportVendorDetai';
import { ReportManagerDetail } from '../Model/ReportEmpDet';
import { ReportEmp } from '../Model/reportemp';
import { ReportManager } from '../Model/reportmanager';
import { ReportVendor } from '../Model/reportvendor';
import { ReportService } from '../Services/reportservice';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader              = true;
  loaderText              = "Loading...";
  ////-----------------------------------------

  public employeeDetailReport: ReportEmpDetail;
  public vendorDetailReport: ReportVendorDetail;
  public managerDetailReport: ReportManagerDetail;
  public employeeReport: ReportEmp;
  public managerReport: ReportManager;
  public vendorReport: ReportVendor;
  public filterType = '';
  public filterReport;
  public showDiv = false;
  public filterValue;
  public reportService: ReportService;

  // router: Router;
  showMenu = false;
  showError = false;
  constructor(private router: Router, private employeeService: EmployeeService,public _dashData: DashData) {}
 
  ngOnInit() {
    this.checkRole();
  }

  checkRole(){
    console.log('Role has been change!');
    if(localStorage.getItem('role') != null && localStorage.getItem('role') != undefined){
      console.log('inside #1');
      if(localStorage.getItem('role').toUpperCase() == 'ADMIN'){
        console.log('!!1');
        this.showMenu = true;
        this.showLoader = false;
      }else{
          console.log('You are not admin!');
          this.showError = true;
          this.showLoader = false;
      }
    }

    console.log('outside #1');

  }
  
  
  headerUpdate(){}
  

  select_mode(value:string){
    this._dashData.setItem(value);
    this.router.navigate([value]);

  }

  view(value:string){
   this._dashData.setItem(value);
  
    this.router.navigate(['report']);
    if (this.filterType == '') {
      this.showDiv = false;
        return;
      }
      // console.log(this.filterType + " " + this.filterValue);
  
  }
}
