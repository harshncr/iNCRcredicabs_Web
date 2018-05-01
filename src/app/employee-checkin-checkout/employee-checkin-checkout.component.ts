import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
// import { INTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

@Component({
  selector: 'app-employee-checkin-checkout',
  templateUrl: './employee-checkin-checkout.component.html',
  styleUrls: ['./employee-checkin-checkout.component.css']
})
export class EmployeeCheckinCheckoutComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader = true;
  loaderText = "Loading...";
  ////-----------------------------------------

  constructor(private employeeService: EmployeeService) { }

  empData; 
  showError = false;
  showSuccess = false;
  message = '';

  ngOnInit() {
    this.employeeService.employeeDash().subscribe((data) => {
      //// TODO: verify if data is valid
      if(data.success){
        this.empData = data;
      }else{
        console.log('You may not be logged-In!');
      }
    });    
  }

  onCheckin(){
    console.log('Checking in...');
    this.showSuccess = false;
    this.showError = false;
    let today = new Date();
    let dd = today.getDate()+'';
    if(dd.length == 1){
      dd = '0' + dd;
    }

    let mm = today.getMonth()+'';
    if(mm.length == 1){
      mm = '0'+mm;
    }

    let yyyy = today.getFullYear();

    let hh = today.getHours()+'';
    if(hh.length == 1){
      hh = '0'+hh;
    }

    let min = today.getMinutes()+'';
    if(min.length == 1){
      min = '0'+min;
    }

    let ss = today.getSeconds()+'';
    if(ss.length == 1){
      ss = '0'+ss;
    }

    if(this.empData.rosterInfo.length == 0){
      //// TODO: show error!
      this.showError = true;
      this.message = 'You are not in a valid roster!';
      // return;
    }

    let routeNo = this.empData.rosterInfo[0].Route_number;

    let checkInData = {
      Route_No: routeNo,
      Trip_Date: yyyy+'-'+mm+'-'+dd,
      Check_in_Time: hh+':'+min+':'+ss,
      Emp_Qlid: this.empData.empQlid,
      Trip_Type: '',
      Cab_Type: '',
      QRcode: '',
    }

    console.log('sending: ')
    console.log(checkInData);

    this.employeeService.checkin(checkInData).subscribe((data) => {
      console.log(data);
      if(data.result.Check_In == 'Done'){
        console.log('done!');
        this.showSuccess = true;
        this.message = 'Success! You have checked-In!';
      }else if(data.result.Check_In == 'ALREADY'){
        console.log('Already!');
        this.showSuccess = true;
        this.message = 'You have already checked-In!';
      }else{
        console.log('error!');
        this.showError = true;
        this.message = 'Some error occured... Please try again later';
      }
    });
  }

  onCheckout(){
    console.log('Checking out...');
    this.showSuccess = false;
    this.showError = false;

    let today = new Date();
    let dd = today.getDate()+'';
    if(dd.length == 1){
      dd = '0' + dd;
    }

    let mm = (today.getMonth()+1)+'';
    if(mm.length == 1){
      mm = '0'+mm;
    }

    let yyyy = today.getFullYear();

    let hh = today.getHours()+'';
    if(hh.length == 1){
      hh = '0'+hh;
    }

    let min = today.getMinutes()+'';
    if(min.length == 1){
      min = '0'+min;
    }

    let ss = today.getSeconds()+'';
    if(ss.length == 1){
      ss = '0'+ss;
    }

    if(this.empData.rosterInfo.length == 0){
      //// TODO: show error!
      this.showError = true;
      this.message = 'You are not in a valid roster!';
      // return;

    }

    let routeNo = this.empData.rosterInfo[0].Route_number;

    let checkOutData = {
      Route_No: '001',
      // Route_No: routeNo,
      Trip_Date: yyyy+'-'+mm+'-'+dd,
      Check_out_Time: hh+':'+min+':'+ss,
      Emp_Qlid: this.empData.empQlid,
      Trip_Type: '',
      Cab_Type: '',
      QRcode: '',
    }
    console.log('sending: ');
    console.log(checkOutData);

    this.employeeService.checkout(checkOutData).subscribe((data) => {
      // console.log(data);
      if(data.result.Check_out == 'Done'){
        console.log('done!');
        this.showSuccess = true;
        this.message = 'Success! You have checked-Out!';
      }else if(data.result.Check_out == 'ALREADY'){
        console.log('Already!');
        this.showSuccess = true;
        this.message = 'You have already checked-Out!';
      }else{
        console.log('error!');
        this.showError = true;
        this.message = 'Some error occured... Please try again later';
      }
    });
  }
}
