import { Component, OnInit } from '@angular/core';
import { DriverData } from '../driver-list/driverData';
import { DriverService } from '../driver.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver-update',
  templateUrl: './driver-update.component.html',
  styleUrls: ['./driver-update.component.css']
})
export class DriverUpdateComponent implements OnInit {

  constructor(public _driverData:DriverData,public _driverService:DriverService,private router:Router) { }
  public driver;
  public message;
  public driver_type;
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

  ngOnInit() {
    this.driver=this._driverData.getItem();
    console.log(this.driver);

  }
  upd(){
    console.log(this.driver);
    //let body = {"d_type": this.driver_type,"first_Name":this.first_Name, "dPhone_Nbr":this.dPhone_Nbr, "local_Address":this.local_Address,"permanent_Address":this.permanent_Address,"c_Plate_Nbr":this.c_Plate_Nbr, "license_exp_date":this.license_exp_date,"d_comercial_liscence":this.d_comercial_liscence,"d_police_verification":this.d_police_verification,"d_local_Address_proof":this.d_local_Address_proof,"d_permanent_address_proof":this.d_permanent_address_proof,"d_photo":this.d_photo}
    //console.log(body);
    this._driverService.updatedriver(this.driver)
    .subscribe((response)=>{
        console.log(response);
        if(response.status == 200){
          this.message = response._body;
        }
        this.router.navigate(['driver-list']);
    })

  }

}
