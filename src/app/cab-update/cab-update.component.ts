import { Component, OnInit, ElementRef } from '@angular/core';
import { CabData } from '../cab-list/cabData';
import { CabService } from '../cab.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Data } from '../Model/Data';
import { VendorListComponent } from '../vendor-list/vendor-list.component';
import { VendorService } from '../vendor.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'

@Component({
  selector: 'app-cab-update',
  templateUrl: './cab-update.component.html',
  styleUrls: ['./cab-update.component.css']
})
export class CabUpdateComponent implements OnInit {
public cab:Data;
module = "vendor";
navLocation = "/ Update Cab";
public message: any;
entry_tax_haryana = "";
entry_tax_delhi = "";
entry_tax_up = "";
public Rcert = "";
mDate:Date;
fDate:Date;
pDate:Date;
iDate:Date;
upDate:Date;
dlDate:Date;
hrDate:Date;
Date:Date;
public i;
public f=[];

validateStatus : boolean;
 Rcert1 = new FormData();
 Fcert1 = new FormData();
 Icert1 = new FormData();
 Pcert1 = new FormData();
 entry_tax_haryana_certi1= new FormData();
 entry_tax_delhi_certi1 = new FormData();
 entry_tax_up_certi1 =new FormData(); 
 message1= "";     message2="";      message3="";     message4="";
 message5="";     message6="";     message7="";      message8="";
 message9="";     message10="";     message11="";      
 message12="";     message13="";      message14="";   
 message15 = "";    message16="";     message17="";
 public cab_id;
 public sub;
  constructor(private _cabData:CabData,private sanitizer:DomSanitizer ,public httpService:VendorService ,private _cabService:CabService,private elem:ElementRef, private router:Router, private route:ActivatedRoute) { }
public showLoading=true;
  ngOnInit() {
    this.i=0;
    //this.cab=this._cabData.getItem();
    // this.cab = JSON.parse(localStorage.getItem('Cab'));
    this.sub = this.route.params.subscribe(params => {
      this.cab_id = +params['cab_id'];
      console.log(this.cab_id);
    });
    let JSONStr = "{'request':{'cab_id': '"+this.cab_id+"'}}";
    // console.log(body);
    this._cabService.searchCab(JSONStr).subscribe((response)=>{
      
      this.cab=response.result[0];
      this.showLoading=false;
      console.log(this.cab);
    });
  }
  image1_Rcert()
  {
    console.log("kuch hua");
    let files=this.elem.nativeElement.querySelector("#Rcert").files;
    //this.Rcert1 =new FormData();
    let file=files[0];
    let filename = 'Rcert.' + file.name.split(".")[1];
    this.cab.reg_certi = this.cab.cab_no + "_" + filename;
    console.log(this.cab.reg_certi);
    this.Rcert1.append('file_upload',file,this.cab.reg_certi);
    this.f[this.i++]=this.Rcert1;

  }
  image2_Pcert()
  {
    console.log("kuch hua");
    let files1=this.elem.nativeElement.querySelector("#Pcert").files;
     // let Pcert =new FormData();
      let file1=files1[0];
      let filename1 = 'Pcert.' + file1.name.split(".")[1];
      this.cab.poll_certi = this.cab.cab_no + "_" + filename1;
      this.Pcert1.append('file_upload',file1,this.cab.reg_certi);
      this.f[this.i++]=this.Pcert1;
      
  }
  image3_Fcert()
  {
    console.log("kuch hua");
    let files2=this.elem.nativeElement.querySelector("#Fcert").files;
     this.Fcert1 =new FormData();
      let file2=files2[0];
      let filename2 = 'Fcert.' + file2.name.split(".")[1];
      this.cab.fit_certi = this.cab.cab_no + "_" + filename2;
      this.Fcert1.append('file_upload',file2,this.cab.fit_certi);
      this.f[this.i++]=this.Fcert1;
  }
  image4_Icert()
  {
    console.log("kuch hua");
    let files4=this.elem.nativeElement.querySelector("#icert").files;
    this.Icert1 =new FormData();
    let file4=files4[0];
    let filename4 = 'icert.' + file4.name.split(".")[1];
    this.cab.insur_certi = this.cab.cab_no + "_" + filename4;
    this.Icert1.append('file_upload',file4,this.cab.insur_certi);
    this.f[this.i++]=this.Icert1;
  }
  image5_Entry_Haryana()
  {
    console.log("kuch hua");
    let files5=this.elem.nativeElement.querySelector("#entry_tax_haryana_certi").files;
     //this.entry_tax_haryana_certi1 =new FormData();
      let file5=files5[0];
      let filename5 = 'entry_tax_haryana_certi.' + file5.name.split(".")[1];
      this.cab.tax_haryana_certi = this.cab.cab_no + "_" + filename5;
      this.entry_tax_haryana_certi1.append('file_upload',file5,this.cab.tax_haryana_certi);
      this.f[this.i++]=this.entry_tax_haryana_certi1;

  }
  image6_Entry_Delhi()
  {
    console.log("kuch hua");
    let files6=this.elem.nativeElement.querySelector("#entry_tax_delhi_certi").files;
      //let entry_tax_delhi_certi =new FormData();
      let file6=files6[0];
      let filename6 = 'entry_tax_delhi_certi.' + file6.name.split(".")[1];
      this.cab.tax_delhi_certi = this.cab.cab_no + "_" + filename6;
      this.entry_tax_delhi_certi1.append('file_upload',file6,this.cab.tax_delhi_certi);
      this.f[this.i++]=this.entry_tax_delhi_certi1;
  }
  image7_Entry_Up()
  {
    console.log("kuch hua");
    let files7=this.elem.nativeElement.querySelector("#entry_tax_up_certi").files;
    //let entry_tax_up_certi =new FormData();
    let file7=files7[0];
    let filename7 = 'entry_tax_up_certi.' + file7.name.split(".")[1];
    this.cab.tax_up_certi = this.cab.cab_no + "_" + filename7;
    this.entry_tax_up_certi1.append('file_upload',file7,this.cab.tax_up_certi);
    console.log("up "+this.cab.tax_up_certi);
    this.f[this.i++]=this.entry_tax_up_certi1;
  }
  checkPresence1(){
    if(this.cab.tax_delhi_certi == ''|| this.cab.tax_delhi_certi == null)
    {
      
      return true;
    }
    else{
      
      return false;
    }
  }   
  checkPresence2(){
    if(this.cab.tax_haryana_certi == ''|| this.cab.tax_haryana_certi == null)
    {
      
      return true;
    }
    else{
      return false;
    }
  }   
  checkPresence3(){
    if(this.cab.tax_up_certi == ''|| this.cab.tax_up_certi == null)
    {
     
      return true;
    }
    else{
      return false;
    }
  } 

 registration()
 {

 }




  upd(f) {
    
      
     
      if(this.validate()==true)
     {
    console.log(this.cab);
    this._cabService.updateCab(this.cab)
    .subscribe((response)=>{
        console.log(response);
        if(response.result == 'Insert Data success'){
          this.message = response._body;

        
            console.log("inside success!");
            
                  
            let file_upload= [this.Rcert1,this.Pcert1,this.Fcert1,this.Icert1,this.entry_tax_haryana_certi1,this.entry_tax_delhi_certi1,this.entry_tax_up_certi1]
            console.log("this is cool",this.f);
            for (let i=0;i<this.f.length;i++)
            {
              if(this.f[i] != null)
              {
                
                this._cabService.sendfile(this.f[i]).subscribe();
              }
                
            }
          }

        this.router.navigate(['cab-list']);
          
        })
      }
        else{
          this.validateStatus = false;
          
        }
    
    

}
validate(){
  let todays =new Date();
  let today = new Date();
  today.setFullYear(today.getFullYear() -5);
  this.Date = new Date(this.cab.manufacture_date); 
  let today1=new Date();
  today1.setMonth(today1.getMonth() +1);
  this.pDate=new Date(this.cab.poll_exp);
  let today2=new Date();
  today2.setMonth(today2.getMonth() +1);
  this.iDate=new Date(this.cab.insur_exp);
  let today3=new Date();
  today3.setMonth(today3.getMonth() +1);
  this.hrDate=new Date(this.cab.tax_haryana_exp);
  let today4=new Date();
  today4.setMonth(today4.getMonth()+1);
  this.upDate=new Date(this.cab.tax_up_exp);
  let today5=new Date();
  today5.setMonth(today5.getMonth()+1);
  this.dlDate=new Date(this.cab.tax_delhi_exp);
  let today6=new Date();
  today6.setMonth(today6.getMonth() +1);
  this.fDate=new Date(this.cab.fit_exp);
  
  
  this.validateStatus = true;
  //let image_pattern = /.*\.(gif|jpe?g|bmp|png)$/igm;
  this.refreshErrorValues();
  let file1=this.elem.nativeElement.querySelector("#Rcert").files;

  let file2=this.elem.nativeElement.querySelector("#Pcert").files;
 

  let file3=this.elem.nativeElement.querySelector("#Fcert").files;


  let file4=this.elem.nativeElement.querySelector("#icert").files;

  let licensePattern=/^(([A-Za-z]){2,3}(|-)(?:[0-9]){1,2}(|-)(?:[A-Za-z]){2}(|-)([0-9]){1,4})|(([A-Za-z]){2,3}(|-)([0-9]){1,4})$/;

  
 if(this.cab.cab_no != null && this.cab.cab_no.trim() != ''){
    
    if(this.cab.cab_no.match(licensePattern)==null){
      this.validateStatus = false;
      this.message2 = "Invalid Registration Number!";
    }

  }
  else{
    this.validateStatus = false;
    this.message2 = "Registration Number Should Not Be Empty!";
  }
   if(this.cab.model == null || this.cab.model.trim() == ''){
    this.validateStatus = false;
    this.message3 = "Car Model Should Not Be Empty.";
  }
 if(this.cab.fuel == 0){
    this.validateStatus = false;
    this.message4 = "Please Select Fuel Type.";
  }
  if(this.cab.type == 0){
    this.validateStatus = false;
    this.message5 = "Please Select Cab Type.";
  }
  if(this.cab.occupancy == 0){
    this.validateStatus = false;
    this.message6 = "Capacity Cannot Be Blank.";
  }
 
  // if(file1.length!=0){
  // let Rcert = file1[0].name.split(".")[1];
  //   if(Rcert == 'jpeg' || Rcert == 'jpg' ){        
  //   }   
  //   else{
  //     this.validateStatus = false;
  //   this.message7 = "Image Format Invalid Choose .jpeg Or .jpg";
  //   }
  //  }else{
  //   this.validateStatus = false;
  //   this.message7 = "Image Cannot Be Null";
  // }

  // if(file2.length!=0){
  //   let Pcert:string =file2[0].name.split(".")[1];
  //   if(Pcert == "jpeg" ||  Pcert == "jpg" ){
  //   }else{
  //     this.validateStatus = false;
  //   this.message8 = "Image Format Invalid Choose .jpeg Or .jpg";
  //   }   
  //  }else{
  //   this.validateStatus = false;
  //   this.message8 = "Image Cannot Be Null";
  // }

  // if(file3.length!=0){
  //   let Fcert:string =file3[0].name.split(".")[1];
  //   if(Fcert == "jpeg" || Fcert == "jpg" ){
  //   }else{
  //     this.validateStatus = false;
  //     this.message9= "Image Format Invalid Choose .jpeg Or .jpg";
  //   }
  //  }else{
  //   this.validateStatus = false;
  //   this.message9 = "Image Cannot Be Null";
  // }

//  if(file4.length!=0){
//     let icert:string =file4[0].name.split(".")[1];
//     if(icert == "jpeg" || icert == "jpg" ){
//     }else{
//       this.validateStatus = false;
//     this.message10 = "Image Format Invalid Choose .jpeg Or .jpg";
//     }
//    }else{
//     this.validateStatus= false;
//     this.message10 = "Image Cannot Be Null";
//   }


  if(this.cab.manufacture_date != null){
    console.log("andar pahuch gaye");
   
  if(this.Date>todays){
   this. validateStatus=false;
   this.message11="date is above current date";
  }
  if(this.Date<today)
  {
    this.validateStatus = false;
    this.message11 = "date is expired";
  }
  
}
else{
this.validateStatus=false;
this.message11="cannot be empty";
}
  if(this.cab.poll_exp!=null){
    if(this.pDate<=todays){
    this.validateStatus = false;
    this.message12 = "it has been expired";
  }
}
else{
  this.validateStatus=false;
  this.message12="cannot be empty";
}
  
  if(this.cab.fit_exp !=null){
    if(this.fDate<=todays){
    this.validateStatus = false;
    this.message13 = "it has been expired";
 }
}
else{
  this.validateStatus=false;
  this.message13="cannot be null";
}

  if(this.cab.insur_exp!=null){
    if(this.iDate<=todays){
    this.validateStatus = false;
    this.message14 = "it has been expired.";
  }
}
else{
  this.validateStatus=false;
  this.message14="it cannot be null";
}
if(this.cab.tax_haryana_exp!=null && this.cab.tax_haryana_exp!=""){
  if(this.hrDate<=todays){
  this.validateStatus = false;
  this.message15 = "it has been expired.";
}
}

if(this.cab.tax_up_exp != null && this.cab.tax_up_exp != ""){
if(this.upDate<todays){
this.validateStatus = false;
this.message16 = "it has been expired.";
}
}

if(this.cab.tax_delhi_exp != null && this.cab.tax_delhi_exp != ""){
if(this.dlDate<=todays){
this.validateStatus = false;
this.message17 = "it has been expired.";
}
}

 

return this.validateStatus;
}

refreshErrorValues(){
this.validateStatus = true;
this.message1 = '';
this.message2 = '';
this.message3 = '';
this.message4 = '';
this.message5 = '';
this.message6 = '';
this.message7 = '';
this.message8 = '';
this.message9 = '';
this.message10 = '';
this.message11 = '';
this.message12 = '';
this.message13 = '';
this.message14 = '';
this.message15 = '';
this.message16 = '';
this.message17 = '';

}

// update(){
//   this.new=false;
// //place your code here
// }

//close(){
//this.new=false;
//}

 
}



