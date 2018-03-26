import { Validators } from '@angular/forms';
import { RosterService } from './../Services/roster.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NewValidators } from './new.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'scheduled-form',
  templateUrl: './scheduled-form.component.html',
  styleUrls: ['./scheduled-form.component.css']
})
export class ScheduledFormComponent implements OnInit{ 

form=new FormGroup({
  'VendorName': new FormControl('',Validators.required),
  'ShiftTime': new FormControl('',Validators.required),
  'CabNumber': new FormControl('',Validators.required),
  'CabDriver': new FormControl('',Validators.required),
  'RouteStartDate': new FormControl('',Validators.required),
  'RouteEndDate': new FormControl('',Validators.required),
  'Cost':new FormControl('',[
    Validators.required,
    NewValidators.cannotcontainalphabets,
    NewValidators.cannotcontainspecialcharacters,
    NewValidators.cannotstartwithzero
  ]),
  'GuardNeeded': new FormControl(''),
  'NumberOfEmployees': new FormControl('',Validators.required)
});

get NumberOfEmployees(){
  return this.form.get('NumberOfEmployees');
}
get VendorName(){
  return this.form.get('VendorName');
}
get CabDriver(){
  return this.form.get('CabDriver');
}
get ShiftTime(){
  return this.form.get('ShiftTime');
}
get Cost(){
  return this.form.get('Cost');
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

clicked:boolean=true;
display=true;
qlidlist=[];
Numbersofemp=[];  
b_qlid='';
vendorNameList:any[];
employee=[];
newemp=[];
cablist=[];
routeexists:boolean[]=[];
employeeflag:boolean=false;
numberofseats:number[]=[];
routeexistserror:string="";
cabdriverlist:any=[];

constructor(private service:RosterService,private router:Router) { 
}

ngOnInit() {
  this.service.getVendorDetails()
.subscribe(response => {
  this.vendorNameList=response.json();
});
this.service.getQlidList()
  .subscribe(response =>{
    this.qlidlist=response.json();
  });
  this.service.getdriverdetails()
  .subscribe(response =>{
    this.cabdriverlist= response.json();
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

numberofemp(NumberOfEmployeeees){
  this.Numbersofemp=[];
  var jsontext = '{"fname":"","mname":"","lname":"","qlid":"","parea":"","ph":"","route":""}';
  if(this.employee.length==0){
      for( let i=0;i<NumberOfEmployeeees.value;i++){
      this.employee[i]=JSON.parse(jsontext);
    }
  }
  else if(this.employee.length>NumberOfEmployeeees.value){
    for(let i=NumberOfEmployeeees.value;i<=this.employee.length;i++){
      this.employee.pop();
    }
  }
  else{
    for(let i=this.employee.length;i<NumberOfEmployeeees.value;i++){
      this.employee[i]=JSON.parse(jsontext);
    }
  }

  for( let i=0;i<NumberOfEmployeeees.value;i++)
  {
    this.Numbersofemp[i]=i;
  }  
}

getAvailableCab(ShiftTime){
  this.cablist=[];
  this.numberofseats=[];
  let cabjson={"shift":ShiftTime.value};
  this.service.getAvailableCab(cabjson)
  .subscribe(response=>{
  this.cablist=response.json();
  });
}

getnumberofseats(CabNumber){
  this.numberofseats=[];
  for(let i=0;i<parseInt((CabNumber.value as string).split(" ")[1]);i++)
    this.numberofseats[i]=i+1;
}

createPost(input: HTMLInputElement,f){    
  let empqlid= { "qlid":input.value,
"date":"f.value.RouteStartDate"};
console.log(input.value+f.value.RouteStartDate);
  this.routeexists=[];
 this.service.getEmployeesDetails(empqlid)
  .subscribe(respone =>{
    this.employee[input.name]=(respone.json());
  if((this.employee[input.name].route as string).length>1){
    this.routeexists[input.name]=true;
    this.routeexistserror=this.employee[input.name].fname+" "+this.employee[input.name].lname+" with qlid "+this.employee[input.name].qlid+" already exits on route number "+this.employee[input.name].route;
    this.clicked=true;
  }
  else{
    this.routeexists[input.name]=false;
    this.clicked=false;
  }
  console.log(this.employee);
  this.checkduplicateqlid();
  });
}


deactivateemployee(num,f){       
  console.log(num);
  let jsonobject= { "qlid": this.employee[num].qlid,"startdate":f.value.RouteStartDate};
  console.log(JSON.stringify(jsonobject));
  this.clicked=false;
  this.service.postEmployeeDeactive(jsonobject).subscribe(
    response=>{
    console.log(jsonobject);
  },error=>{
    var jsontext = '{"fname":"","mname":"","lname":"","qlid":"","parea":"","ph":"","route":""}';
    this.employee[num]=JSON.parse(jsontext);
  });
}

log(qlidd){
  console.log(qlidd);

}
success:boolean=false;
error:boolean=false;
submit(f){
  console.log("f.value.start= "+ f.value.RouteStartDate);
 let jsonrespone={};
 let jsonstring=[];
 console.log("form data");
 console.log(f);
 if(!this.checkemptyqlid()&&!this.checkduplicateqlid()){ 
 for(let i=0;i<this.employee.length;i++){
  jsonrespone={
    "qlid":this.employee[i].qlid,
    "shift":f.value.ShiftTime,
    "guard":f.value.GuardNeeded,
    "dname":(f.value.CabDriver as string).split(" ")[0],
    "dph":(f.value.CabDriver as string).split(" ")[1],
    "picktime":this.PickupTime[i],
    "cabno":(f.value.CabNumber as string).split(" ")[0],
    "start":f.value.RouteStartDate,
    "end":f.value.RouteEndDate,
    "vendor":f.value.VendorName,
    "cost":f.value.Cost
  };
  jsonstring.push(jsonrespone);

 }
  console.log(JSON.stringify(jsonstring));
  
  this.service.postscheduledroute(jsonstring)
  .subscribe(
    reponse =>{
      console.log(reponse);
      this.success=true;
    },error=>{
      this.error=true;

    });
}

}



duplicateqlid:boolean;
  
checkduplicateqlid(){
  console.log("before duplicate=");
  console.log(this.employee);
   this.duplicateqlid=false;
     for(let i=0;i<this.employee.length;i++){
     for(let j=0;j<this.employee.length;j++){
       if(i!=j){
         if(this.employee[i].qlid!=""&&this.employee[j].qlid!=""&&this.employee[i].qlid==this.employee[j].qlid){
           this.duplicateqlid=true;
           console.log("duplicate");
         }
         }
       }
       if(this.duplicateqlid==true)
       break;
     }
     console.log("after duplicate=");
  console.log(this.employee);
  return this.duplicateqlid;
   
 }

 emptyqlid:boolean
 checkemptyqlid(){
   this.emptyqlid=false;
   for(let i=0;i<this.employee.length;i++){
     if(this.employee[i].qlid==""){ 
     this.emptyqlid=true;
     console.log("empty");
     break;
     }
 }
 console.log(this.emptyqlid);
 return this.emptyqlid;
}

PickupTime=[];
createTime(PickupTime: HTMLInputElement){   
  console.log("PickupTime.name= "+PickupTime.name);
  console.log("PickupTime.value= "+PickupTime.value);
    this.PickupTime[PickupTime.name]=PickupTime.value;
}

closeemptyqlid(){
 this.emptyqlid=false;
}

closeduplicateqlid(){
 this.duplicateqlid=false;
}

redirect(){

 this.success=false;
 this.router.navigateByUrl('/roster/go');  

}

close_add_popup(num){
  console.log(num);
  this.clicked=false;
  var jsontext = '{"fname":"","mname":"","lname":"","qlid":"","parea":"","ph":"","route":""}';
  this.employee[num]=JSON.parse(jsontext);

}

closeerror(){
  this.error=false;
}






}
