import { Component, OnInit } from '@angular/core';
import {RosterService} from '../Services/roster.service';
import { ElementRef, ViewChild,Input} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { addEmp } from '../Model/AddEmp';
import {ActivatedRoute,Params} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-show-route',
  templateUrl: './show-route.component.html',
  styleUrls: ['./show-route.component.css'],
  providers:[RosterService]
})
export class ShowRouteComponent implements OnInit {
  constructor(private _http1:RosterService,private elem:ElementRef,private ro:ActivatedRoute) {

  }

  // variables start
   
  public text='Loading...';
  public uploadinfo;

  public downloadstatus:boolean=false;
  msg="";
  errorexist:boolean=false;
  public uploadValue:boolean=true;
  ae=new addEmp();
  clicked:boolean=false; // add popup show 
  status:boolean=true;
  deleteClicked:boolean=false;
  public oldshift;
  public newshift;
  public oldroute;
  public newroute;
  public existcount;
  public filter_error:boolean=false;
  public filter_vendor_data=[];
  public editin:boolean;
  public ebox;
 public editcab;
 public editbox;
  // variable ends
  
  // handling header start
  module = "roster";
  navLocation = "/Show Roster";
 

  d=new Date();

  

 

  // filter code start
  public spinner:boolean=true;

  // filter cde ends

  ngOnInit() {
      this.getVendor();
      this.uploadValue=this.ro.snapshot.params['foo'];
      console.log(this.uploadValue);
      // this.showTime();
      this.gettingPostData();
      //  this.showTime();
      this.showfilter=false;
      this.spinner=true;
}


//filter actions starts

// apply filter
    ApplyFilter(){
      if((this.error_cab)||(this.error_name)||(this.error_qlid)){
        this.filter_error=true;
        this.msg='Incorrect Format Data Found  ';
    }
    else{
      this.ngOnInit();
    }
}
//remove filter
RemoveFilter(){
    this.bind_cab_no="";
    this.bind_emp_name="";
    this.bind_qlid="";
    this.bind_shift_i="";
    this.bind_vendor_name="";
    this.error_cab=false;
    this.error_name=false;
    this.error_qlid=false;
    this.error_shift=false;
    this.vendor_filled=false;
    this.filter_error=false;
    this.errorexist=false;
    this.ngOnInit();
}

//filter expand
show_filter_down(){
  this.tf=true;
}

//close filter popup
close_filter_popup(){
  this.filter_error=false;
  }

//vendor for filter
public getVendor(){
  this._http1.getVendorDetails().subscribe(
   data => this.filter_vendor_data=data.json(),
   error =>alert("error aaa gyi"),
  ()=> console.log("All Qlid are present") 
 );
 }

//vendor changed
public change_vendor(){
  if(this.bind_vendor_name.length ){
    this.vendor_filled=true;
  }
  else{
  this.vendor_filled=false;
  }
}


//filter box validations 
error_qlid:boolean=false;
error_name:boolean=false;
error_cab:boolean=false;
error_shift:boolean=false;
public check_qlid(){
if( /^[a-zA-Z0-9- ]*$/.test(this.bind_qlid) == false){
  this.error_qlid=true;
 console.log("special character exist");
}
else{
  if(this.bind_qlid.length >8){ 
  this.error_qlid=true;}
  else{
    this.error_qlid=false;
  }
}
}

public check_name(){
  if( /^[a-zA-Z0-9- ]*$/.test(this.bind_emp_name) == false){
    this.error_name=true;
   console.log("special character exist");
  }
  else{
      this.error_name=false;
  }
  }

  public check_shift(){
    console.log("shift :- "+this.bind_shift_i);
    if(this.bind_shift_i == "4"){
      this.error_shift=true;
     console.log("shift_id is 4");
    }
    else{
        this.error_shift=false;
    }
    }

  public check_cab(){
    if( /^[a-zA-Z0-9- ]*$/.test(this.bind_cab_no) == false){
      this.error_cab=true;
     console.log("special character exist");
    }
    else{
      if(this.bind_qlid.length >10){ 
      this.error_cab=true;}
      else{
        this.error_cab=false;
      }
    }
    }
    
//filter actions ends

//method for getting filter data start
gettingPostData(){
   
  if((this.error_cab)||(this.error_name)||(this.error_qlid)){
    this.filter_error=true;
    this.msg='Incorrect Format Data Found  ';
  }
  else{
    console.log("vendor:- "+this.bind_vendor_name);
  this.Max_arr=[];
  this.cab_arr=[];
  this.cab_number=[];
  this.shift_arr=[];
  this.seats_left=[];
  this.vendor_arr=[];
  this.max=0;
  this.existcount=0;

  this._http1.postJsonData(this.bind_cab_no,this.bind_qlid,this.bind_shift_i,this.bind_emp_name,this.bind_vendor_name).subscribe( 
    data => {this.postcontent=JSON.parse(JSON.stringify(data));
      if(this.postcontent[0].error == "no data"){
        this.msg="No Record Found...";
        this.errorexist=true;
        this.spinner=false;

      }
      else{
        for(let i:number=0;i<=this.postcontent.length;i++){
          this.existcount=0;
          this.a1=this.postcontent[i].Cab_number; 
          // this.a2=this.postcontent[i].Route_number;
          console.log("a1:: "+ this.a1);   
          this.newshift=this.postcontent[i].shift_id;  
          if(this.cab_arr.length == 0){
            this.cab_arr.push(this.postcontent[i].Cab_number);
             this.Max_arr.push(this.postcontent[i].Route_number);
            this.shift_arr.push(this.postcontent[i].shift_id);
            this.seats_left.push(this.postcontent[i].occu_left);
            this.vendor_arr.push(this.postcontent[i].vendor_name);
          //  this.map.set(this.postcontent[i].Cab_number,this.postcontent[i].shift_id );
          //  this.map.get(this.postcontent[i].Cab_number); 
          //  console.log( this.map.get(this.postcontent[i].Cab_number));
            this.cab_number.push(this.max);
            console.log("Pushed Cab "+this.max+"::-  "+this.postcontent[i].Cab_number+" Pushed Shift::-  "+this.postcontent[i].shift_id+" Pushed Route::-  "+this.postcontent[i].Route_number);
            this.max++;
          }
          else{
           if(this.cab_arr.indexOf(this.a1) == -1){
           this.cab_arr.push(this.postcontent[i].Cab_number);
            this.Max_arr.push(this.postcontent[i].Route_number);
            this.shift_arr.push(this.postcontent[i].shift_id);
            this.seats_left.push(this.postcontent[i].occu_left);
            this.cab_number.push(this.max);
            this.vendor_arr.push(this.postcontent[i].vendor_name);
            this.max++;
            console.log("Pushed Cab "+this.max+"::-  "+this.postcontent[i].Cab_number+" Pushed Shift::-  "+this.postcontent[i].shift_id+" Pushed Route::-  "+this.postcontent[i].Route_number);

          }
          else{
              // this.newroute=this.postcontent[i].Route_number;
               for(let x:number=0;x<=this.cab_arr.length;x++){
                 if(this.cab_arr[x] == this.postcontent[i].Cab_number){
                  if(this.shift_arr[x] == this.postcontent[i].shift_id){
                    this.existcount++;
                  }
                 }
               }
            //  if((this.oldshift!=this.newshift) && (this.oldroute != this.newroute)){
             if(this.existcount == 0){  
              this.cab_arr.push(this.postcontent[i].Cab_number);
              this.Max_arr.push(this.postcontent[i].Route_number);
              this.shift_arr.push(this.postcontent[i].shift_id);
              this.seats_left.push(this.postcontent[i].occu_left);
              this.cab_number.push(this.max);
              this.vendor_arr.push(this.postcontent[i].vendor_name);
              this.max++;
              console.log("Pushed Cab "+this.max+"::-  "+this.postcontent[i].Cab_number+" Pushed Shift::-  "+this.postcontent[i].shift_id+" Pushed Route::-  "+this.postcontent[i].Route_number);
            }
          }
           }
           this.spinner=false;
           this.errorexist=false;
          } 
        }
        // this.Max_arr.sort(this.sortFunction);
        for(let r in this.cab_arr){
          console.log(this.cab_arr[r]);
        }
        for(let r in this.Max_arr){
          console.log(this.Max_arr[r]);
        }
       for(let r in this.shift_arr){
         console.log(this.shift_arr[r]);
       }
      return;
      },
    () => console.log("Finished")
   );  
 
}
}

//method for getting filter data ends

public filter_vendors=[];
public vendor_filled:boolean;
public isShow:boolean=false;
  public tf:boolean=false;
 public upload_name:string;
 loadUploadMenu:boolean;
  public postcontent=[];
  public bind_emp_name="";
  public bind_vendor_name="";
  public bind_qlid="";
  public bind_shift_i="";
  public bind_cab_no="";  
  public Max_arr=[];
  public cab_arr=[];
  public vendor_arr=[];
  public seats_left=[];
  public cab_number=[];
  public max:number=0;
  public shift_arr=[];
  public a1;
  public a2;
  public cab_box_selected;
  public emp_selected;
 public add_emp_qlid=[];
  //form cab number for add
  public form_cab_number;
  public currentshift_id;
  public trecord=[];
  public cbox:boolean=false;
  public checkcab;
  public upload_spinner:boolean=false;
  public preventSimpleClick:boolean;
  public timer;
  public cnbr:string;
  public checkingclick:boolean;
  public str:string;
   
  //expand code start
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
  //expand code ends


  //fetching filtered data 

//uploading actions starts

//send excel to server
upload(){
  this.upload_spinner=true;
  let files=this.elem.nativeElement.querySelector("#uploadFile").files;
  let formdata =new FormData();
  let file=files[0];
  formdata.append('uploadFile',file,file.name);
  this._http1.sendfile(formdata).subscribe(
     data =>{this.uploadinfo=JSON.stringify(data);
            console.log(this.uploadinfo.tr);
    
            console.log(this.uploadinfo.eo);
    },
     error=>{ console.log(this.uploadinfo.length);
     for(let i:number=0;i<this.uploadinfo.length;i++){
         console.log(this.uploadinfo[i].tr);
         console.log(this.uploadinfo[i].eo);
     }},
    ()=>{this.uploadPopupClicked=true;this.upload_spinner=false;}
  );
 
}


//adding new employee ( + clicked) starts

add_clicked(s,currentshift){
  this.clicked=true;
  this.cab_box_selected=s;
  this.currentshift_id=currentshift;

 console.log(this.cab_box_selected);
 this._http1.getAddData(this.cab_box_selected,this.currentshift_id).subscribe(
  data => this.add_emp_qlid=JSON.parse(JSON.stringify(data)),
 error =>alert("error aaa gyi"),
 ()=> console.log("All Qlid are present") 
);
}

add_emp_status:boolean;
add_emp_status_msg;
add_return_msg;
add_emp(){
  console.log("add emp Plus :- emp_qlid :- "+this.emp_selected+" cab :- "+this.cab_box_selected+"shift :- "+this.currentshift_id);
 this._http1.addEmpToDb(this.emp_selected,this.cab_box_selected,this.currentshift_id).subscribe(
   data=>{
           this.add_return_msg=data;
           console.log(this.add_return_msg.error_type);
           if(this.add_return_msg.error_type == "success"){
             this.add_emp_status=true;
             this.add_emp_status_msg="Employee Sucessfully Added.";
           }
           else if(this.add_return_msg.error_type == "exist")
           {
            this.add_emp_status=true;
            this.add_emp_status_msg="EmployeeAlready Exist.";
           }
           else{
            this.add_emp_status=true;
            this.add_emp_status_msg="An Error Occured During Addition of employee.";
           }
   },
   error=>console.log(error), 
 ()=>this.close_add_popup()
 );
 }

 close_add_status_popup(){
   this.add_emp_status=false;
 }
// adding new employee (+ clicked ) ends




public message:any;

showfilter:boolean=false;


printval;



//header change starts
changeHeader(){
  if(this.uploadValue)
  this.uploadValue=false;
  else
  this.uploadValue=true;
}
//header change ends

 
//edit emp (pencil clicked) starts
  editinfo(s,shift){
    this.editin=true;
    this.ebox=!this.ebox;
    this.editbox=shift;
    this.editcab=s;
  }
//edit emp (pencil clicked) ends

  //delete emp ( trash clicked)
  public delete_emp_status:boolean=false;
  public delete_emp_status_message;
  public delete_emp_return;
  public emp_shift_to_delete="";
  deleteEmp(){
    console.log("to delete :- "+this.emp_to_delete);
  return this._http1.deleteQlid(this.emp_to_delete,this.emp_shift_to_delete).subscribe(
    data=>{
      this.delete_emp_return=data;
      if(this.delete_emp_return.error_msg == "success"){
        this.delete_emp_status=true;
        this.delete_emp_status_message="Employee Successfully Deactivated."
       }
       else{
          this.delete_emp_status=true;
          this.delete_emp_status_message="Some Error Occured during Deletion"
       }
      // this.common_error();
    },
    error=>console.log(error), 
  ()=>this.close_delete_popup()
  );
  }

  //deactivate action
emp_to_delete;

deleteMe(a,b)
{ 
  this.emp_to_delete=a;
  console.log(a);
  this.emp_shift_to_delete=b;
  this.deleteClicked=true;
}

close_delete_emp_msg(){
  this.delete_emp_status=false;
  
}
//trash clecked

 
//downloading excel starts
  // public download_error_status;
  // public download_error_msg;
  // public download_error_exist:boolean;
  // public downloadexcel(){ 
  //   if((this.error_cab)||(this.error_name)||(this.error_qlid)||(this.error_shift)){
  //     this.filter_error=true;
  //     this.msg='Incorrect Format Data Found  ';
  //   }
  //   else{
  //    this.downloadstatus=true; 
  //   this._http1.downloadExcelData(this.bind_cab_no,this.bind_qlid,this.bind_shift_i,this.bind_emp_name,this.bind_vendor_name).subscribe(
  //     data=>{
  //       this.download_error_status=data;
  //       console.log(this.download_error_status.err_type);
  //       console.log(this.download_error_status.err_in);
  //        if(this.download_error_status.error_type == "fail"){
  //       this.downloadstatus=false; 
  //       this.download_error_exist=true;
  //       this.download_error_msg="Some Error Occured during Downloading."
  //      }
  //      else{
  //         this.download_error_exist=true;
  //         this.downloadstatus=false;
  //         this.download_error_msg="File successfully downloaded.Check Your Desktop."
  //      }
  //     this.downloadstatus=false;
  //     // this.common_error();
  //     },
  //     (error)=>console.log(error),
  //     ()=>this.downloadstatus=false
  //   );
  // }
  // }
//downloading excel ends
public urlpulldata;
  public download_error_status;
  public download_error_msg;
  public download_error_exist:boolean;
  public downloadexcel(){ 
    if((this.error_cab)||(this.error_name)||(this.error_qlid)||(this.error_shift)){
      this.filter_error=true;
      this.msg='Incorrect Format Data Found  ';
    }
    else{
     this.downloadstatus=true; 
    this._http1.downloadExcelData(this.bind_cab_no,this.bind_qlid,this.bind_shift_i,this.bind_emp_name,this.bind_vendor_name).subscribe(
      data=>{
        console.log(data.fileName);
        if(data.fileName!="")
          {
            console.log("data success: ");
            console.log(environment.pullExcelfileUrl);
            // this._http1.getfileurl().subscribe(
            //   data=>{this.urlpulldata=data;
            //   })
              console.log(this.urlpulldata);
            window.open(environment.pullExcelfileUrl+"/"+data.fileName, '_blank');
          }
          else{
            console.log("data fail: "+data.status);
          }  

        this.download_error_status=data;
        console.log("this is the name of filename");
        console.log(this.download_error_status.fileName);
        console.log(this.download_error_status.err_type);
        console.log(this.download_error_status.err_in);
         if(this.download_error_status.error_type == "fail"){
        this.downloadstatus=false; 
        this.download_error_exist=true;
       this.download_error_msg="Some Error Occured during Downloading."
       }
       else{
          this.download_error_exist=true;
          this.downloadstatus=false;
          this.download_error_msg="File successfully downloaded."
       }
      this.downloadstatus=false;
      // this.common_error();
      },
      (error)=>console.log(error),
      ()=>this.downloadstatus=false
    );
  }
  }
//downloading excel ends






//route expand start
public checkshift;
checkentry(s,shift){
  this.cbox=(!this.cbox);
  this.checkcab=s;
  this.checkshift=shift;
}
//route expand ends

//popups actions start
  close_dowload_error_popup(){
   this.download_error_exist=false;
  }


    close_error_popup(){
      this.errorexist=false;
      this.RemoveFilter();
    }
    
//open upload popup
public uploadPopupClicked:boolean=false;
open_upload_popup(){
this.upload_spinner=false;
this.uploadPopupClicked=true;
console.log("finished");
}

//close upload popup
close_upload_popup(){
  this.upload_spinner=false;
  this.uploadPopupClicked=false;
  this.ngOnInit();
}

//close main spinner
close_spinner(){
  this.spinner=false;
}

//close delete popup
close_delete_popup(){
  if((this.emp_to_delete.length)&&(this.emp_shift_to_delete.length)){
  this.deleteClicked=false;
  }
  else{
    this.deleteClicked=false;
  }
  this.ngOnInit();
  }
  
// close add popup  
close_add_popup(){
  if((this.emp_selected.length)||(this.cab_box_selected.length)||(this.currentshift_id.length))
  {
    this.clicked=false;
   
  }
  else{
    console.log("false run");
  this.clicked=false;
 
  }
  this.ngOnInit();
}
//popups action ends


    // public common_error_msg="";
    // public common_error_in="";
    // public common_error_type="";
    // public common_error_exist:boolean=false;

    // public common_error(){
    //   console.log(this.download_error_status.error_in +" "+this.download_error_status.error_type );
    //   this.common_error_exist=true;
    // if(this.download_error_status.error_in === "download_excel"){
    //    console.log("chle gya");
    //    if(this.common_error_type === "success"){
    //     console.log("success");
    //      this.common_error_msg="Roster Successfully Downloaded";
    //    }
    //    else{
    //     this.common_error_msg="Some Error Occured During Roster Download";
    //    }
    //    console.log("exist "+this.common_error_exist);
    //   console.log("msg :- "+this.common_error_msg);
    //   console.log("error type :- "+this.common_error_type);
    // } 
    
    // if(this.download_error_status.error_in == "upload_excel"){
    //   if(this.common_error_type == "success"){
    //     this.common_error_msg="Roster Successfully Uploaded";
    //   }
    //   else{
    //    this.common_error_msg="Some Error Occured During Roster Upload";
    //   }
    // }

    // if(this.download_error_status.error_in == "add_employee"){
    //   if(this.common_error_type == "success"){
    //     this.common_error_msg="Employee Successfully Added";
    //   }
    //   else if(this.common_error_type == "exist"){
    //     this.common_error_msg="Employee Already Exist In Another Route.";
    //   }
    //   else{
    //    this.common_error_msg="Some Error Occured During Employee Addition";
    //   }
    // }

    // if(this.download_error_status.error_in == "delete_employee"){
    //   if(this.common_error_type == "success"){
    //     this.common_error_msg="Employee Successfully Deleted";
    //   }
    //   else{
    //    this.common_error_msg="Some Error Occured During Employee Deletion";
    //   }
    // }
    // }
}
