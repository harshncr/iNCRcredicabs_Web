import { Component, OnInit, ElementRef } from '@angular/core';
import { DriverData } from '../driver-list/driverData';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';
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
 
 
  constructor(public _driverData:DriverData,public _driverService:DriverService,private router:Router, private elem:ElementRef) { }
  public driver:Driver;
  module= "vendor";
  navLocation = "Update Driver";
  public message;
  public driver_type;
  public first_Name;
  public dPhone_Nbr;
  public local_Address;
  public permanent_Address;
  public c_Plate_Nbr;
  public license_exp_date;
  
  

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('Driver'));
    //this.driver=this._driverData.getItem();
    console.log(this.driver);

  }
  image1_commercial()
  {
    let files1=this.elem.nativeElement.querySelector("#d_comercial_liscence").files;
    //let d_comercial_liscence =new FormData();
    let file1=files1[0];
    let filename1 = 'd_comercial_liscence.' + file1.name.split(".")[1];
    this.driver.d_comercial_liscence = this.driver.license_num + "_" + filename1;
   this.d_comercial_liscence.append('file_upload',file1,this.driver.d_comercial_liscence);

  }
  image2_police()
  {
    let files2=this.elem.nativeElement.querySelector("#d_police_verification").files;
    //let d_police_verification =new FormData();
    let file2=files2[0];
    let filename2 = 'd_police_verification.' + file2.name.split(".")[1];
    this.driver.d_police_verification = this.driver.license_num + "_" + filename2;
    this.d_police_verification.append('file_upload',file2,this.driver.d_police_verification);

  }
  image3_local_add()
  {
    let files3=this.elem.nativeElement.querySelector("#d_local_Address_proof").files;
    //let d_local_Address_proof =new FormData();
    let file3=files3[0];
    let filename3 = 'd_local_Address_proof.' + file3.name.split(".")[1];
    this.driver.d_local_Address_proof = this.driver.license_num + "_" + filename3;
    this.d_local_Address_proof.append('file_upload',file3,this.driver.d_local_Address_proof);
    
  }
  image4_permanent_add()
  {
    let files4=this.elem.nativeElement.querySelector("#d_permanent_address_proof").files;
    //let d_permanent_address_proof =new FormData();
    let file4=files4[0];
    let filename4 = 'd_permanent_address_proof.' + file4.name.split(".")[1];
    this.driver.d_permanent_address_proof = this.driver.license_num + "_" + filename4;
    this.d_permanent_address_proof.append('file_upload',file4,this.driver.d_permanent_address_proof);

  }
  image5_photo()
  {
    let files5=this.elem.nativeElement.querySelector("#d_photo").files;
    //let d_photo =new FormData();
    let file5=files5[0];
    let filename5 = 'd_photo.' + file5.name.split(".")[1];
    this.driver.d_photo = this.driver.license_num + "_ab" + filename5;
    this.d_photo.append('file_upload',file5,this.driver.d_photo);

  }
  upd(){
    






   

   


    console.log(this.driver);
    //let body = {"d_type": this.driver_type,"first_Name":this.first_Name, "dPhone_Nbr":this.dPhone_Nbr, "local_Address":this.local_Address,"permanent_Address":this.permanent_Address,"c_Plate_Nbr":this.c_Plate_Nbr, "license_exp_date":this.license_exp_date,"d_comercial_liscence":this.d_comercial_liscence,"d_police_verification":this.d_police_verification,"d_local_Address_proof":this.d_local_Address_proof,"d_permanent_address_proof":this.d_permanent_address_proof,"d_photo":this.d_photo}
    //console.log(body);
    this._driverService.updatedriver(this.driver)
    .subscribe((response)=>{
        console.log(response);
        if(response.result == "Insert Data success"){
          this.driver.message = response._body;

          let file_upload= [this.d_comercial_liscence,this.d_police_verification,this.d_local_Address_proof,this.d_permanent_address_proof,this.d_photo]
          for (let i=0;i<5;i++)
          {
            this._driverService.sendfile(file_upload[i]).subscribe();
          }
        }
     
        
        
        this.router.navigate(['driver-list']);
    })

  }

}
