import { Component, OnInit, ElementRef } from '@angular/core';
//import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
//import { VendorData } from '../vendor-list/vendorData';
import { CabService } from '../cab.service';
//import { CabData } from '../cab-list/cabData';

@Component({
  selector: 'app-add-cab',
  templateUrl: './add-cab.component.html',
  styleUrls: ['./add-cab.component.css']
})
export class AddCabComponent implements OnInit {
  module = 'vendor';
  navLocation = 'Add Cab';
  public onrshp;
  public license_plate_number;
  public model;
  public fuel=0;
  public type=0;
  public occupancy = 0;
  public cab_rate=0;
  public Rcert;
  public Pcert;
  public Fcert;
  public icert;
  public entry_tax_haryana_certi;
  public haryana;
  public entry_tax_delhi_certi="";
  public entry_tax_up_certi="";
  public entry_tax_haryana_exp_date="";
  public entry_tax_delhi_exp_date="";
  public entry_tax_up_exp_date=""; 
  public Mdate ;
  public Pdate;
  public Fdate;
  public idate;
  public message;
  mDate:Date;
  fDate:Date;
  pDate:Date;
  iDate:Date;
  upDate:Date;
  dlDate:Date;
  hrDate:Date;
  Date:Date;
  //public validateStatus = {"success": true, "message": ""};
  public validateStatus:boolean;
  public message1;
  public message2;
  public message3;
  public message4;
  public message5;
  public message6;
  public message7;
  public message8;
  public message9;
  public message10;
  public message11;
  public message12;
  public message13;
  public message14;
  public message15;
  public message16;
  public message17;
  public new:boolean=false;
  public success;
  constructor(private httpService : CabService,private elem:ElementRef, private route : Router) { }

  ngOnInit() {
  }

  add_cab(){

    if(this.validate() == true){
      let files=this.elem.nativeElement.querySelector("#Rcert").files;
      let Rcert =new FormData();
      let file=files[0];
      let filename = 'Rcert.' + file.name.split(".")[1];
      this.Rcert = this.license_plate_number + "_" + filename;
      Rcert.append('file_upload',file,this.Rcert);
      

      let files1=this.elem.nativeElement.querySelector("#Pcert").files;
      let Pcert =new FormData();
      let file1=files1[0];
      let filename1 = 'Pcert.' + file1.name.split(".")[1];
      this.Pcert = this.license_plate_number + "_" + filename1;
      Pcert.append('file_upload',file1,this.Pcert);
      

      let files2=this.elem.nativeElement.querySelector("#Fcert").files;
      let Fcert =new FormData();
      let file2=files2[0];
      let filename2 = 'Fcert.' + file2.name.split(".")[1];
      this.Fcert = this.license_plate_number + "_" + filename2;
      Fcert.append('file_upload',file2,this.Fcert);
      
      let files4=this.elem.nativeElement.querySelector("#icert").files;
      let icert =new FormData();
      let file4=files4[0];
      let filename4 = 'icert.' + file4.name.split(".")[1];
      this.icert = this.license_plate_number + "_" + filename4;
      icert.append('file_upload',file4,this.icert);

      
      let files5=this.elem.nativeElement.querySelector("#entry_tax_haryana_certi").files;
      let entry_tax_haryana_certi =new FormData();
      let file5=files5[0];
      if(file5 != "" && file5!=null)
      {
       console.log(file5);
      let filename5 = 'entry_tax_haryana_certi.' + file5.name.split(".")[1];
      this.entry_tax_haryana_certi = this.license_plate_number + "_" + filename5;
      entry_tax_haryana_certi.append('file_upload',file5,this.entry_tax_haryana_certi);
      }
      else{
        this.entry_tax_haryana_certi = "";
      }

      let files6=this.elem.nativeElement.querySelector("#entry_tax_delhi_certi").files;
      let entry_tax_delhi_certi =new FormData();
      let file6=files6[0];
      if(file6!="" && file6!=null){
      let filename6 = 'entry_tax_delhi_certi.' + file6.name.split(".")[1];
      this.entry_tax_delhi_certi = this.license_plate_number + "_" + filename6;
      entry_tax_delhi_certi.append('file_upload',file6,this.entry_tax_delhi_certi);
      }
      else{
        this.entry_tax_delhi_certi = "";
      }

      let files7=this.elem.nativeElement.querySelector("#entry_tax_up_certi").files;
      let entry_tax_up_certi =new FormData();
      let file7=files7[0];
      if(file7!="" && file7!=null){
      let filename7 = 'entry_tax_up_certi.' + file7.name.split(".")[1];
      this.entry_tax_up_certi = this.license_plate_number + "_" + filename7;
      entry_tax_up_certi.append('file_upload',file7,this.entry_tax_up_certi);
      }
      else{
        this.entry_tax_up_certi = "";
      }


        let body={"onrshp": this.onrshp, "license_plate_number":this.license_plate_number,"model":this.model, "fuel":this.fuel,"type":this.type,  "occupancy":this.occupancy,"cab_rate": this.cab_rate, "Rcert": this.Rcert,"Pcert": this.Pcert,"Fcert": this.Fcert,"icert": this.icert,"entry_tax_haryana_certi": this.entry_tax_haryana_certi,"entry_tax_delhi_certi": this.entry_tax_delhi_certi,"entry_tax_up_certi": this.entry_tax_up_certi,"entry_tax_haryana_exp_date": this.entry_tax_haryana_exp_date,"entry_tax_delhi_exp_date": this.entry_tax_delhi_exp_date,"entry_tax_up_exp_date": this.entry_tax_up_exp_date,"Mdate":this.Mdate, "Pdate":this.Pdate, "Fdate":this.Fdate ,  "idate":this.idate}
       
        console.log(body);
        this.httpService.addcab(body)
        .subscribe((response)=>{
                console.log(response);
                if(response.status==200){
                  this.message=response._body;
                  if(this.message == "Data Found")
                  {
                    this.new=true;
                  }else{
                          
                    let file_upload= [Rcert,Pcert,Fcert,icert,this.entry_tax_haryana_certi,this.entry_tax_delhi_certi,this.entry_tax_up_certi]
                    for (let i=0;i<7;i++)
                    {
                      this.httpService.sendfile(file_upload[i]).subscribe();
                    }
                    //let c={"cab_no":this.license_plate_number,"vendor_id":this.vendor_id};
                    //this._cabData.setItem(c);
                    //this._cabData.setType("primary");
                    // this._cabData.setCabId(this.license_plate_number);
                    // this._cabData.setVenId(this.vendor_id);
                    console.log("Image Uploaded");
                    this.success = response._body;
                    this.route.navigate(['cab-list']) ;
                  }
                }
        })

        

    }
    else{
      this.validateStatus = false;
      this.validate();
    }
  }

changeCabType(value){
  if(value == "Small"){
    this.occupancy = 4;
    this.type = value;
  }
  else if(value == "Big"){
    this.occupancy = 7;
    this.type = value;
  }
}
  validate(){
   
    this.validateStatus = true;
    //let image_pattern = /.*\.(gif|jpe?g|bmp|png)$/igm;
    this.refreshErrorValues();
    let todays = new Date();
  
    let today = new Date();
    today.setFullYear(today.getFullYear() -3);
    this.mDate = new Date(this.  Mdate); 
    let today1=new Date();
    today1.setMonth(today1.getMonth() +1);
    this.pDate=new Date(this.Pdate);
    let today2=new Date();
    today2.setMonth(today2.getMonth() +1);
    this.iDate=new Date(this.idate);
    let today3=new Date();
    today3.setMonth(today3.getMonth() +1);
    this.hrDate=new Date(this.entry_tax_haryana_exp_date);
    let today4=new Date();
    today4.setMonth(today4.getMonth()+1);
    this.upDate=new Date(this.entry_tax_up_exp_date);
    let today5=new Date();
    today5.setMonth(today5.getMonth()+1);
    this.dlDate=new Date(this.entry_tax_delhi_exp_date);
    let today6=new Date();
    today6.setMonth(today6.getMonth() +1);
    this.fDate=new Date(this.Fdate);
    

    let file1=this.elem.nativeElement.querySelector("#Rcert").files;

    let file2=this.elem.nativeElement.querySelector("#Pcert").files;
   

    let file3=this.elem.nativeElement.querySelector("#Fcert").files;
  

    let file4=this.elem.nativeElement.querySelector("#icert").files;

 

   
    
   if(this.license_plate_number == null || this.license_plate_number.trim() == ''){
      this.validateStatus = false;
      this.message2 = "License Plate Number Should Not Be Empty!";
    }
     if(this.model == null || this.model.trim() == ''){
      this.validateStatus = false;
      this.message3 = "Car Model Should Not Be Empty.";
    }
   if(this.fuel == 0){
      this.validateStatus = false;
      this.message4 = "Please Select Fuel Type.";
    }
    if(this.type == 0){
      this.validateStatus = false;
      this.message5 = "Please Select Cab Type.";
    }
    if(this.occupancy == 0){
      this.validateStatus = false;
      this.message6 = "Occupancy Cannot Be Blank.";
    }
   
    if(file1.length!=0){
    let Rcert = file1[0].name.split(".")[1];
      if(Rcert == 'jpeg' || Rcert == 'jpg' ){        
      }   
      else{
        this.validateStatus = false;
      this.message7 = "Image Format Invalid Choose .jpeg Or .jpg";
      }
     }else{
      this.validateStatus = false;
      this.message7 = "Image Cannot Be Null";
    }

    if(file2.length!=0){
      let Pcert:string =file2[0].name.split(".")[1];
      if(Pcert == "jpeg" ||  Pcert == "jpg" ){
      }else{
        this.validateStatus = false;
      this.message8 = "Image Format Invalid Choose .jpeg Or .jpg";
      }   
     }else{
      this.validateStatus = false;
      this.message8 = "Image Cannot Be Null";
    }

    if(file3.length!=0){
      let Fcert:string =file3[0].name.split(".")[1];
      if(Fcert == "jpeg" || Fcert == "jpg" ){
      }else{
        this.validateStatus = false;
        this.message9= "Image Format Invalid Choose .jpeg Or .jpg";
      }
     }else{
      this.validateStatus = false;
      this.message9 = "Image Cannot Be Null";
    }

    if(file4.length!=0){
      let icert:string =file4[0].name.split(".")[1];
      if(icert == "jpeg" || icert == "jpg" ){
      }else{
        this.validateStatus = false;
      this.message10 = "Image Format Invalid Choose .jpeg Or .jpg";
      }
     }else{
      this.validateStatus= false;
      this.message10 = "Image Cannot Be Null";
    }



    if(this.Mdate != null){
      if(this.mDate<=today){
      this.validateStatus = false;
      this.message11 = "it has been expired";
    }
    if(this.mDate>todays){
     this. validateStatus=false;
     this.message11="date is above current date";
    }
    
  }
else{
  this.validateStatus=false;
  this.message11="cannot be empty";
}
    if(this.Pdate!=null){
      if(this.pDate<=today1){
      this.validateStatus = false;
      this.message12 = "it has been expired";
    }
  }
  else{
    this.validateStatus=false;
    this.message12="cannot be empty";
  }
    
    if(this.Fdate !=null){
      if(this.fDate<=today6){
      this.validateStatus = false;
      this.message13 = "it has been expired";
   }
  }
  else{
    this.validateStatus=false;
    this.message13="cannot be null";
  }

    if(this.idate!=null){
      if(this.iDate<=today2){
      this.validateStatus = false;
      this.message14 = "it has been expired.";
    }
  }
  else{
    this.validateStatus=false;
    this.message14="it cannot be null";
  }
  if(this.entry_tax_haryana_exp_date!=null && this.entry_tax_haryana_exp_date!=""){
    if(this.hrDate<today3){
    this.validateStatus = false;
    this.message15 = "it has been expired.";
  }
}

if(this.entry_tax_up_exp_date!=null && this.entry_tax_up_exp_date!=""){
  if(this.upDate<today4){
  this.validateStatus = false;
  this.message16 = "it has been expired.";
}
}


if(this.entry_tax_delhi_exp_date!=null && this.entry_tax_delhi_exp_date!=""){
  if(this.dlDate<today5){
  this.validateStatus = false;
  this.message17 = "it has been expired.";
}
}


    // if(this.Mdate == null || this.Mdate.trim() == ''){
    //   this.validateStatus = false;
    //   this.message11 = "Please Select Cab Mnufacturing Date.";
    // }
    // if(this.Pdate == null || this.Pdate.trim() == ''){
    //   this.validateStatus = false;
    //   this.message12 = "Please Select Cab Pollution Certificate Expiry Date.";
    // }
    // if(this.Fdate == null || this.Fdate.trim() == ''){
    //   this.validateStatus = false;
    //   this.message13 = "Please Select Fitness Certificate Expiry Date.";
    // }
    // if(this.idate == null || this.idate.trim() == ''){
    //   this.validateStatus = false;
    //   this.message14 = "Please Select Insurance Certificate Expiry Date.";
    // }
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

close(){
  this.new=false;
}



}
