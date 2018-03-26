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

  show1?:boolean;
  show2?:boolean;

  startDateTime;
  endDateTime;
  otherAddr;
  reason;
  source;
  destination;
  counter;
  dropArea;
  dropTime;
  dropAddress;
  pickupArea;
  pickupTime;
  pickupAddress;
  fromDate;
  toDate;
  today;

  message;

  currentManagerSelection;

  empData;
  
  constructor(private employeeService: EmployeeService) { 
    this.show1=false;
    this.show2=false;
  }

  ngOnInit() {
    //// TODO send request....
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
    if((new Date()) > new Date(this.fromDate)){
      this.message += 'From date cannot be before today! ';
      this.showError = true;
    }

    if((new Date()) > new Date(this.toDate)){
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
      let req = {
        Emp_QLID:         this.empData.empQlid,
        Shift_ID:         this.empData.shiftId,
        Mgr_QLID:         this.empData.empMgrQlid1,
        Mgr_QLID_Level1:  this.empData.empMgrQlid1,
        Mgr_QLID_Level2:  this.empData.empMgrQlid2,
        Level1_mgr:       this.empData.mgr1Name,
        Level2_mgr:       this.empData.mgr2Name,
        Other_Addr:       this.otherAddr,
        Reason:           this.reason,
        Start_Date_Time:  this.reformatDate(this.startDateTime),
        End_Date_Time:    this.reformatDate(this.endDateTime),
        Destination:      this.destination,
        Source:           this.source,
        Counter:          this.counter
      }

      this.employeeService.unscheduledRequest(req).subscribe((data) => {

      });
    }
  }

  printDate(){
    console.log(this.fromDate);
  }

  onSelected1(selected1)
  {
    if(selected1=="other"){
      this.show1=true;
    }else{
      this.show1=false;
    }
  }

  onSelected2(selected2)
  {
    if(selected2=="other")
    this.show2=true;
    else
    this.show2=false;
  }
  
  onManagerChange(){
    
  }
}
