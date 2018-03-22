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
  d=new Date();
 public text='Loading...';
 public uploadinfo=[];
  constructor(private _http1:RosterService,private elem:ElementRef,private ro:ActivatedRoute) {

  }


  msg="";
  errorexist:boolean=false;
  module = "roster";
  navLocation = "/Show Roster";
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
  if((this.error_cab)||(this.error_name)||(this.error_qlid)){
    this.filter_error=true;
    this.msg='Incorrect Format Data Found  ';
}
else{
  this.ngOnInit();
}
}
RemoveFilter(){
  this.bind_cab_no="";
  this.bind_emp_name="";
  this.bind_qlid="";
  this.bind_shift_i="";
  this.bind_vendor_name="";
  this.vendor_filled=false;
  this.ngOnInit();
}
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
 public  map = new Map<string, string>(); 
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
    ngOnInit() {
      this.getVendor();
      this.check_qlid();
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
public oldshift;
public newshift;
public oldroute;
public newroute;
public existcount;
public filter_error:boolean=false;

  //fetching filtered data 
  gettingPostData(){
    this.showTime();
    if((this.error_cab)||(this.error_name)||(this.error_qlid)){
      this.filter_error=true;
      this.msg='Incorrect Format Data Found  ';
    }
    else{
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
     this.showTime();
 }
}

public change_vendor(){
  if(this.bind_vendor_name.length ){
    this.vendor_filled=true;
  }
  else{
  this.vendor_filled=false;
  }
}
//upload
upload(){
  this.upload_spinner=true;
  let files=this.elem.nativeElement.querySelector("#uploadFile").files;
  let formdata =new FormData();
  let file=files[0];
  formdata.append('uploadFile',file,file.name);
  this._http1.sendfile(formdata).subscribe(
     data =>{this.uploadinfo=data.json();
  
          console.log(this.uploadinfo);
         // console.log(this.uploadinfo[0].tr);
          for(let i:number=0;i<this.uploadinfo.length;i++){
        this.trecord=this.uploadinfo[i].tr;
        this.trecord=this.uploadinfo[i].eo;
          }
            console.log(this.trecord);
    
    
    },
     error=>{ console.log(this.uploadinfo.length);
     for(let i:number=0;i<this.uploadinfo.length;i++){
         console.log(this.uploadinfo[i].tr);
         console.log(this.uploadinfo[i].eo);
     }},
    ()=>this.uploadPopupClicked=true,
  );
 

}
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
// complete(){

//   this.open_upload_popup();
// }

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

public filter_vendor_data=[];
public getVendor(){
 this._http1.getVendorDetails().subscribe(
  data => this.filter_vendor_data=data.json(),
  error =>alert("error aaa gyi"),
 ()=> console.log("All Qlid are present") 
);
}


close_add_popup(){
  this.clicked=false;

}
close_error_popup(){
  this.errorexist=false;
  this.bind_qlid="";
  this.bind_cab_no="";
  this.bind_emp_name="";
  this.bind_shift_i="";
  this.ngOnInit();
}

close_filter_popup(){
  this.filter_error=false;
}

message:any;

showfilter:boolean=false;

add_emp(){
this._http1.addEmpToDb(this.emp_selected,this.cab_box_selected,this.currentshift_id).subscribe(
  data=>this.message=JSON.stringify(data),
  error=>console.log(error), 
()=>this.close_add_popup()
);
}
printval;

emp_to_delete;

deleteMe(a,b)
{ 
  this.emp_to_delete=a;
  console.log(a);
  this.emp_shift_to_delete=b;
  this.deleteClicked=true;
}



changeHeader(){
  if(this.uploadValue)
  this.uploadValue=false;
  else
  this.uploadValue=true;
}

public checkshift;
checkentry(s,shift){
  this.cbox=(!this.cbox);
  this.checkcab=s;
  this.checkshift=shift;
}

close_delete_popup(){
  if((this.emp_to_delete.length)&&(this.emp_shift_to_delete.length)){
  this.deleteClicked=false;
  this.ngOnInit();
  }
  else{
    this.deleteClicked=false;
  }
  }
 
  public editin:boolean;
  public ebox;
 public editcab;
 public editbox;

  editinfo(s,shift){
    this.editin=true;
    this.ebox=!this.ebox;
    this.editbox=shift;
    this.editcab=s;
  }

  public emp_shift_to_delete="";
  deleteEmp(){
    console.log("to delete :- "+this.emp_to_delete);
  return this._http1.deleteQlid(this.emp_to_delete,this.emp_shift_to_delete).subscribe(
    data=>this.message=JSON.stringify(data),
    error=>console.log(error), 
  ()=>this.close_delete_popup()
  );
  }

  close_spinner(){
    this.spinner=false;
  }

  downloadexcel(){
    if((this.error_cab)||(this.error_name)||(this.error_qlid)||(this.error_shift)){
      this.filter_error=true;
      this.msg='Incorrect Format Data Found  ';
    }
    else{
    this._http1.downloadExcelData(this.bind_cab_no,this.bind_qlid,this.bind_shift_i,this.bind_emp_name,this.bind_vendor_name).subscribe(
      ()=>alert("Excel Downloaded Successfully.")
    );
  }
  }



//filter validation
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


}
