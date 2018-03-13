import { RosterService } from './../Services/roster.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {
  module = "roster";
  navLocation = "/ Add Route";

  display=true;
  Numbers=[];  
  b_qlid='';
vendorNameList:any[];

  constructor() { 
  }

  ngOnInit() {
  }

  routeType(typeOfRoute){
    console.log(typeOfRoute.value);
    
    if(typeOfRoute.value=="Scheduled") 
    this.display=true;
    else 
    this.display=false;
    console.log(this.display);
  }

}
