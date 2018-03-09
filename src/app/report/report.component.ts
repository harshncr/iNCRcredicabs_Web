//report.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../Services/reportservice';
import { ReportEmp } from '../Model/reportemp';
import { ReportManager } from '../Model/reportmanager';
import { ReportVendor } from '../Model/reportvendor';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public employeeReport: ReportEmp;
  public managerReport: ReportManager;
  public vendorReport: ReportVendor;
  public filterType = '';
  public filterValue;
  public showDiv = false;

  constructor(public reportService: ReportService) { }

  public reports = [{ "ManagerName": "Sonia Chawla", "NumberOfEmpl": "32", "NumberOfCabs": "12", "Cost": "3600", "RequestID": "1234", "Shift": "Regular", "EmployeeQlid": "re124111", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "2675", "VendorName": "ABC CAB SERVICE", "TypeOfCab": "Micro" },
  { "ManagerName": "Ruchi Chawla", "NumberOfEmpl": "2", "NumberOfCabs": "1", "Cost": "300", "RequestID": "8234", "Shift": "Regular", "EmployeeQlid": "pp222191", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "5566", "VendorName": "Rose CAB SERVICE", "TypeOfCab": "Mini" },
  { "ManagerName": "Aman Chawla", "NumberOfEmpl": "12", "NumberOfCabs": "10", "Cost": "4600", "RequestID": "1534", "Shift": "Regular", "EmployeeQlid": "yu123161", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "6464", "VendorName": "COdeCatchers CAB SERVICE", "TypeOfCab": "Mini" }];

  ngOnInit() {
  }

  hideDiv(){
    this.showDiv=false;
  }

  search() {
    if (this.filterType == '') {
    this.showDiv = false;
      return;
    }
    console.log(this.filterType + " " + this.filterValue);

    switch (this.filterType) {

      case "Mgr_Qlid":
        this.reportService.getManagerReport().subscribe((data) => {
          this.managerReport = data;
          console.log(data);
        }); 
        this.showDiv = true;
        break;

      case "Emp_FName":
        this.reportService.getEmployeeReport().subscribe((data) => {
          this.employeeReport = data;
          this.showDiv = true;

          console.log(data);
        }); break;

      case "vendor_fname":
        this.reportService.getVendorReport().subscribe((data) => {
          this.vendorReport = data;
          this.showDiv = true;

          console.log(data);
        }); break;

    }

  }
}