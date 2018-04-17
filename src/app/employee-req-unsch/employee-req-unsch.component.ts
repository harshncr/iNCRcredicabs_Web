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
  error = false;


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
  dropTime = '00:00';
  dropAddress = '';
  defaultDropAdd = '';
  showDefaultDropAdd = false;
  homeAddress = '';
  officeAddress = '';
  pickupArea;
  pickupTime = '00:00';
  pickupAddress;
  defaultPickupAdd = '';
  showDefaultPickupAdd = false;
  fromDate;
  toDate;
  today;
  pickupMessage = '';
  dropMessage = '';

  message;

  currentManagerSelection;

  showSuccess = false;

  empData;

  responseJSON;

  formError = {
    fromDate: {error: false, message: ''},
    toDate: {error: false, message: ''},
    pickupArea: {error: false, message: ''},
    pickupTime: {error: false, message: ''},
    dropArea: {error: false, message: ''},
    dropTime: {error: false, message: ''}
  }

  altered = {
    fromDate: false,
    toDate: false,
    pickupArea: false,
    pickupTime: false,
    dropArea: false,
    dropTime: false
  }
  
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.today = new Date();
    this.employeeService.employeeManagerDetails().subscribe((data) => {
      this.showLoader = true;
      if(data.success){
        this.empData = data;
        this.showError = false;

        this.currentManagerSelection = 'MANAGER1';
        console.log(data);
        this.homeAddress = this.empData.empAddLine1 + ', ' + this.empData.empAddLine2;
        this.officeAddress = 'NCR Corporation, 5th Floor, Vipul Plaza, Suncity, Sector 54, Gurgoan';
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
    let toDateSeconds = (new Date(this.toDate)).getTime();
    let todaySeconds = (new Date()).getTime();
    let todayStartOfDaySeconds = todayStartOfDay.getTime();

    // console.log(fromDateSeconds);
    // console.log(toDateSeconds);
    // console.log(todayStartOfDay.getTime());
    // console.log(todayStartOfDaySeconds);

    
    if(this.altered.fromDate){
      if(todayStartOfDaySeconds > fromDateSeconds){
        this.error = true;
        this.formError.fromDate.error = true;
        this.formError.fromDate.message = 'From date cannot be before today!';
      }
    }

    if(this.altered.toDate){
      if(todayStartOfDaySeconds > toDateSeconds){
        this.error = true;
        this.formError.toDate.error = true;
        this.formError.toDate.message = 'To date cannot be before today!';
      }

      if(fromDateSeconds > toDateSeconds){
        this.error = true;
        this.formError.toDate.error = true;
        this.formError.toDate.message = 'To date cannot preceed From Date! ';
      }
    }

    if(this.altered.dropTime){
      if(this.showDropTime && (this.dropTime == '' || this.dropTime == null || this.dropTime == undefined)){
        this.error = true;
        this.formError.dropTime.error = true;      
        this.formError.dropTime.message = 'Please set a drop time....';
      }
    }

    if(this.altered.pickupTime){
      if(this.showPickTime && (this.pickupTime == '' || this.pickupTime == null || this.pickupTime == undefined)){
        this.error = true;
        this.formError.pickupTime.error = true;      
        this.formError.pickupTime.message = 'Please set a pickup time....';
      }
    }

    return this.error;
  }

  onSave(f){
    // console.log(this.fromDate);
    // console.log(this.dropTime);
    
    if(this.validate()){
      console.log('Error Encountered!');
    }else{
      let startDateTemp = new Date(this.reformatDate(this.fromDate));
      let endDateTemp = new Date(this.reformatDate(this.toDate));

      // let startDateDay = startDateTemp.getDay()+'';
      // let startDateMonth = startDateTemp.getMonth()+'';
      // let startDateYear = startDateTemp.getFullYear()+'';
      // let startDateHours = startDateTemp.getHours()+'';
      // let startDateMinutes = startDateTemp.getMinutes()+'';
      // let startDateSeconds = startDateTemp.getSeconds()+'';
      let startDateDay = (startDateTemp.getDate() + 1)+'';
      let startDateMonth = (startDateTemp.getMonth() + 1)+'';
      let startDateYear = startDateTemp.getFullYear()+'';
      // console.log(this.dropTime);
      let startDateHours = (this.pickupTime+'').split(':')[0];
      let startDateMinutes = (this.pickupTime+'').split(':')[1];
      let startDateSeconds = '00';

      if(parseInt(startDateDay) < 10){
        startDateDay = '0' + startDateDay;
      }

      if(parseInt(startDateMonth) < 10){
        startDateMonth = '0' + startDateMonth;
      }

      // if(parseInt(startDateHours) < 10){
      //   startDateHours = '0' + startDateHours;
      // }

      // if(parseInt(startDateMinutes) < 10){
      //   startDateMinutes = '0' + startDateMinutes;
      // }

      // if(parseInt(startDateSeconds) < 10){
      //   startDateSeconds = '0' + startDateSeconds;
      // }

      let endDateDay = (startDateTemp.getDate() + 1)+'';
      let endDateMonth = (startDateTemp.getMonth() + 1)+'';
      let endDateYear = startDateTemp.getFullYear()+'';
      // let endDateHours = startDateTemp.getHours()+'';
      // let endDateMinutes = startDateTemp.getMinutes()+'';
      // let endDateSeconds = startDateTemp.getSeconds()+'';
      let endDateHours = (this.dropTime+'').split(':')[0];
      let endDateMinutes = (this.dropTime+'').split(':')[1];
      let endDateSeconds = '00';

      if(parseInt(endDateDay) < 10){
        endDateDay = '0' + endDateDay;
      }

      if(parseInt(endDateMonth) < 10){
        endDateMonth = '0' + endDateMonth;
      }

      // if(parseInt(endDateHours) < 10){
      //   endDateHours = '0' + endDateHours;
      // }

      // if(parseInt(endDateMinutes) < 10){
      //   endDateMinutes = '0' + endDateMinutes;
      // }

      // if(parseInt(endDateSeconds) < 10){
      //   endDateSeconds = '0' + endDateSeconds;
      // }

      let hh=(parseInt(startDateHours)>parseInt(endDateHours))?startDateHours:endDateHours;
      let mm=(parseInt(startDateMinutes)>parseInt(endDateMinutes))?startDateMinutes:endDateMinutes;
      let ss=(parseInt(startDateSeconds)>parseInt(endDateSeconds))?startDateSeconds:endDateSeconds;


      let startDateStr = startDateYear+"-"+startDateMonth+"-"+startDateDay
              +" "+hh+':'+mm+':'+ss;

      let endDateStr = endDateYear+"-"+endDateMonth+"-"+endDateDay
              +" "+hh+':'+mm+':'+ss;
              
      let source = '';
      let destination = '';

      this.otherAddr = this.pickupArea.toUpperCase() + ' TO ' + this.dropArea.toUpperCase();

      if(this.showDefaultPickupAdd){
        source = this.defaultPickupAdd;
      }else{
        if(this.showPick == true){
          source = this.pickupAddress;
        }else{
          source = this.pickupArea;
        }
      }

      if(this.showDefaultDropAdd){
        destination = this.defaultDropAdd;
      }else{
        if(this.showDrop == true){
          destination = this.dropAddress;
        }else{
          destination = this.dropArea;
        }
      }

      let req = {
        Emp_QLID:                 this.empData.empQlid,
        Employee_Name:            this.empData.empName,
        Shift_ID:                 4,
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

      console.log(req);

      this.employeeService.unscheduledRequest(req).subscribe((data) => {
        this.showLoader = true;
        if(data != null && data != undefined){
          console.log(data);
          if(data.status != null && data.status != undefined){
            this.responseJSON = data;
            this.showSuccess = true;
            this.showError = false;
            if(this.responseJSON != null && this.responseJSON != undefined 
                && this.responseJSON.Request_Id != null && this.responseJSON.Request_Id != undefined
            ){
              this.message = 'Success! your request has been submitted(Req ID: '
                    + this.responseJSON.Request_Id
                    +'), please wait for approval!';
            }else{
              this.message = 'Success! your request has been submitted, please wait for approval!';              
            }
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
    this.refreshErrorValues();
    this.error = false;
    this.showPick = false;
    this.showPickTime = false;
    this.showDrop = false;
    this.showDropTime = false;

    switch(this.pickupArea){
      case 'other':
        this.showPick = true;
        this.showDefaultPickupAdd = false;
        break;
      case 'office':
        this.showPick = false;
        this.showPickTime = true;
        this.defaultPickupAdd = this.officeAddress;
        this.showDefaultPickupAdd = true;
        break;
      case 'home':
        this.showPick = false;
        this.showDropTime = true;
        this.defaultPickupAdd = this.homeAddress;
        console.log('Pickup Address set to: ' + this.defaultPickupAdd);
        this.showDefaultPickupAdd = true;
        break;
    }

    switch(this.dropArea){
      case 'other':
        this.showDrop = true;
        this.showPickTime = true;
        this.showDropTime = false;
        this.showDefaultDropAdd = false;
        break;
      case 'office':
        this.showDrop = false;
        this.showDropTime = true;
        this.defaultDropAdd = this.officeAddress;
        this.showDefaultDropAdd = true;
        break;
      case 'home':
        this.showDrop = false;
        this.showPickTime = true;
        this.defaultDropAdd = this.homeAddress;
        this.showDefaultDropAdd = true;
        break;
    }

    if(this.pickupArea == this.dropArea && this.pickupArea != 'other'){
      // this.showError = true;
      // this.pickupMessage = 'Pickup and Drop area cannot be same! ';
      this.error = true;
      this.formError.pickupArea.error = true;
      this.formError.dropArea.error = true;

      this.formError.pickupArea.message = 'Pickup and Drop areas cannot be the same!';
      this.formError.dropArea.message = 'Pickup and Drop areas cannot be the same!';
      return;
    }

    this.pickupMessage = '';
    if(this.message == ''){
      this.showError = false;
    }
  }
  
  onManagerChange(){
    if(this.currentManagerSelection == 'MANAGER1'){
      this.counter = 1;
    }else{
      this.counter = 2;
    }        
  }

  refreshErrorValues(){
    this.formError = {
      fromDate: {error: false, message: ''},
      toDate: {error: false, message: ''},
      pickupArea: {error: false, message: ''},
      pickupTime: {error: false, message: ''},
      dropArea: {error: false, message: ''},
      dropTime: {error: false, message: ''}
    }
  }
}