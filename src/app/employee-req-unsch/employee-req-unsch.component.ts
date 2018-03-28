import { Component, OnInit } from '@angular/core';
import { Employee } from '../Model/employee';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-req-unsch',
  templateUrl: './employee-req-unsch.component.html',
  styleUrls: ['./employee-req-unsch.component.css']
})
export class EmployeeReqUnschComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader            = true;
  loaderText            = "Loading...";
  ////-----------------------------------------
  showError = false;


  showDrop:boolean = false;
  showDropTime: boolean = false;
  showPick:boolean = false;
  showPickTime: boolean = false;

  startDateTime;
  endDateTime;
  otherAddr = '';
  reason = '';
  counter = 1;
  dropArea;
  dropTime;
  dropAddress = '';
  pickupArea;
  pickupTime;
  pickupAddress;
  fromDate;
  toDate;
  today;
  pickupMessage = '';
  dropMessage = '';

  message;

  currentManagerSelection;

  showSuccess = false;

  empData;
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.message = '';
    this.today = new Date();
    this.employeeService.employeeManagerDetails().subscribe((data) => {
      this.showLoader = true;
      if(data.success){
        this.empData = data;
        this.showError = false;

        this.currentManagerSelection = 'MANAGER1';
        console.log(data);
      }else{
        this.showError = true;
      }
      this.showLoader = false;
    });
  }

  reformatDate(dt): string{
    dt = dt.replace('Jan', '01');
    dt = dt.replace('Feb', '02');
    dt = dt.replace('Mar', '03');
    dt = dt.replace('Apr', '04');
    dt = dt.replace('May', '05');
    dt = dt.replace('Jun', '06');
    dt = dt.replace('Jul', '07');
    dt = dt.replace('Aug', '08');
    dt = dt.replace('Sep', '09');
    dt = dt.replace('Oct', '10');
    dt = dt.replace('Nov', '11');
    dt = dt.replace('Dec', '12');
    
    return dt;
  }

  validate(){
    this.showError = false;
    if((new Date().getDate()) > new Date(this.fromDate).getDate()){
      this.message += 'From date cannot be before today! ';
      this.showError = true;
    }

    if((new Date().getDate()) > new Date(this.toDate).getDate()){
      this.message += 'To date cannot be before today! ';
      this.showError = true;
    }
  }

  onSave(f){
    console.log(this.fromDate);
    this.validate();
    if(this.showError){
      console.log('Error Encountered!');
    }else{
      let startDateTemp = new Date(this.reformatDate(this.fromDate));
      let endDateTemp = new Date(this.reformatDate(this.toDate));

      let startDateDay = startDateTemp.getDay()+'';
      let startDateMonth = startDateTemp.getMonth()+'';
      let startDateYear = startDateTemp.getFullYear()+'';
      let startDateHours = startDateTemp.getHours()+'';
      let startDateMinutes = startDateTemp.getMinutes()+'';
      let startDateSeconds = startDateTemp.getSeconds()+'';

      if(parseInt(startDateDay) < 10){
        startDateDay = '0' + startDateDay;
      }

      if(parseInt(startDateMonth) < 10){
        startDateMonth = '0' + startDateMonth;
      }

      if(parseInt(startDateHours) < 10){
        startDateHours = '0' + startDateHours;
      }

      if(parseInt(startDateMinutes) < 10){
        startDateMinutes = '0' + startDateMinutes;
      }

      if(parseInt(startDateSeconds) < 10){
        startDateSeconds = '0' + startDateSeconds;
      }

      let endDateDay = startDateTemp.getDay()+'';
      let endDateMonth = startDateTemp.getMonth()+'';
      let endDateYear = startDateTemp.getFullYear()+'';
      let endDateHours = startDateTemp.getHours()+'';
      let endDateMinutes = startDateTemp.getMinutes()+'';
      let endDateSeconds = startDateTemp.getSeconds()+'';

      if(parseInt(endDateDay) < 10){
        endDateDay = '0' + endDateDay;
      }

      if(parseInt(endDateMonth) < 10){
        endDateMonth = '0' + endDateMonth;
      }

      if(parseInt(endDateHours) < 10){
        endDateHours = '0' + endDateHours;
      }

      if(parseInt(endDateMinutes) < 10){
        endDateMinutes = '0' + endDateMinutes;
      }

      if(parseInt(endDateSeconds) < 10){
        endDateSeconds = '0' + endDateSeconds;
      }

      let startDateStr = startDateDay+"-"+startDateMonth+"-"+startDateYear
                          +" "+startDateHours+':'+startDateMinutes+':'+startDateSeconds;

      let endDateStr = endDateDay+"-"+endDateMonth+"-"+endDateYear
                          +" "+endDateHours+':'+endDateMinutes+':'+endDateSeconds;

      console.log('Start Date Str: ' + startDateStr);
      console.log('End Date Str: ' + endDateStr);

      let source = '';
      let destination = '';

      this.otherAddr = this.pickupArea.toUpperCase() + ' TO ' + this.dropArea.toUpperCase();

      if(this.showPick == true){
        source = this.pickupAddress;
      }else{
        source = this.pickupArea;
      }

      if(this.showDrop == true){
        destination = this.pickupAddress;
      }else{
        destination = this.pickupArea;
      }

      let req = {
        Emp_QLID:                 this.empData.empQlid,
        Employee_Name:            this.empData.empName,
        Shift_ID:                 this.empData.shiftId,
        Mgr_QLID:                 this.empData.empMgrQlid1,
        Employee_Manager_1_Name:  this.empData.mgr1Name,
        Employee_Manager_2_Name:  this.empData.mgr2Name,
        Other_Addr:               this.otherAddr,
        Reason:                   this.reason,
        Start_Date_Time:          startDateStr,
        End_Date_Time:            endDateStr,
        Destination:              destination,
        Source:                   source,
        Mgr_QLID_Level1:          this.empData.empMgrQlid1,
        Mgr_QLID_Level2:          this.empData.empMgrQlid2,
        Level1_mgr:               this.empData.mgr1Name,
        Level2_mgr:               this.empData.mgr2Name,
        Counter:                  this.counter
      }

      this.employeeService.unscheduledRequest(req).subscribe((data) => {
        this.showLoader = true;
        if(data != null && data != undefined){
          if(data.status != null && data.status != undefined){
            this.showSuccess = true;
            this.showError = false;
            this.message = 'Success! your request has been submitted, please wait for approval!';
          }else{
            this.showSuccess = false;
            this.showError = true;
            this.message = 'Failed to connect to request server, please try again later!';
          }

          this.showLoader = false;
        }
      });
    }
  }

  printDate(){
    console.log(this.fromDate);
  }

  onSelectedLocation(selectedVal){
    this.showPick = false;
    this.showPickTime = false;
    this.showDrop = false;
    this.showDropTime = false;

    switch(this.pickupArea){
      case 'other':
        this.showPick = true;
        break;
      case 'office':
        this.showPick = false;
        this.showPickTime = true;
        break;
      case 'home':
        this.showPick = false;
        this.showDropTime = true;
        break;
    }

    switch(this.dropArea){
      case 'other':
        this.showDrop = true;
        this.showPickTime = true;
        this.showDropTime = false;
        break;
      case 'office':
        this.showDrop = false;
        this.showDropTime = true;
        break;
      case 'home':
        this.showDrop = false;
        this.showPickTime = true;
        break;
    }

    if(this.pickupArea == this.dropArea && this.pickupArea != 'other'){
      this.showError = true;
      this.pickupMessage = 'Pickup and Drop area cannot be same! ';
      return;
    }

    this.pickupMessage = '';
    if(this.message == ''){
      this.showError = false;
    }
  }
  
  onManagerChange(){
    if(this.currentManagerSelection = 'MANAGER1'){
      this.counter = 1;
    }else{
      this.counter = 2;
    }        
  }
}
