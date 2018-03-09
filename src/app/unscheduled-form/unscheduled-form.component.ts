import { RosterService } from './../Services/roster.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { NewValidators } from './new.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'unscheduled-form',
  templateUrl: './unscheduled-form.component.html',
  styleUrls: ['./unscheduled-form.component.css']
})
export class UnscheduledFormComponent implements OnInit { 

  form=new FormGroup({
    'VendorName': new FormControl('',Validators.required),
    'ShiftTime': new FormControl('',Validators.required),
    'CabNumber': new FormControl('',Validators.required),
    'RouteStartDate': new FormControl('',Validators.required),
    'RouteEndDate': new FormControl('',Validators.required),
    'GuardNeeded': new FormControl(''),
    'Cost':new FormControl(''),
    'NumberOfEmployees': new FormControl('',[
      Validators.required,
      NewValidators.cannotcontainspace,
      NewValidators.cannotcontainalphabets
    ]),
    // 'qlid': new FormControl('',[
    //   Validators.required
    // ]),
    'PickupTime': new FormControl(''),
  });
  
  get NumberOfEmployees(){
    return this.form.get('NumberOfEmployees');
  }
  get VendorName(){
    return this.form.get('VendorName');
  }
  get ShiftTime(){
    return this.form.get('ShiftTime');
  }
  get CabNumber(){
    return this.form.get('CabNumber');
  }
  get RouteStartDate(){
    return this.form.get('RouteStartDate');
  }
  get GuardNeeded(){
    return this.form.get('GuardNeeded');
  }
  get RouteEndDate(){
    return this.form.get('RouteEndDate');
  }
  get qlid(){
    return this.form.get('qlid');
  }
  get PickupTime(){
    return this.form.get('PickupTime');
  }
  
  
  
  display=true;
  qlidlist=[];
  Numbersofemp=[];  
  b_qlid='';
  vendorNameList:any[];
  employee=[];
  newemp=[];
  cablist=[];
  routeexists:boolean[]=[false,false,false,false];
  employeeflag:boolean=false;
  
  constructor(private service:RosterService,private router:Router) { 
  }
  
  ngOnInit() {
    this.service.getVendorDetails()
  .subscribe(response => {
    this.vendorNameList=response.json();
    console.log(this.vendorNameList);
    console.log(JSON.stringify( this.vendorNameList));
  });
  
  this.service.getQlidList()
    .subscribe(response =>{
      this.qlidlist=response.json();
      console.log("qlidlist json= ");
    console.log(response);
    });
  }
  
  routeType(typeOfRoute){
    console.log(typeOfRoute.value);
    
    if(typeOfRoute.value=="Scheduled") 
    this.display=true;
    else 
    this.display=false;
    console.log(this.display);
  }
  
  numberofemp(NumberOfEmployees){
    this.log(NumberOfEmployees);
    this.Numbersofemp=[];
    var jsontext = '{"fname":"","mname":"","lname":"","qlid":"","parea":"","ph":"","route":""}';
    if(this.employee.length==0){
        for( let i=0;i<NumberOfEmployees.value;i++){
          
        this.employee[i]=JSON.parse(jsontext);
        console.log(this.employee.length)
      }
    }
    else if(this.employee.length>NumberOfEmployees.value){
      for(let i=NumberOfEmployees.value;i<this.employee.length;i++){
        
        this.employee.pop();
        console.log(this.employee.length)
      }
    }
    else{
      for(let i=this.employee.length;i<NumberOfEmployees.value;i++){
        console.log(this.employee.length)
        this.employee[i]=JSON.parse(jsontext);
      }
    }
  
    for( let i=0;i<NumberOfEmployees.value;i++)
    {
      this.Numbersofemp[i]=i;
    }
    console.log(this.employee);
  
    console.log(this.Numbersofemp);    
  }
  
  getAvailableCab(ShiftTime,VendorName){
    let cabjson={"shift":ShiftTime.value,
  "vendor": VendorName.value};
    this.service.getAvailableCab(cabjson)
    .subscribe(response=>{
    this.cablist=response.json();
    console.log(this.cablist);
    console.log(JSON.stringify( this.cablist));
    });
    console.log(ShiftTime);
  }
  
  createPost(input: HTMLInputElement){     
    let empqlid= { "qlid": input.value};
   this.service.getEmployeesDetails(empqlid)
    .subscribe(respone =>{
      console.log("input= ");
      console.log(input);
      this.employee[input.name]=(respone.json());
      console.log("respone.json()= ");
      console.log(respone.json());
      console.log("this.employee= ");
      console.log(this.employee);
      console.log("qlidd.name= "+input.name); 
    console.log("this.employee[0].route= ");
    console.log(this.employee[input.name].route);
  
    if((this.employee[input.name].route as string).length>1){
      this.routeexists[input.name]=true;
      console.log(this.routeexists[input.name])
    }
    else{
      this.routeexists[input.name]=false;
      console.log(this.routeexists[input.name])
    }
    
  
    });
  
  
  
  }
  
  deactivateemployee(num,f){       
    let jsonobject= { "qlid": this.employee[num].qlid,"month":f.value.RouteStartDate.substring(5,7),};
    console.log(JSON.stringify(jsonobject));
    this.service.postEmployeeDeactive(jsonobject).subscribe(response=>{
      console.log(jsonobject);
    });
  }
  
  log(qlidd){
    console.log(qlidd);
  
  }
  
  submit(f,VendorName){
   let jsonrespone={};
   let jsonstring=[];
   console.log("form data");
   console.log(f);
   for(let i=0;i<this.employee.length;i++){
    jsonrespone={
      "qlid":this.employee[i].qlid,
      "cost":f.value.Cost,
      "guard":f.value.GuardNeeded,
      "picktime":f.value.PickupTime+i,
      "cabno":f.value.CabNumber,
      "start":f.value.RouteStartDate.substring(8,10),
      "end":f.value.RouteEndDate.substring(8,10),
      "month":f.value.RouteStartDate.substring(5,7),
      "year":f.value.RouteStartDate.substring(0,4),
      "vendor":f.value.VendorName
    };
    jsonstring.push(jsonrespone);
   this.router.navigateByUrl('/roster/go');
   }
    console.log(JSON.stringify(jsonstring));
    this.service.postunscheduledroute(jsonstring)
    .subscribe(
      reponse =>{
        console.log(reponse);
      },
      ()=>this.close()
    );
    
  
  }
  close(){
    alert("Successful");
      this.router.navigateByUrl('/roster/go');  
    }
  }
  