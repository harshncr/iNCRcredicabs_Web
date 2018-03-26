import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RosterService } from '../Services/roster.service';
import { Router } from '@angular/router';


@Component({
  selector: 'edit-route',
  templateUrl: './edit-route.component.html',
  
styleUrls: ['./edit-route.component.css']
})

export class EditRouteComponent implements OnInit {

  module = "roster";
  navLocation = "/Update Route";

  public ven="";
  
  public cno="";
  
  public sid=0;
  
  public rno="";
  public s_date="";
  public e_date="";
  
  public msg;
  
  
    display=true;
   
  
  constructor(http:Http,private _http:RosterService,private router:Router) { 
   
    
  }
   
   ngOnInit() {
      
  this.getRouteData();
      
  this.getCabData();
  
  this.getVendorData();
  }
  
  public route=[];
   resetroute(){
     this.s_date="";
     this.e_date="";
     this.sid=0;
     this.cno="";
     this.ven="";
     this.rno="";

   }
   getRouteData(){
     
   this._http.getAddData1().subscribe(
        data=> this.route=JSON.parse(JSON.stringify(data)),
        
  error=>console.log(error),
        ()=>console.log("Finished get route")
      );
    
  }
    
  public cab=[];
   
   getCabData(){
     
   this._http.getcabData().subscribe(
        data=> this.cab=JSON.parse(JSON.stringify(data)),
        error=>console.log(error),
        ()=>console.log("Finished")
      );
    }
  
    public vendor=[];
   
    getVendorData(){
      
    this._http.getvendorData().subscribe(
         data=> this.vendor=JSON.parse(JSON.stringify(data)),
         error=>console.log(error),
         ()=>console.log("Finished")
       );
     }
   
   public update_route_status:boolean=false;
  public  update_route_status_msg;
  public update_route_return;

    updateroute(){
    
  console.log(this.rno);
     
   console.log(this.cno);
     
   console.log(this.sid);
   console.log(this.ven);
   console.log(this.s_date+" "+ this.e_date);
      this._http.updater(this.rno,this.cno ,this.sid,this.ven,this.s_date,this.e_date).subscribe(
        data=>{this.update_route_return=data;
        if(this.update_route_return.err_type == "exist"){
          this.update_route_status_msg="Route Already Exist with this cabnumber and shift.";
        }
        else if(this.update_route_return.err_type == "fail"){
          this.update_route_status_msg="An Error Occured During Updation.";
        }
        else if(this.update_route_return.err_type == "success"){
          this.update_route_status_msg="Route Successfully Updated.";
        }
        },
        error=>console.log("error"),
        ()=>{this.update_route_status=true;}
      );
   
     console.log(this.msg);
    }
  
    close_update_popup(){
this.update_route_status=false;
    }

  close(){
  // alert("Successful");
    this.router.navigateByUrl('/roster/go');  
  }
  
  }
  
  
  