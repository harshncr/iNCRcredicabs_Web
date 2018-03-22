import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  display=true;
  module = "roster";
  navLocation = "/Add Route";
  constructor() { 
  }

  ngOnInit() {
  }

  routeType(typeOfRoute){    
    if(typeOfRoute.value=="Scheduled") 
    this.display=true;
    else 
    this.display=false;
  }

}
