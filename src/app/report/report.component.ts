//report.component.ts
import { Component, OnInit } from '@angular/core';
import { ReportService } from '../Services/reportservice';
import { ReportEmp } from '../Model/reportemp';
import { ReportManager } from '../Model/reportmanager';
import { ReportVendor } from '../Model/reportvendor';
import { DashData } from '../dash/dashData';
import { ReportManagerDetail } from '../Model/ReportEmpDet';
import { ReportVendorDetail } from '../Model/ReportVendorDetai';
import { ReportEmpDetail } from '../Model/ReportEmpDetail';
import { VendorBilling } from '../Model/VendorBilling'
import { TransportationCost } from './TransportationCost';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  public employeeReport: ReportEmp;
  public managerReport: ReportManager;
  public vendorReport: ReportVendor;
  public employeeDetailReport: ReportEmpDetail;
  public vendorDetailReport: ReportVendorDetail;
  public managerDetailReport: ReportManagerDetail;
  public transportationCost:TransportationCost;
  public filterType = '';
  public filterValue;
  public toDate;
  public fromDate;
  public filterVal;
  public vname=[];
  public filterReport;
  public tf = true;
  public showTransportationReportResult=true;
  message = "";
  module = "REPORTS";
  navLocation= " " ;

    ////-------------data for loader-------------
    public showLoader = false;
    public loaderText = "Loading...";
    ////-----------------------------------------
  

  public reports = [{ "ManagerName": "Sonia Chawla", "NumberOfEmpl": "32", "NumberOfCabs": "12", "Cost": "3600", "RequestID": "1234", "Shift": "Regular", "EmployeeQlid": "re124111", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "2675", "VendorName": "ABC CAB SERVICE", "TypeOfCab": "Micro" },
  { "ManagerName": "Ruchi Chawla", "NumberOfEmpl": "2", "NumberOfCabs": "1", "Cost": "300", "RequestID": "8234", "Shift": "Regular", "EmployeeQlid": "pp222191", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "5566", "VendorName": "Rose CAB SERVICE", "TypeOfCab": "Mini" },
  { "ManagerName": "Aman Chawla", "NumberOfEmpl": "12", "NumberOfCabs": "10", "Cost": "4600", "RequestID": "1534", "Shift": "Regular", "EmployeeQlid": "yu123161", "TimeAndDate": "21-12-18,6:12pm", "CabNumber": "6464", "VendorName": "COdeCatchers CAB SERVICE", "TypeOfCab": "Mini" }];

  ngOnInit() {
  //  console.log("ngOnInit");
  this.filterReport = this._dashData.getItem();

    this.reportService.getVendorNames().subscribe((data ) =>{
      this.vname=data;

  });

  }

  
  constructor(public reportService: ReportService,public _dashData:DashData) {
    // console.log("constructor");
   }


  // Transportation Cost Report ---Start

  //// Stores which fields have been altered by the user....
  altered = {
    hrtax_regular_cab: false,
    uptax_regular_cab: false,
    emp_contrib_regular: false,
    gps_regular_cab: false,
    gstTax_regular_cab:false,
    emp_contrib_shift:false,
    gps_shift_cab: false,
    gstTax_shift_cab:false,
    hrtax_shift_cab: false,
    uptax_shift_cab: false,
    toll_shift_cab: false,
    toll_unscheduled_cab: false,
    gstTax_unscheduled:false,
    standByCab_extraKms:false,
    ratePerKm:false,
    extraMileageCost:false,
    standByCost: false,
    standByTax: false,
    otherCabCost: false,
    otherCabGST:false,
    escortGuardCost: false,
    escortGuardDropDutyCost: false,
    escortGuardTaxes: false,
    tptMobCost: false,
    overallUPtax: false,
    overallHRtax: false,
    overallTaxes: false,
    overallToll: false,
    overallGPS: false,
    foreignExPrice: false
  };
  //// Initialise formError
  formError = {
    hrtax_regular_cab: { error: false, message: '' },
    uptax_regular_cab: { error: false, message: '' },
    emp_contrib_regular: { error: false, message: '' },
    gps_regular_cab: { error: false, message: '' },
    gstTax_regular_cab:{ error: false, message: '' },
    emp_contrib_shift:{ error: false, message: '' },
    gps_shift_cab: { error: false, message: '' },
    gstTax_shift_cab:{ error: false, message: '' },
    hrtax_shift_cab: { error: false, message: '' },
    uptax_shift_cab: { error: false, message: '' },
    toll_shift_cab: { error: false, message: '' },
    toll_unscheduled_cab: { error: false, message: '' },
    gstTax_unscheduled:{ error: false, message: '' },
    standByCab_extraKms:{ error: false, message: '' },
    ratePerKm:{ error: false, message: '' },
    extraMileageCost:{ error: false, message: '' },
    standByCost: { error: false, message: '' },
    standByTax: { error: false, message: '' },
    otherCabCost: { error: false, message: '' },
    otherCabGST:{ error: false, message: '' },
    escortGuardCost: { error: false, message: '' },
    escortGuardDropDutyCost: { error: false, message: '' },
    escortGuardTaxes: { error: false, message: '' },
    tptMobCost: { error: false, message: '' },
    overallUPtax: { error: false, message: '' },
    overallHRtax: { error: false, message: '' },
    overallTaxes: { error: false, message: '' },
    overallToll: { error: false, message: '' },
    overallGPS:{ error: false, message: '' },
    foreignExPrice: { error: false, message: '' }
  };

  // Transportation Cost Report ---END

  toggleFilter(flag) {
    // console.log(flag);
    this.tf = flag;
  }

downloadExcel(){
  console.log("download excel logged");
}

  search() {
    this.showLoader = true;
    if (this.filterType == '') {
      this.showLoader = false;
      return;
    }
    console.log(this.filterType + " " + this.filterValue);

    switch (this.filterType) {

      case "Unschedule_Summary_ByManager":
        this.reportService.getManagerReport(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.managerReport = data;
          this.showLoader = false;
          console.log(data);
        });
        break;

      case "Unschedule_Summary_ByEmployee":
        this.reportService.getEmployeeReport(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.employeeReport = data;
          this.showLoader = false;
          console.log(data);
        }); break;

      case "Unschedule_Summary_ByVendor":
        this.reportService.getVendorReport(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.vendorReport = data;
          this.showLoader = false;
          console.log(data);
        }); break;
      case "Unschedule_Detail_ByVendor":
        this.reportService.getVendorReportDetail(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.vendorDetailReport = data;
          this.showLoader = false;
          console.log(data);
        }); break;
      case "Unschedule_Detail_ByEmployee":
        this.reportService.getEmployeeReportDetail(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.employeeDetailReport = data;
          this.showLoader = false;
          console.log(data);
        }); break;
      case "Unschedule_Detail_ByManager":
        this.reportService.getManagerReportDetail(this.toDate, this.fromDate, this.filterVal).subscribe((data) => {
          this.managerDetailReport = data;
          this.showLoader = false;
          console.log(data);
        }); break;
    }

  }

  // Transportation Cost Report ---Start


  onFilterGo(f) {
    // console.log("form submit");

    var d = new Date();

    if (f.month < (d.getMonth() + 1)) {
      console.log(f.month + "/" + f.year);
    } else {
      alert("Cannot show report until this month is complete.");
    }



  }

  onTptCostForm(f) {
    console.log("In tpt cost");
  }

  // refreshErrorValues(){
  //   this.formError.empQlid.error          = false;
  //   this.formError.empFName.error         = false;
  //   this.formError.empMName.error         = false;
  //   this.formError.empLName.error         = false;
  //   this.formError.empMobNbr.error        = false;
  //   this.formError.empGender.error        = false;
  //   this.formError.rolesId.error          = false;
  //   this.formError.empMgrQlid1.error      = false;
  //   this.formError.empMgrQlid2.error      = false;
  //   this.formError.empAddLine1.error      = false;
  //   this.formError.empAddLine2.error      = false;
  //   this.formError.empZone.error          = false;
  //   this.formError.empPin.error           = false;
  //   this.formError.empPickupArea.error    = false;
  //   this.formError.empHomeNbr.error       = false;
  //   this.formError.empEmergNbr.error      = false;
  //   this.formError.empBloodGrp.error      = false;
    
  //   this.formError.empQlid.message        = '';
  //   this.formError.empFName.message       = '';
  //   this.formError.empMName.message       = '';
  //   this.formError.empLName.message       = '';
  //   this.formError.empMobNbr.message      = '';
  //   this.formError.empGender.message      = '';
  //   this.formError.rolesId.message        = '';
  //   this.formError.empMgrQlid1.message    = '';
  //   this.formError.empMgrQlid2.message    = '';
  //   this.formError.empAddLine1.message    = '';
  //   this.formError.empAddLine2.message    = '';
  //   this.formError.empZone.message        = '';
  //   this.formError.empPin.message         = '';
  //   this.formError.empPickupArea.message  = '';
  //   this.formError.empHomeNbr.message     = '';
  //   this.formError.empEmergNbr.message    = '';
  //   this.formError.empBloodGrp.message    = '';
  // }

  // resetForm(){
  //   // this.refreshErrorValues();
  //   this.transportationCost.        = '';
  //   this.emp.empFName       = '';
  //   this.emp.empMName       = '';
  //   this.emp.empLName       = '';
  //   this.emp.empMobNbr      = '';
  //   this.emp.empGender      = '';
  //   this.emp.rolesId        = '';
  //   this.emp.empMgrQlid1    = '';
  //   this.emp.empMgrQlid2    = '';
  //   this.emp.empAddLine1    = '';
  //   this.emp.empAddLine2    = '';
  //   this.emp.empZone        = '';
  //   this.emp.empPin         = '';
  //   this.emp.empPickupArea  = '';
  //   this.emp.empHomeNbr     = '';
  //   this.emp.empEmergNbr    = '';
  //   this.emp.empBloodGrp    = '';
  // }

  // resetAltered(){
  //   this.altered.hrtax_regular_cab = false;
  //   this.altered.empFName = false;
  //   this.altered.empMName = false;
  //   this.altered.empLName = false;
  //   this.altered.empMobNbr = false;
  //   this.altered.empGender = false;
  //   this.altered.rolesId = false;
  //   this.altered.empMgrQlid1 = false;
  //   this.altered.empMgrQlid2 = false;
  //   this.altered.empAddLine1 = false;
  //   this.altered.empAddLine2 = false;
  //   this.altered.empZone = false;
  //   this.altered.empPin = false;
  //   this.altered.empPickupArea = false;
  //   this.altered.empHomeNbr = false;
  //   this.altered.empEmergNbr = false;
  //   this.altered.empBloodGrp = false;
  // }

  // Transportation Cost Report ---End


}


