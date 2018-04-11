import { Component, OnInit, ElementRef } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
//import { CabData } from '../cab-list/cabData';
import { DriverService } from '../driver.service';

//import { cabData } from '../cab-list/cabData';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  validateStatus: boolean;
  module = "vendor";
  navLocation = "/ Add Driver";

  public driver_license_num;
  public Name;
  public dPhone_Nbr;
  public local_Address="";
  public permanent_Address;
  public c_Plate_Nbr;
  public license_exp_date;
  public d_comercial_liscence='';
  public d_police_verification='';
  public d_local_Address_proof="";
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
public success;

  constructor(private httpService : DriverService,private elem:ElementRef, private route : Router) { }

  ngOnInit() {
    
    // this.c_Plate_Nbr = this.cab.getItem().cab_no;
    // this.d_type=this.cab.getType();
    // this.vendor_id = this.cab.getItem().vendor_id;
  
}

  driver_add(){
    if(this.validate()==true){
     let files1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
      let d_comercial_liscence =new FormData();
      let file1=files1[0];
      let filename1 = 'd_comercial_liscence.' + file1.name.split(".")[1];
      this.d_comercial_liscence = this.driver_license_num + "_" + filename1;
      d_comercial_liscence.append('file_upload',file1,this.d_comercial_liscence);


      let files2=this.elem.nativeElement.querySelector("#d_police_verification").files;
      let d_police_verification =new FormData();
      let file2=files2[0];
      let filename2 = 'd_police_verification.' + file2.name.split(".")[1];
      this.d_police_verification = this.driver_license_num + "_" + filename2;
      d_police_verification.append('file_upload',file2,this.d_police_verification);

      
      let files3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
      let d_local_Address_proof =new FormData();
      let file3=files3[0];
      if(file3!="" && file3!=null){
      let filename3 = 'd_local_Address_proof.' + file3.name.split(".")[1];
      this.d_local_Address_proof = this.driver_license_num + "_" + filename3;
      d_local_Address_proof.append('file_upload',file3,this.d_local_Address_proof);
      }
      else{
        this.d_local_Address_proof = "";
      }


      let files4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
      let d_permanent_address_proof =new FormData();
      let file4=files4[0];
      let filename4 = 'd_permanent_address_proof.' + file4.name.split(".")[1];
      this.d_permanent_address_proof = this.driver_license_num + "_" + filename4;
      d_permanent_address_proof.append('file_upload',file4,this.d_permanent_address_proof);


      let files5=this.elem.nativeElement.querySelector("#d_photo").files;
      let d_photo =new FormData();
      let file5=files5[0];
      let filename5 = 'd_photo.' + file5.name.split(".")[1];
      this.d_photo = this.driver_license_num + "_" + filename5;
      d_photo.append('file_upload',file5,this.d_photo);



let body = {"driver_license_num": this.driver_license_num, "Name":this.Name, "dPhone_Nbr":this.dPhone_Nbr, "local_Address":this.local_Address,"permanent_Address":this.permanent_Address, "license_exp_date":this.license_exp_date,"d_comercial_liscence":this.d_comercial_liscence,"d_police_verification":this.d_police_verification,"d_local_Address_proof":this.d_local_Address_proof,"d_permanent_address_proof":this.d_permanent_address_proof,"d_photo":this.d_photo}
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
this.success = response._body;
this.route.navigate(['driver-list']) ;
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
let dname = /^([a-zA-Z]+|\s)*$/;
let today = new Date();
let current_expiry = new Date(this.license_exp_date);

let file1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
let file2=this.elem.nativeElement.querySelector("#d_police_verification").files;
let file3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
let file4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
let file5=this.elem.nativeElement.querySelector("#d_photo").files;



if(this.Name!= null && this.Name !=""){
  if(this.Name.length > 30){
    console.log(this.message1);
    this.validateStatus = false;
    this.message1 = 'Driver name cannot exceed 30 characters';
  }
{
  if(this.Name.match(dname) == null){
    this.validateStatus = false;
    this.message1 = 'Driver name will accept only alphabets';
  }
}
}
else{
  this.validateStatus = false;
  this.message1 = 'Driver Name cannot be empty!';
}





/*if(this.Name != null){
  if(this.Name.length > 20){
    validateStatus = false;
    this.message1 = 'Driver name cannot exceed 20 characters';
  }
}
else{
  validateStatus = false;
  this.message1 = 'Driver name cannot be empty!';
}


*/

if(this.dPhone_Nbr != null){
  if(this.dPhone_Nbr.match(mobPattern) == null){
    this.validateStatus = false;
    this.message2 = 'Please enter a valid Phone number';
  }
}else{
  this.validateStatus = false;
  this.message2 = 'Phone number cannot be empty!';
}

if(this.driver_license_num == null){
  this.validateStatus = false;
  this.message3 = 'Driver License Number cannot be empty!';
}


if(this.permanent_Address == null){
  this.validateStatus = false;
  this.message4 = 'Permanent Address cannot be empty!';
}



if(this.license_exp_date == null){
  this.validateStatus = false;
  this.message6 = 'License Expiry Date cannot be empty!';
}
else{
  if(current_expiry < today)
  {
   
    this.validateStatus = false;
    this.message6 = "License has been expired ";

  }
}


  //Now Image uploading
 if(file1.length != 0){
   let d_comercial_liscence = file1[0].name.split(".")[1];
    if(d_comercial_liscence == 'jpeg' || d_comercial_liscence == 'jpg' || d_comercial_liscence == 'png'){
    }else{
      this.validateStatus = false;
      this.message7 = 'Uploaded Driver Liscense is not in valid format i.e. not (.jpg/.jpeg/.png)';
    }
  }
  else{
    this.validateStatus = false;
    this.message7 = 'Driver Liscense is mandatory to be uploaded';
  }


  if(file2.length != 0){
    let d_police_verification = file2[0].name.split(".")[1];
     if(d_police_verification == 'jpeg' || d_police_verification == 'jpg' || d_police_verification == 'png'){
     }else{
       this.validateStatus = false;
       this.message8 = 'Uploaded Police Verification is not in valid format i.e. not (.jpg/.jpeg/.png)';
     }
   }
   else{this.validateStatus = false;
    this.message8 = 'Driver Police Verification is mandatory to be uploaded';
  }

  if(file3.length != 0){
    let d_local_Address_proof = file3[0].name.split(".")[1];
     if(d_local_Address_proof == 'jpeg' || d_local_Address_proof == 'jpg'|| d_local_Address_proof == 'png'){
     }
     else{
       this.validateStatus = false;
       this.message9 = 'Uploaded Driver Present Address Proof is not in valid format i.e. not (.jpg/.jpeg/.png)';
     }
   }
  

  if(file4.length != 0){
    let d_permanent_address_proof = file4[0].name.split(".")[1];
     if(d_permanent_address_proof == 'jpeg' || d_permanent_address_proof == 'jpg' || d_permanent_address_proof == 'png'){
     }else{
       this.validateStatus = false;
       this.message10 = 'Uploaded Driver Permanent Address Proof is not in valid format i.e. not (.jpg/.jpeg/.png)';
     }
   }
   else{
     this.validateStatus = false;
    this.message10 = 'Driver Permanent Address Proof is mandatory to be uploaded';
  }
  
  if(file5.length != 0){
    let d_photo = file1[0].name.split(".")[1];
     if(d_photo == 'jpeg' || d_photo == 'jpg' || d_photo == 'png'){
     }else{
       this.validateStatus = false;
       this.message11 = 'Uploaded Driver Photo is not in valid format i.e. not (.jpg/.jpeg/.png)';
     }
   }
   else{
     this.validateStatus = false;
    this.message11 = 'Driver Photo is mandatory to be uploaded';
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
}


// update(){
// this.new = false;
// //place your code here
// }

close(){
this.new = false;
}

}

