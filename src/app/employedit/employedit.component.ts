import { Component, OnInit } from '@angular/core';
import { RosterService } from '../Services/roster.service';
import { Http } from '@angular/http/src/http';
import {ActivatedRoute,Params} from '@angular/router';


@Component({
  selector: 'app-employedit',
  templateUrl: './employedit.component.html',
  styleUrls: ['./employedit.component.css'],
  providers:[RosterService]
})


export class EmployeditComponent implements OnInit {
public bol:boolean=false;
public cabno="";
public pickuptime="";
public shifttime="";
public qlid="HG250097";
public stime:string;
public etime:string;
public jary:any[];
public cab:any[];

// public stime;
// public etime;

  constructor(private obj:RosterService,private ac:ActivatedRoute) { }
 public e_q;
  ngOnInit() {
    this.e_q= this.ac.snapshot.params['qlid'];
  }

  editcontent()
  {
      
    this.bol=!this.bol;
    
    this.cab_list();
  }

//  public show=[];
//  callme(){
//    for(let i=0;i<this.cab.length;i++){
//      if(this.shifttime==this.cab[i].s_id){
//        this.show.push(this.cab[i].c_n);
//      }
//    }
//  }

  checking(){
    console.log(this.stime);
      console.log(this.etime);
      console.log(this.shifttime);
      this.obj.posteditinfo(this.cab_selected,this.pickuptime,this.e_q,this.stime,this.etime).subscribe(
        data=> console.log("change saved"),
        error=>console.log("error"),
        ()=>console.log("finished")
 
      );
      }

      cab_list(){
       this.obj.getcablist().subscribe(
        data => this.cab=JSON.parse(JSON.stringify(data)),
       error =>alert("error aaa gyi"),
       ()=> console.log("All cabs are present") 
      );
      }
 
      public cab_selected="";
    }
  