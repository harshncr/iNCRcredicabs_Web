import { Component, OnInit } from '@angular/core';
import {RosterService} from '../Services/roster.service';
import { ElementRef, ViewChild,Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { addEmp } from '../Model/AddEmp';
import {ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css'],
  providers:[RosterService]
})
export class ShowRouteComponent implements OnInit {
  module = "roster";
  navLocation = "/ Show Route";
  d=new Date();

  constructor(private _http1:RosterService,private elem:ElementRef,private ro:ActivatedRoute) {

  }
  showTime(){
    console.log(this.d);
  }
  // @Input('parentData') public uploadchan:any;
  // uploadchange= this.ro.snapshot.params['foo'];

public spinner:boolean=true;

  public uploadValue:boolean=true;
  ae=new addEmp();
 clicked:boolean=false;
  status:boolean=true;
  deleteClicked:boolean=false;
ApplyFilter(){
  this.ngOnInit();
}
RemoveFilter(){
  this.bind_cab_no="";
  this.bind_emp_name="";
  this.bind_qlid="";
  this.bind_shift_i="";
  this.ngOnInit();
}
public isShow:boolean=false;
  public tf:boolean=false;
 public upload_name:string;
 loadUploadMenu:boolean;
  public postcontent=[];
  public bind_emp_name="";
  public bind_qlid="";
  public bind_shift_i="";
  public bind_cab_no="";  
  public Max_arr=[];
  public cab_arr=[];
  public seats_left=[];
  public cab_number=[];
  public max:number=0;
  public shift_arr=[];
  public a1;
  public cab_box_selected;
  public emp_selected;
 public add_emp_qlid=[];
  //form cab number for add
  public form_cab_number;
  public cbox:boolean=false;
  public checkcab;
  public upload_spinner:boolean=false;
  public preventSimpleClick:boolean;
  public timer;
  public cnbr:string;
  public checkingclick:boolean;
  public str:string;
    
  ngOnInit() {
      this.uploadValue=this.ro.snapshot.params['foo'];
      console.log(this.uploadValue);
      // this.showTime();
       this.gettingPostData();
      //  this.showTime();
      this.showfilter=false;  
    this.spinner=true;
  }
  showme(ras):void{
  
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 200;
  
    this.timer = setTimeout(() => {
      if(!this.preventSimpleClick){
     
        this.checkingclick=true;
        this.str=ras;
      
        if(this.cnbr==ras){
          this.str="haha";
          this.cnbr="in";
          // this.ngOnInit();
          // this.str=ras;
  
        
          
  
        }
        if(this.cnbr=="in"){
          this.cnbr="yoyo";
        }
        else{
        this.cnbr=ras;
        }
        
        
        //whatever you want with simple click go here
        console.log("simple click");
      }
    }, delay);
  
  }
  show_filter_down(){
      this.tf=true;
  }

showT(){
  this.showTime();
}
  //fetching filtered data 
  gettingPostData(){
    this.showTime();

    this.Max_arr=[];
    this.cab_arr=[];
    this.cab_number=[];
    this.shift_arr=[];
    this.seats_left=[];
    this.max=0;
    this._http1.postJsonData(this.bind_cab_no,this.bind_qlid,this.bind_shift_i,this.bind_emp_name).subscribe( 
      data => {this.postcontent=JSON.parse(JSON.stringify(data));
        if(this.postcontent.length==0){
       
        }
        else{
          for(let i:number=0;i<=this.postcontent.length;i++){
            this.a1=this.postcontent[i].Cab_number;      
            if(this.cab_arr.length == 0){
              this.cab_arr.push(this.postcontent[i].Cab_number);
               this.Max_arr.push(this.postcontent[i].Route_number);
              this.shift_arr.push(this.postcontent[i].shift_id);
              this.seats_left.push(this.postcontent[i].occu_left);
              this.cab_number.push(this.max);
              this.max++;
            }
            else{
             if(this.cab_arr.indexOf(this.a1) == -1){
             this.cab_arr.push(this.postcontent[i].Cab_number);
              this.Max_arr.push(this.postcontent[i].Route_number);
              this.shift_arr.push(this.postcontent[i].shift_id);
              this.seats_left.push(this.postcontent[i].occu_left);
              this.cab_number.push(this.max);
              this.max++;
            }


            
             }
             this.spinner=false;
            } 
          }
          // this.Max_arr.sort(this.sortFunction);
          for(let r in this.Max_arr){
            console.log(this.Max_arr[r]);
          }
         for(let r in this.shift_arr){
           console.log(this.shift_arr[r]);
         }
         if(this.Max_arr.length == 0)
         alert("No Such Records Found !!! Try again !!!");
        return;
        },
        error => alert("No Such Record Found...."),
      () => console.log("Finished")
     );  
     this.showTime();
}

//upload
upload(){
  this.upload_spinner=true;
  let files=this.elem.nativeElement.querySelector("#uploadFile").files;
  let formdata =new FormData();
  let file=files[0];
  formdata.append('uploadFile',file,file.name);
  this._http1.sendfile(formdata).subscribe(
    ()=>this.complete()
  
  );
 

}
complete(){
  alert("File Uploaded Successfully");
  this.upload_spinner=false;
  this.ngOnInit();
}

add_clicked(s){

  this.clicked=true;
  this.cab_box_selected=s;

 console.log(this.cab_box_selected);
 this._http1.getAddData(this.cab_box_selected).subscribe(
  data => this.add_emp_qlid=JSON.parse(JSON.stringify(data)),
 error =>alert("error aaa gyi"),
 ()=> console.log("All Qlid are present") 
);
}

close_add_popup(){
  this.clicked=false;
this.ngOnInit();
}


message:any;

showfilter:boolean=false;

add_emp(){
this._http1.addEmpToDb(this.emp_selected,this.cab_box_selected).subscribe(
  data=>this.message=JSON.stringify(data),
  error=>console.log(error), 
()=>this.close_add_popup()
);
}
printval;

emp_to_delete;

deleteMe(a)
{
  this.emp_to_delete=a;
  console.log(a);
  this.deleteClicked=true;
}



changeHeader(){
  if(this.uploadValue)
  this.uploadValue=false;
  else
  this.uploadValue=true;
}


checkentry(s){
  this.cbox=(!this.cbox);
  this.checkcab=s;
}

close_delete_popup(){
  this.ngOnInit();
  this.deleteClicked=false;
  }
 
  public editin:boolean;
  public ebox;
 public editcab;
  editinfo(s){
    this.editin=true;
    this.ebox=!this.ebox;
    this.editcab=s;
  }
  deleteEmp(){
    console.log("to delete :- "+this.emp_to_delete);
  return this._http1.deleteQlid(this.emp_to_delete).subscribe(
    data=>this.message=JSON.stringify(data),
    error=>console.log(error), 
  ()=>this.close_delete_popup()
  );
  }

  close_spinner(){
    this.spinner=false;
  }
}
