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

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

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
  
  constructor(public _dashData: DashData,private router: Router) {}
  ngOnInit() {}
  headerUpdate(){}
  
  
  // redirect(filterIt: String)
  // {
  //   var a="oh my god"
  //  var checkIt= this._dashData.setItem('filterIt');
  //  console.log("Here I am");
  //  console.log(checkIt);
  //  console.log(a);
  // }


  view(){
    var a="oh my god"
   this._dashData.setItem(this.filterReport);
   console.log("Here I am");
   console.log(this.filterReport);
   console.log(a);
    this.router.navigate(['report']);
    if (this.filterType == '') {
      this.showDiv = false;
        return;
      }
      console.log(this.filterType + " " + this.filterValue);
  
      switch (this.filterType) {
  
        case "Unschedule_Summary_ByManager":
          this.reportService.getManagerReport1(this.filterValue).subscribe((data) => {
            this.managerReport = data;
            console.log(data);
          }); 
          this.showDiv = true;
          break;
  
        case "Unschedule_Summary_ByEmployee":
          this.reportService.getEmployeeReport1(this.filterValue).subscribe((data) => {
            this.employeeReport = data;
            this.showDiv = true;
            console.log(data);
          }); break;
  
        case "Unschedule_Summary_ByVendor":
          this.reportService.getVendorReport1(this.filterValue).subscribe((data) => {
            this.vendorReport = data;
            this.showDiv = true;
  
            console.log(data);
          }); break;
          case "Unschedule_Detail_ByVendor":
          this.reportService.getVendorReportDetail1(this.filterValue).subscribe((data) => {
            this.vendorDetailReport = data;
            this.showDiv = true;
  
            console.log(data);
          }); break;
          case "Unschedule_Detail_ByEmployee":
          this.reportService.getEmployeeReportDetail1(this.filterValue).subscribe((data) => {
            this.employeeDetailReport = data;
            this.showDiv = true;
  
            console.log(data);
          }); break;
          case "Unschedule_Detail_ByManager":
          this.reportService.getManagerReportDetail1(this.filterValue).subscribe((data) => {
            this.managerDetailReport = data;
            this.showDiv = true;
  
            console.log(data);
          }); break;
      
  
  }
  
  }
}