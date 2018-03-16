import { Component, OnInit } from '@angular/core';
import { RequestModel } from '../Model/requestModel';
import { UnscheduledRequestService } from '../Services/unscheduled-request.service';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';


declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-unscheduled-request',
  templateUrl: './unscheduled-request.component.html',
  styleUrls: ['./unscheduled-request.component.css']
})
export class UnscheduledRequestComponent implements OnInit {

  public requests: RequestModel;
  public showReqArr = [];
  public defaultRequest = "Pending";
  public showNoRecord = false;
  public tf = false;
  module = "UNSCHEDULEDREQUEST";
  navLocation = "/ Pending";
  public showAllocateButton = true;
  public filterType = '';

  ////-------------data for loader-------------
  public showLoader = true;
  public loaderText = "Loading...";
  ////-----------------------------------------


  constructor(public unscheduledRequestService: UnscheduledRequestService) {
    // console.log("constructor"); 
    // this.requests = new RequestModel();
  }

  ngOnInit() {
    this.showLoader = true;
    this.unscheduledRequestService.getAllUnscheduledRequest(this.defaultRequest).subscribe(
      (data) => {
        this.showLoader = false;
        if (data.length > 0) {
          this.showNoRecord = false;
          this.requests = data;
          this.initShowDetails(this.requests);
        } else {
          this.requests = data;
          this.showNoRecord = true;
          // console.log("No pending request");
        }
        // console.log(this.requests);
      });

  }

  toggleFilter(flag) {

    // console.log(flag);
    this.tf = flag;
  }

  downloadRequestExcel() {

    var downloadReqArr = [];

    $('.requestDiv').find(':checkbox').each(function () {
      if ($(this).is(':checked')) {
        downloadReqArr.push($(this).val());
      }
    });

    // console.log(downloadReqArr);
  this.unscheduledRequestService.downloadExcelFile(downloadReqArr,this.defaultRequest).subscribe(data=>{
   console.log(data);
  });
  }
  
  allocate() {

    var request_idArr = [];

    $('.requestDiv').find(':checkbox').each(function () {

      if ($(this).is(':checked')) {
        // console.log($(this).val());
        request_idArr.push($(this).val());
      }
    });

    if (request_idArr.length > 0) {
      this.showLoader = true;

      this.unscheduledRequestService.doAllocateRequest(request_idArr).subscribe(
        (data) => {
          // console.log(data);
          this.showLoader = false;
          if (data.length > 0) {
            this.showNoRecord = false;
            this.requests = data;
            this.initShowDetails(this.requests);
          } else {
            this.requests = data;
            this.showNoRecord = true;
            // console.log("No pending request");
          }
        });
    } else {
      alert("No request selected");
    }


  }

  search() {
    // console.log(this.defaultRequest);
    this.showLoader = true;
    this.unscheduledRequestService.getAllUnscheduledRequest(this.defaultRequest).subscribe(
      (data) => {
        this.showLoader = false;
        if (data.length > 0) {
          this.showNoRecord = false;
          this.requests = data;
          this.initShowDetails(this.requests);
        } else {
          this.requests = data;
          this.showNoRecord = true;
          // console.log("No pending request");
        }
        // console.log(this.requests);
      });
    return;
  }

  toggleSelectAll() {

    var checkedStatus = $('#chk_selectAll').is(':checked');

    $('.requestDiv').find(':checkbox').each(function () {
      $(this).prop('checked', checkedStatus);
    });

  }

  initShowDetails(req) {

    for (var i = 0; i < req.length; ++i) {
      this.showReqArr.push(false);
    }
    if (this.defaultRequest === "Allocated") {
      this.navLocation = "/ Allocated";
      this.showAllocateButton = false;
    }else{
      this.navLocation = "/ Pending";
      this.showAllocateButton = true;
    }

    $('#chk_selectAll').prop('checked',false);
    //  console.log(this.showReqArr);
  }

  onShowDetails(i) {
    $('#urqst-' + i).slideDown();
    this.showReqArr[i] = true;
  }

  onHideDetails(i) {
    $('#urqst-' + i).slideUp();
    this.showReqArr[i] = false;
  }

}
