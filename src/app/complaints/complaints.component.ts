import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

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
 
 
  constructor() { }

  ngOnInit() {
    this.today = new Date();
    this.showLoader = false;
  }

}
