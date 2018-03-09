import { Component, OnInit, ElementRef } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
import { CabData } from '../cab-list/cabData';
import { DriverService } from '../driver.service';

//import { cabData } from '../cab-list/cabData';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  validateStatus: boolean;

  public d_type;
  public first_Name;
  public dPhone_Nbr;
  public local_Address;
  public permanent_Address;
  public c_Plate_Nbr;
  public license_exp_date;
  public d_comercial_liscence='';
  public d_police_verification='';
  public d_local_Address_proof='';
  public d_permanent_address_proof='';
  public d_photo='';


public message;
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
public new:boolean = false;
public error:boolean = false;
public vendor_id;

  constructor(private httpService : DriverService,private elem:ElementRef, private route : Router, private cab:CabData) { }

  ngOnInit() {
    
    this.c_Plate_Nbr = this.cab.getItem().cab_no;
    this.d_type=this.cab.getType();
    this.vendor_id = this.cab.getItem().vendor_id;
  
}

  driver_add(){
    if(this.validate()==true){
     let files1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
      let d_comercial_liscence =new FormData();
      let file1=files1[0];
      let filename1 = 'd_comercial_liscence.' + file1.name.split(".")[1];
      this.d_comercial_liscence = this.dPhone_Nbr + "_" + filename1;
      d_comercial_liscence.append('file_upload',file1,this.d_comercial_liscence);


      let files2=this.elem.nativeElement.querySelector("#d_police_verification").files;
      let d_police_verification =new FormData();
      let file2=files2[0];
      let filename2 = 'd_police_verification.' + file2.name.split(".")[1];
      this.d_police_verification = this.dPhone_Nbr + "_" + filename2;
      d_police_verification.append('file_upload',file2,this.d_police_verification);


      let files3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
      let d_local_Address_proof =new FormData();
      let file3=files3[0];
      let filename3 = 'd_local_Address_proof.' + file3.name.split(".")[1];
      this.d_local_Address_proof = this.dPhone_Nbr + "_" + filename3;
      d_local_Address_proof.append('file_upload',file3,this.d_local_Address_proof);



      let files4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
      let d_permanent_address_proof =new FormData();
      let file4=files4[0];
      let filename4 = 'd_permanent_address_proof.' + file4.name.split(".")[1];
      this.d_permanent_address_proof = this.dPhone_Nbr + "_" + filename4;
      d_permanent_address_proof.append('file_upload',file4,this.d_permanent_address_proof);


      let files5=this.elem.nativeElement.querySelector("#d_photo").files;
      let d_photo =new FormData();
      let file5=files5[0];
      let filename5 = 'd_photo.' + file5.name.split(".")[1];
      this.d_photo = this.dPhone_Nbr + "_" + filename5;
      d_photo.append('file_upload',file5,this.d_photo);



let body = {"vendor_id": this.vendor_id,"d_type": this.d_type,"first_Name":this.first_Name, "dPhone_Nbr":this.dPhone_Nbr, "local_Address":this.local_Address,"permanent_Address":this.permanent_Address,"c_Plate_Nbr":this.c_Plate_Nbr, "license_exp_date":this.license_exp_date,"d_comercial_liscence":this.d_comercial_liscence,"d_police_verification":this.d_police_verification,"d_local_Address_proof":this.d_local_Address_proof,"d_permanent_address_proof":this.d_permanent_address_proof,"d_photo":this.d_photo}
console.log(body);
this.httpService.adddriver(body)
.subscribe((response)=>{
console.log(response);
if(response.status == 200){
this.message = response._body;
if(this.message == "Data Found")
{
this.new = true;
}else{
let file_upload= [d_comercial_liscence,d_police_verification,d_local_Address_proof,d_permanent_address_proof,d_photo]
for (let i=0;i<5;i++)
{
this.httpService.sendfile(file_upload[i]).subscribe();
}
console.log("Image Uploaded");

}
}

}) 
}else{
this.validateStatus = false;
this.validate();
}
}




validate(){
let validateStatus:boolean = true;
this.refreshErrorValues();
let mobPattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;

let file1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
let file2=this.elem.nativeElement.querySelector("#d_police_verification").files;
let file3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
let file4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
let file5=this.elem.nativeElement.querySelector("#d_photo").files;


if(this.first_Name != null){
  if(this.first_Name.length > 20){
    validateStatus = false;
    this.message1 = 'First name cannot exceed 20 characters';
  }
}
else{
  validateStatus = false;
  this.message1 = 'First Name cannot be empty!';
}


/* if(this.DriverId == null){
    validateStatus = false;
    this.message3 = 'Driver ID cannot be empty!';
}
*/

if(this.dPhone_Nbr != null){
  if(this.dPhone_Nbr.match(mobPattern) == null){
    validateStatus = false;
    this.message2 = 'Please enter a valid Phone number';
  }
}else{
  validateStatus = false;
  this.message2 = 'Phone number cannot be empty!';
}

if(this.local_Address == null){
  validateStatus = false;
  this.message3 = 'Present Address cannot be empty!';
}

if(this.permanent_Address == null){
  validateStatus = false;
  this.message4 = 'Permanent Address cannot be empty!';
}
if(this.c_Plate_Nbr == null){
  validateStatus = false;
  this.message5 = 'Cab Plate number cannot be empty!';
}


if(this.license_exp_date == null){
  validateStatus = false;
  this.message6 = 'License Expiry Date cannot be empty!';
}

  //Now Image uploading
 if(file1.length != 0){
   let d_comercial_liscence = file1[0].name.split(".")[1];
    if(d_comercial_liscence == 'jpeg' || d_comercial_liscence == 'jpg'){
    }else{
      validateStatus = false;
      this.message7 = 'Uploaded Driver Liscense is not in valid format i.e. not (.jpg/.jpeg)';
    }
  }
  else{
    validateStatus = false;
    this.message7 = 'Driver Liscense is mandatory to be uploaded';
  }


  if(file2.length != 0){
    let d_police_verification = file2[0].name.split(".")[1];
     if(d_police_verification == 'jpeg' || d_police_verification == 'jpg'){
     }else{
       validateStatus = false;
       this.message8 = 'Uploaded Police Verification is not in valid format i.e. not (.jpg/.jpeg)';
     }
   }
   else{validateStatus = false;
    this.message8 = 'Driver Police Verification is mandatory to be uploaded';
  }

  if(file3.length != 0){
    let d_local_Address_proof = file3[0].name.split(".")[1];
     if(d_local_Address_proof == 'jpeg' || d_local_Address_proof == 'jpg'){
     }else{
       validateStatus = false;
       this.message9 = 'Uploaded Driver Present Address Proof is not in valid format i.e. not (.jpg/.jpeg)';
     }
   }
   else{validateStatus = false;
    this.message9 = 'Driver Present Address Proof is mandatory to be uploaded';
  }

  if(file4.length != 0){
    let d_permanent_address_proof = file4[0].name.split(".")[1];
     if(d_permanent_address_proof == 'jpeg' || d_permanent_address_proof == 'jpg'){
     }else{
       validateStatus = false;
       this.message10 = 'Uploaded Driver Permanent Address Proof is not in valid format i.e. not (.jpg/.jpeg)';
     }
   }
   else{validateStatus = false;
    this.message10 = 'Driver Permanent Address Proof is mandatory to be uploaded';
  }
  
  if(file5.length != 0){
    let d_photo = file1[0].name.split(".")[1];
     if(d_photo == 'jpeg' || d_photo == 'jpg'){
     }else{
       validateStatus = false;
       this.message11 = 'Uploaded Driver Photo is not in valid format i.e. not (.jpg/.jpeg)';
     }
   }
   else{validateStatus = false;
    this.message11 = 'Driver Photo is mandatory to be uploaded';
  }
 

return validateStatus;
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
}


update(){
this.new = false;
//place your code here
}

close(){
this.new = false;
}

}

