import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee';
import { EmployeeService } from '../Services/employee.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  ////-------------data for loader-------------
  showLoader = false;
  loaderText = "Loading...";
  ////-----------------------------------------
  showError = false;
  error = false;
  showSuccess = false;
  message;
  responseJSON;
  today;
  fromDate;
  pickupDrop;
  tripType;
  shiftTime;
  cabNumber;
  complaints;
  comments;

  formError = {
    fromDate: { error: false, message: '' },
    pickupDrop: { error: false, message: '' },
    tripType: { error: false, message: '' },
    shiftTime: { error: false, message: '' },
    cabNumber: { error: false, message: '' },
    complaints: { error: false, message: '' },
    comments: { error: false, message: '' }
  }

  altered = {
    fromDate: false,
    pickupDrop: false,
    tripType: false,
    shiftTime: false,
    cabNumber: false,
    complaints: false,
    comments: false
  }


  constructor(
    private _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.today = new Date();
    this.showSuccess = false;
    this.showLoader = true;

    this._employeeService.employeeDash().subscribe((response) => {
      this.showLoader = false;
      if (response.success) {
        this.responseJSON = response;
        this.showError = false;
        this.cabNumber = this.responseJSON.rosterInfo[0].Cab_number;
        // console.log(this.responseJSON);
      } else {
        this.showError = true;
      }
      this.showLoader = false;
    });

  }

  validate() {
    this.refreshErrorValues();
    this.error = false;
    this.message = '';
    this.showError = false;

    let todayStartOfDay = new Date();
    todayStartOfDay.setHours(0);
    todayStartOfDay.setMinutes(0);
    todayStartOfDay.setSeconds(0);
    todayStartOfDay.setMilliseconds(0);

    let fromDateTemp = new Date(this.fromDate);
    fromDateTemp.setHours(0);
    fromDateTemp.setMinutes(0);
    fromDateTemp.setSeconds(0);
    fromDateTemp.setMilliseconds(0);

    let fromDateTemp2 = (new Date(fromDateTemp)).getTime();
    let todayDateTemp = todayStartOfDay.getTime();

    if (this.altered.fromDate) {
      
      if(fromDateTemp2 < 0 || fromDateTemp2 == null || typeof fromDateTemp2 == "undefined"){
        this.error = true;
        this.formError.fromDate.error = true;
        this.formError.fromDate.message = 'Ride date is required!';
      }

      if (fromDateTemp2 > todayDateTemp ) {
        this.error = true;
        this.formError.fromDate.error = true;
        this.formError.fromDate.message = 'Ride date cannot be after today!';
      }
    }

    if (this.altered.shiftTime && this.tripType == "Unscheduled") {
      if (this.shiftTime.length < 0 || this.shiftTime == '' || this.shiftTime == null || typeof this.shiftTime == "undefined") {
        this.error = true;
        this.formError.shiftTime.error = true;
        this.formError.shiftTime.message = 'Required';
      }
    }

    if (this.altered.tripType) {
      if (this.tripType.length < 0 || this.tripType == '' || this.tripType == null || typeof this.tripType == "undefined" ) {
        this.error = true;
        this.formError.tripType.error = true;
        this.formError.tripType.message = 'Required';
      }
    }

    return this.error;
  }

  refreshErrorValues() {
    this.formError = {
      fromDate: { error: false, message: '' },
      pickupDrop: { error: false, message: '' },
      tripType: { error: false, message: '' },
      shiftTime: { error: false, message: '' },
      cabNumber: { error: false, message: '' },
      complaints: { error: false, message: '' },
      comments: { error: false, message: '' }
    }
  }

  onSave() {

    if (this.validate()) {
      let request = {
        qlid: this.responseJSON.empQlid,
        date: this.fromDate,
        pd: this.pickupDrop,
        type: this.tripType,
        comp: this.complaints,
        comments: this.comments,
        cab: this.cabNumber
      }

      this._employeeService.sendFeedback(request).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            this.showSuccess = true;
            this.message = "Your feedback has been saved.";
          }

        });
    }else{
      alert("Fill details");
    }


  }


}
