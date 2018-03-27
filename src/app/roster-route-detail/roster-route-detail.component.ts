import { Component, OnInit } from '@angular/core';
import {RosterService}  from '../Services/roster.service';

import { Http } from '@angular/http/src/http';
import {ActivatedRoute,Params} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roster-route-detail',
  templateUrl: './roster-route-detail.component.html',
  styleUrls: ['./roster-route-detail.component.css']
})
export class RosterRouteDetailComponent implements OnInit {
  constructor(private obj:RosterService,private ac:ActivatedRoute,private router:Router ) { }

    
  // handling header start
  module = "roster";
  navLocation = "/Route Detail";

  public cab_no;
  public shift_no;
  public route_no;
  public seatleft;
  public empdetails=[];
  public RouteData=[];
  public empvenDetails=[];
  public name=[];
  public qlids=[];
  public names=[];
  public driverid=[];
  public drivernam;
  public drivercont;
  public count=[];

  public max:number=0;

  public ven;
  ngOnInit() {
    this.cab_no=this.ac.snapshot.params['cab'];
    this.shift_no=this.ac.snapshot.params['shift'];
  
  this.seatleft=this.ac.snapshot.params['seats'];
  this.route_no=this.ac.snapshot.params['routes'];
  this.ven=this.ac.snapshot.params['vendor'];
    this.getRouteDetails(this.cab_no,this.shift_no);
  // this.getEmployeeDetails();
  //this.ven=this.ac.snapshot.params['vendor'];
  }
    getRouteDetails(cab_n,shift_n){
      
     this.obj.getRouteData(cab_n,shift_n).subscribe(
      data =>{ this.RouteData=JSON.parse(JSON.stringify(data));
      if(this.RouteData.length==0){
       
      }
      else{
        console.log(this.RouteData.length);
        for(let i:number=0;i<=this.RouteData.length;i++){ 
         
                console.log(this.RouteData[i].qd);
                console.log(this.RouteData[i].name1);
                console.log(this.RouteData[i].name2);
                console.log(this.RouteData[i].mgr);
                console.log(this.RouteData[i].dname);
                console.log(this.RouteData[i].dcont);

          }
         
        }

        },  error =>alert("error aaa gyi"),
     ()=> console.log("All Data is present") 
    );


    }
    add_clicked(s,currentshift){

    
    }

    // getEmployeeDetails(){
    //   this.obj.getRouteDetails(this.cab_no,this.shift_no).subscribe(
    //     data=>this.empvendetails=JSON.stringify(data),
    //     error=>console.log(error), 
    //   ()=>this.close_add_popup()
    //   );
    //   }
    }

