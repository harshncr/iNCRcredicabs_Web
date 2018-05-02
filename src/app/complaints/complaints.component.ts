import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  ////-------------data for loader-------------
  showLoader            = false;
  loaderText            = "Loading...";
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

  formError={
    fromDate: {error: false, message: ''},
    pickupDrop: {error: false, message: ''},
    tripType: {error: false, message: ''},
    shiftTime: {error: false, message: ''},
    cabNumber: {error: false, message: ''},
    complaints: {error: false, message: ''},
    comments: {error: false, message: ''}
  }

  altered={
    fromDate:false,
    pickupDrop:false,
    tripType:false,
    shiftTime:false,
    cabNumber:false,
    complaints:false,
    comments:false
  }


  constructor(
    private _employeeService:EmployeeService
  ) {}

  ngOnInit() {
    this.today = new Date();
    // this.tripType="Scheduled";
    this.showLoader = true;
  
    this._employeeService.employeeDash().subscribe((response)=>{
      this.showLoader = false;
      if(response.success){
        this.responseJSON = response;
        this.showError = false;
        this.cabNumber=this.responseJSON.rosterInfor[0].cabNumber;
        // console.log(this.responseJSON);
      }else{
        this.showError = true;
      }
      this.showLoader = false;
    });
  
  }

  validate(){
    this.refreshErrorValues();
    this.error = false;
    this.message = '';
    this.showError = false;

    let todayStartOfDay = new Date();
    todayStartOfDay.setHours(0);
    todayStartOfDay.setMinutes(0);
    todayStartOfDay.setSeconds(0);
    todayStartOfDay.setMilliseconds(0);

    let fromDateSeconds = (new Date(this.fromDate)).getTime();
    let todaySeconds = (new Date()).getTime();
    let todayStartOfDaySeconds = todayStartOfDay.getTime();


    if(this.altered.fromDate){
      if(fromDateSeconds >todayStartOfDaySeconds){
        this.error = true;
        this.formError.fromDate.error = true;
        this.formError.fromDate.message = 'From date cannot be after today!';
      }
    }

    if(this.altered.shiftTime && this.tripType=="Unscheduled")
    {
      if(this.shiftTime.length<0)
      {
        this.error = true;
        this.formError.shiftTime.error = true;
        this.formError.shiftTime.message = 'Required';
      }
    }

    if(this.altered.tripType)
    {
      if(this.tripType.length<0)
      {
        this.error = true;
        this.formError.tripType.error = true;
        this.formError.tripType.message = 'Required';
      }
    }

    return this.error;
  }

  refreshErrorValues(){
    this.formError={
      fromDate: {error: false, message: ''},
      pickupDrop: {error: false, message: ''},
      tripType: {error: false, message: ''},
      shiftTime: {error: false, message: ''},
      cabNumber: {error: false, message: ''},
      complaints: {error: false, message: ''},
      comments: {error: false, message: ''}
    }
  }

  onSave(){

    let request={
      qlid:this.responseJSON.empQlid,
      date: this.fromDate,
      pd: this.pickupDrop,
      type:  this.tripType, 
      comp: this.complaints,
      comments: this.comments,
      // cab:"DL2cp1111"
      cab:this.cabNumber
    }

    this._employeeService.sendFeedback(request).subscribe(
      (response)=>{
        console.log(response);
        if(response)
        {
          this.showSuccess=true;
          this.message="Your feedback has been saved.";
        }

      });
 
  }


}
