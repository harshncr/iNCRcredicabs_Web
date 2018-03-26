import { RosterService } from './../Services/roster.service';
import { Component, OnInit } from '@angular/core';
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

  form = new FormGroup({
    'VendorName': new FormControl('', Validators.required),
    'CabNumber': new FormControl('', [
      Validators.required,
    NewValidators.invalidcabnumber]),
    'RouteStartDate': new FormControl('', Validators.required),
    'RouteEndDate': new FormControl('', Validators.required),
    'GuardNeeded': new FormControl(''),
    'Cost':new FormControl('',[
      Validators.required,
      NewValidators.cannotcontainalphabets,
      NewValidators.cannotcontainspecialcharacters,
      NewValidators.cannotstartwithzero
    ]),
    'NumberOfEmployees': new FormControl('', Validators.required),
    
  });

  get NumberOfEmployees() {
    return this.form.get('NumberOfEmployees');
  }
  get VendorName() {
    return this.form.get('VendorName');
  }
  get ShiftTime() {
    return this.form.get('ShiftTime');
  }
  get CabNumber() {
    return this.form.get('CabNumber');
  }
  get RouteStartDate() {
    return this.form.get('RouteStartDate');
  }
  get GuardNeeded() {
    return this.form.get('GuardNeeded');
  }
  get RouteEndDate() {
    return this.form.get('RouteEndDate');
  }
  get Cost() {
    return this.form.get('Cost');
  }



  display = true;
  qlidlist = [];
  Numbersofemp = [];
  b_qlid = '';
  vendorNameList: any[];
  employee = [];
  newemp = [];
  cablist = [];
  routeexists: boolean[] = [];
  employeeflag: boolean = false;
  numberofseats: number[] = [1, 2, 3, 4];
  

  constructor(private service: RosterService,private router:Router) {
  }

  ngOnInit() {
    this.service.getVendorDetails()
      .subscribe(response => {
        this.vendorNameList = response.json();
      });
    this.service.getQlidList()
      .subscribe(response => {
        this.qlidlist = response.json();
      });
  }

  routeType(typeOfRoute) {
    if (typeOfRoute.value == "Scheduled")
      this.display = true;
    else
      this.display = false;
  }

  numberofemp(NumberOfEmployees) {
    this.Numbersofemp = [];
    var jsontext = '{"fname":"","mname":"","lname":"","qlid":"","parea":"","ph":"","route":""}';
    if (this.employee.length == 0) {
      for (let i = 0; i < NumberOfEmployees.value; i++) {
        this.employee[i] = JSON.parse(jsontext);
        this.PickupArea[i]="";
        this.DropType[i]="Home to Office";
      }
    }
    else if (this.employee.length > NumberOfEmployees.value) {
      for (let i = NumberOfEmployees.value; i <=this.employee.length; i++) {

        this.employee.pop();
        this.PickupArea.pop();
        this.DropType.pop();
      }
    }
    else {
      for (let i = this.employee.length; i <NumberOfEmployees.value; i++) {
        this.employee[i] = JSON.parse(jsontext);
        this.PickupArea[i]="";
        this.DropType[i]="Home to Office";
      }
    }
    for (let i = 0; i < NumberOfEmployees.value; i++) {
      this.Numbersofemp[i] = i;
    }
  }

  getAvailableCab(ShiftTime, VendorName) {
    let cabjson = {
      "shift": ShiftTime.value,
      "vendor": VendorName.value
    };
    this.service.getAvailableCab(cabjson)
      .subscribe(response => {
        this.cablist = response.json();
      });
  }

  createPost(input: HTMLInputElement,f){    
    let empqlid= { "qlid":input.value,
    "date":"f.value.RouteStartDate"};
   this.service.getEmployeesDetails(empqlid)
    .subscribe(respone =>{
      this.employee[input.name]=(respone.json());
      console.log(this.employee);
      this.checkduplicateqlid();
      
    });
    console.log(this.employee);
  }
  PickupTime=[];
  createTime(PickupTime: HTMLInputElement){   
    console.log("PickupTime.name= "+PickupTime.name);
    console.log("PickupTime.value= "+PickupTime.value);
      this.PickupTime[PickupTime.name]=PickupTime.value;
  }

  deactivateemployee(num, f) {
    let jsonobject = { "qlid": this.employee[num].qlid, "month": f.value.RouteStartDate.substring(5, 7), };
    console.log(JSON.stringify(jsonobject));
    this.service.postEmployeeDeactive(jsonobject).subscribe(response => {
      console.log(jsonobject);
    });
  }
  PickupArea=[];
  createPickupArea(PickupArea:HTMLInputElement){
    console.log("PickupTime.name= "+PickupArea.name);
    console.log("PickupTime.value= "+PickupArea.value);
    this.PickupArea[PickupArea.name]=PickupArea.value;

  }
  DropType=[];
  createDropType(DropType:HTMLInputElement){

    console.log("DropType.name= "+DropType.name);
    console.log("DropType.value= "+DropType.value);
    this.DropType[DropType.name]=DropType.value;
    
  }

  log(qlidd) {
    console.log(qlidd);
  }

  success:boolean=false;
  error:boolean=false;
  submit(f) {
    console.log("f.value.start= "+ f.value.start);
    console.log("before submit=");
    console.log(this.employee);
    let jsonrespone={};
    let jsonstring=[];
    let temppickup;
    console.log("form data");
    console.log(f);
    if(!this.checkemptyqlid()&&!this.checkduplicateqlid()){ 
    for(let i=0;i<this.employee.length;i++){
      if(this.PickupArea[i]==""){
      temppickup=this.employee[i].parea;
      }
      else{
        temppickup=this.PickupArea[i];        
      }
     jsonrespone={
       "qlid":this.employee[i].qlid,
       "guard":f.value.GuardNeeded,
       "picktime":this.PickupTime[i],
       "pickup":temppickup,
       "drop":this.DropType[i],
       "start":f.value.RouteStartDate,
       "end":f.value.RouteEndDate,
       "vendor":f.value.VendorName,
       "cost":f.value.Cost,
       "cabno":f.value.CabNumber,
     };

    console.log(jsonstring);
     jsonstring.push(jsonrespone);
     
   
    }
    
    console.log(JSON.stringify(jsonstring));
    this.service.postunscheduledroute(jsonstring)
      .subscribe(
        reponse => {
          console.log(reponse);
          this.success=true;
        },error=>{
          this.error=true;

        }
        

      );
  
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

  closeerror(){
    this.error=false;
  }






















}
