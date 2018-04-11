import { Component, OnInit, ElementRef } from '@angular/core';
import { DriverData } from '../driver-list/driverData';
import { DriverService } from '../driver.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Driver } from '../Model/driver';

@Component({
  selector: 'app-driver-update',
  templateUrl: './driver-update.component.html',
  styleUrls: ['./driver-update.component.css']
})
export class DriverUpdateComponent implements OnInit {
  d_comercial_liscence= new FormData;
  public d_police_verification= new FormData;
  public d_local_Address_proof= new FormData;
  public d_permanent_address_proof= new FormData;
  public d_photo=new FormData;
  validatestatus:boolean;
  message1; message3; message5;
  message2; message4; message6;
  message7; message8; message9;
 
  constructor(public _driverData:DriverData,public _driverService:DriverService,private router:Router, private elem:ElementRef, private route:ActivatedRoute) {
   
 

   }
  public driver:Driver;
  module= "vendor";
  navLocation = "/ Update Driver";
  public message;
  public driver_type;
  public first_Name;
  public dPhone_Nbr;
  public local_Address;
  public permanent_Address;
  public c_Plate_Nbr;
  public license_exp_date;
  public driver_id:number;
  private sub:any;
  public showLoading=true;
  public i;
  public f=[];  

  ngOnInit() {
    this.i=0;
    this.sub = this.route.params.subscribe(params => {
      this.driver_id = +params['driver_id'];
      console.log(this.driver_id);
    });
       this._driverService.getDriverByKey(this.driver_id).subscribe((response)=>{
         this.driver = response.result[0];
         this.showLoading=false;
         console.log(this.driver);
       })
    
    //this.driver=this._driverData.getItem();
    //console.log(this.driver);
    //this.driver = JSON.parse(localStorage.getItem('Driver'));
    //console.log(this.driver);
   
}
  image1_commercial()
  {
    let files1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
    //let d_comercial_liscence =new FormData();
    let file1=files1[0];
    let filename1 = 'd_comercial_liscence.' + file1.name.split(".")[1];
    this.driver.d_comercial_liscence = this.driver.d_license_num + "_" + filename1;
    this.d_comercial_liscence.append('file_upload',file1,this.driver.d_comercial_liscence);
    this.f[this.i++]=this.d_comercial_liscence;
  }
  image2_police()
  {
    let files2=this.elem.nativeElement.querySelector("#d_police_verification").files;
    //let d_police_verification =new FormData();
    let file2=files2[0];
    let filename2 = 'd_police_verification.' + file2.name.split(".")[1];
    this.driver.d_police_verification = this.driver.d_license_num + "_" + filename2;
    this.d_police_verification.append('file_upload',file2,this.driver.d_police_verification);
    this.f[this.i++]=this.d_police_verification;
  }
  image3_local_add()
  {
    let files3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
    //let d_local_Address_proof =new FormData();
    let file3=files3[0];
    let filename3 = 'd_local_Address_proof.' + file3.name.split(".")[1];
    this.driver.d_local_add_proof = this.driver.d_license_num + "_" + filename3;
    this.d_local_Address_proof.append('file_upload',file3,this.driver.d_local_add_proof);
    this.f[this.i++]=this.d_local_Address_proof;
  }
  image4_permanent_add()
  {
    let files4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
    //let d_permanent_address_proof =new FormData();
    let file4=files4[0];
    let filename4 = 'd_permanent_address_proof.' + file4.name.split(".")[1];
    this.driver.d_permanent_add_proof = this.driver.d_license_num + "_" + filename4;
    this.d_permanent_address_proof.append('file_upload',file4,this.driver.d_permanent_add_proof);
    this.f[this.i++]=this.d_permanent_address_proof;
  }
  image5_photo()
  {
    let files5=this.elem.nativeElement.querySelector("#d_photo").files;
    //let d_photo =new FormData();
    let file5=files5[0];
    let filename5 = 'd_photo.' + file5.name.split(".")[1];
    this.driver.license_num = this.driver.d_license_num + "_" + filename5;
    this.d_photo.append('file_upload',file5,this.driver.license_num);
    this.f[this.i++]=this.d_photo;
  }
  verify1()
  {
    if(this.driver.d_local_add_proof == '' || this.driver.d_local_add_proof == null)
    {
      return true;
    }
    else{
      return false;
    }
  }

  upd(){
 
    if(this.validate() == true)
    {
  console.log(this.driver);
    //let body = {"d_type": this.driver_type,"first_Name":this.first_Name, "dPhone_Nbr":this.dPhone_Nbr, "local_Address":this.local_Address,"permanent_Address":this.permanent_Address,"c_Plate_Nbr":this.c_Plate_Nbr, "license_exp_date":this.license_exp_date,"d_comercial_liscence":this.d_comercial_liscence,"d_police_verification":this.d_police_verification,"d_local_Address_proof":this.d_local_Address_proof,"d_permanent_address_proof":this.d_permanent_address_proof,"d_photo":this.d_photo}
    //console.log(body);
    this._driverService.updatedriver(this.driver)
    .subscribe((response)=>{
        console.log(response);
        if(response.result == "Insert Data success"){
          this.driver.message = response._body;
          console.log("hum andar hain")

          let file_upload= [this.d_comercial_liscence,this.d_police_verification,this.d_local_Address_proof,this.d_permanent_address_proof,this.d_photo];
         
          for (let i=0;i<this.f.length;i++)
          {
            console.log(this.f);
            if(this.f[i] !=null)
            {
              console.log(this.f[i]);
            this._driverService.sendfile(this.f[i]).subscribe();
            }
          }
        }
     
        
        
        this.router.navigate(['driver-list']);
    })
  }
  else{
    this.validatestatus = false;
    this.validate(); 
  }

  }


  validate()
  {
    this.refreshErrorValues();
    let mobPattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let file1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
    let file2=this.elem.nativeElement.querySelector("#d_police_verification").files;
    let file3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
    let file4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
    let file5=this.elem.nativeElement.querySelector("#d_photo").files;
    let today = new Date();
    let current_expiry = new Date(this.driver.license_exp_date);
    if(this.driver.d_contact_num != null && this.driver.d_contact_num != "")
    {
      if(this.driver.d_contact_num.match(mobPattern) == null)
      {
        this.validatestatus = false;
        this.message2 = "Please enter a valid phone number";
      }
    }
    else{
      this.validatestatus = false;
      this.message2 = "Phone number cannot be empty"
    }
    if(this.driver.d_name == null || this.driver.d_name == '')
    {
      this.validatestatus = false ;
      this.message1 = "Driver name cannot be empty";
    }
    if(this.driver.d_permanent_add == null || this.driver.d_permanent_add == ''){
            
            this.validatestatus = false;
            this.message3 = "Driver address cannot be empty";
    }
    if(this.driver.d_license_num == null || this.driver.d_license_num == '')
    {
      this.validatestatus = false;
      this.message4 = "Driver's License cannot be empty";
      
    }
    if(this.driver.license_exp_date == null && this.driver.license_exp_date == '')
    {
      this.validatestatus = false;
      this.message5 = 'License Expiry Date cannot be empty!';
    }
    else
    {
      if(current_expiry < today)
      {
        this.validatestatus = false;
        this.message5 = "License has been expired ";
      }
    }
  
  // if(file1.length != 0){
  //   let d_comercial_liscence = file1[0].name.split(".")[1];
  //    if(d_comercial_liscence == 'jpeg' || d_comercial_liscence == 'jpg'){
  //    }else{
  //      this.validatestatus = false;
  //      this.message6 = 'Uploaded Driver Liscense is not in valid format i.e. not (.jpg/.jpeg)';
  //    }
  //  }
  //  else{
  //    this.validatestatus = false;
  //    this.message6 = 'Driver Liscense is mandatory to be uploaded';
  //  }
 
 
  //  if(file2.length != 0){
  //    let d_police_verification = file2[0].name.split(".")[1];
  //     if(d_police_verification == 'jpeg' || d_police_verification == 'jpg'){
  //     }else{
  //       this.validatestatus = false;
  //       this.message7 = 'Uploaded Police Verification is not in valid format i.e. not (.jpg/.jpeg)';
  //     }
  //   }
  //   else
  //   {
  //     this.validatestatus = false;
  //    this.message7 = 'Driver Police Verification is mandatory to be uploaded';
   
    
  //   }
  //   if(file4.length != 0){
  //     let d_permanent_address_proof = file4[0].name.split(".")[1];
  //      if(d_permanent_address_proof == 'jpeg' || d_permanent_address_proof == 'jpg'){
  //      }else{
  //        this.validatestatus = false;
  //        this.message8 = 'Uploaded Driver Permanent Address Proof is not in valid format i.e. not (.jpg/.jpeg)';
  //      }
  //    }
  //    else{
  //      this.validatestatus = false;
  //     this.message8 = 'Driver Permanent Address Proof is mandatory to be uploaded';
  //   }
    
  //   if(file5.length != 0){
  //     let d_photo = file1[0].name.split(".")[1];
  //      if(d_photo == 'jpeg' || d_photo == 'jpg'){
  //      }else{
  //        this.validatestatus = false;
  //        this.message9 = 'Uploaded Driver Photo is not in valid format i.e. not (.jpg/.jpeg)';
  //      }
  //    }
  //    else
  //    {
  //      this.validatestatus = false;
  //     this.message9 = 'Driver Photo is mandatory to be uploaded';
  //   }
   
  
  return this.validatestatus;
  }
  refreshErrorValues()
  {
    this.validatestatus = true;
    this.message1 = '';
    this.message2 = '';
    this.message3 = '';
    this.message4 = '';
    this.message5 = '';
    this.message6 = '';
    this.message7 = '';
    this.message8 = '';
    this.message9 = '';
    

  }

}
