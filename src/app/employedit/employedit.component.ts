import { Component, OnInit } from '@angular/core';
import { RosterService } from '../Services/roster.service';
import { Http } from '@angular/http/src/http';
import {ActivatedRoute,Params} from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employedit',
  templateUrl: './employedit.component.html',
  styleUrls: ['./employedit.component.css'],
  providers:[RosterService]
})


export class EmployeditComponent implements OnInit {
  module = "roster";
  navLocation = "/Edit Employee";
public bol:boolean=false;
public startd;
public endd;
public standend=[];
public cabno="";
public pickuptime="";
public shifttime="";
public qlid="";
public stime:string;
public etime:string;
public jary:any[];
public cab:any[];
public cnumber=[];
public cabshift=[];
public cabandshift=[];
public cshift:any;
public resultmsg:any;
public ptime:any;


// public stime;
// public etime;

  constructor(private obj:RosterService,private ac:ActivatedRoute,private router:Router) { }
 public e_q;
 public e_c;
 public e_s;
  ngOnInit() {
    
    this.e_q= this.ac.snapshot.params['qlid'];
    this.e_c = this.ac.snapshot.params['cn'];
    this.e_s = this.ac.snapshot.params['sid'];
    if (this.e_s=="1") {
      this.e_s = "07:00 AM - 04:00 PM";
    }
    else if (this.e_s=="2") {
      this.e_s = "10:00 AM - 07:00 PM";
    }
    else if (this.e_s=="3") {
      this.e_s = "12:00 PM - 09:00 PM";
    }
    else if (this.e_s=="4") {
      this.e_s = "Unscheduled";
    }
    else if (this.e_s=="5") {
      this.e_s = "02:00 PM - 11:00 PM";
    }
    console.log("This is the shift id");
    console.log(this.e_s);
    this.startandend();
    this.cab_list();
    // this.cab_list();
  }
  startandend(){
    console.log("this is the start of the startandend method");
    this.obj.getstartandend(this.e_q,this.e_c,this.e_s).subscribe(
      data=>{
        this.standend=JSON.parse(JSON.stringify(data));
        console.log("Successfully arrived sdate and enddate");
       this.startd=(this.standend[0].sdate);
        this.endd=(this.standend[0].edate);
       this.ptime=(this.standend[0].pickt);
       
    
    
    },
      error=>console.log("error"),
      ()=>close()

    );



  }



  editcontent()
  {
      
    this.bol=!this.bol;
    
   
  }

//  public show=[];
//  callme(){
//    for(let i=0;i<this.cab.length;i++){
//      if(this.shifttime==this.cab[i].s_id){
//        this.show.push(this.cab[i].c_n);
//      }
//    }
//  }

public edit_emp_status:boolean=false;
public edit_emp_return;
public edit_emp_msg;
  checking(){
    console.log(this.stime);
      console.log(this.etime);
      console.log("this is cab selected");
      console.log(this.cab_selected);
      this.obj.posteditinfo(this.cab_selected,this.pickuptime,this.e_q,this.stime,this.etime).subscribe(
        data=>{console.log("Successfully Edited")
          this.edit_emp_return=data;
          // console.log(this.resultmsg.msg);
          if(this.edit_emp_return.error_type == "fail"){
            this.edit_emp_msg="An Error occured while editing.";
          }
         
        else  if(this.edit_emp_return.error_type == "success"){
          this.edit_emp_msg="Employee Successfully Edited.";
        }
         else{
          this.edit_emp_msg="Employee Successfully Edited.";
         }
      
      },
        error=>console.log("error"),
        ()=>{this.edit_emp_status=true}
 
      );
      }

      close_edit_popup(){
this.edit_emp_msg=false;
      }

      redirect(){
 
          this.router.navigateByUrl('/roster/go');  
        }

      cab_list(){
        // this.cabandshift.splice(0,this.cabandshift.length);
       this.cabandshift=[];
       this.obj.getcablist(this.e_s,this.e_c).subscribe(
        data => {this.cab=(data);

          if(this.cab.length==0){

          }
          else{
            for(let k:number=0;k<this.cab.length;k++){
                this.cshift=this.cab[k].c_n+" "+this.cab[k].s_id;
                console.log("this is mix");
                console.log(this.cshift);
                this.cabandshift.push(this.cshift);
            }
          }
        
        
        
        },
       error =>alert("error aaa gyi"),
       ()=> console.log("All cabs are present") 
      );
      }
 
      public cab_selected="";
    }
  