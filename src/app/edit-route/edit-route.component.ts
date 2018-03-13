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
  navLocation = "/ Edit Route";

public cno="";

public sid=0;

public rno;

public msg;


  display=true;
 

constructor(http:Http,private _http:RosterService,private router:Router) { 
 
  
}
 
 ngOnInit() {
    
this.getRouteData();
    
this.getCabData();
  
}

public route=[];
 
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


  updateroute(){

    
console.log(this.rno);
   
 console.log(this.cno);
   
 console.log(this.sid);
    

    this._http.updater(this.rno,this.cno ,this.sid).subscribe(
      data=>console.log("off"),
      error=>console.log("error"),
      ()=>this.close()
    );
 
   console.log(this.msg);
  }

close(){
alert("Successful");
  this.router.navigateByUrl('/roster/go');  
}

}

