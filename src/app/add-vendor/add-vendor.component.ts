import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { Router } from '@angular/router';
//import { GlobalServiceService } from "../global-service.service";

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent {
  
  public validateStatus:boolean;
  public vendor_name;
  public business_type;
  public vendor_contact_num;
  public vendor_mail_id;
  public website;
  public pan_id;
  public gst_num;
  public agreement_expiry_date;
  public cabs_provided;
  public business_address;
  public supervisor_name;
  public sup_contact_num;
  public sup_mail_id;
  public manager_name;
  public manager_contact_num;
  public manager_mail_id;
  public owner_name;
  public owner_contact_num;
  public owner_mail_id;

  public message;

  public message1;  public message2;
  public message3;  public message4;
  public message5;  public message6;  
  public message7;  public message8; 
  public message9;  public message10;  
  public message11;  public message12; 
  public message13;  public message14; 
  public message15;
  

  constructor(private httpService: VendorService,private router:Router) { }
  add_vendor(){
    if(this.validate()==true){
    let body = {"vendor_name": this.vendor_name, "business_type": this.business_type, "vendor_contact_num": this.vendor_contact_num, "vendor_mail_id": this.vendor_mail_id, "website": this.website, "pan_id": this.pan_id, "gst_num": this.gst_num, "agreement_expiry_date": this.agreement_expiry_date, "cabs_provided": this.cabs_provided, "business_address": this.business_address, "supervisor_name": this.supervisor_name, "sup_contact_num": this.sup_contact_num, "sup_mail_id": this.sup_mail_id,"manager_name": this.manager_name, "manager_contact_num": this.manager_contact_num, "manager_mail_id": this.manager_mail_id, "owner_name": this.owner_name, "owner_contact_num": this.owner_contact_num, "owner_mail_id": this.owner_mail_id}
    console.log(body);
    this.httpService.addVendor(body)
    .subscribe((response)=>{
        console.log(response);
        if(response.status == 200){
          this.message = response._body;
          this.router.navigate(['vendor-list']);
        }
    })
  }else{
   // this.refreshErrorValues();
   this.validateStatus = false;
   this.validate();
  }
  }



  validate(){
    let validateStatus:boolean = true;
    //let mobPattern = /^[1-9]{1}[0-9]{9}$/;
    let mobPattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
   
    this.refreshErrorValues();
 
    if(this.vendor_name!= null){
      if(this.vendor_name.length > 20){
        validateStatus = false;
        this.message1 = 'First name cannot exceed 20 characters';
      }
    }
    else{
      validateStatus = false;
      this.message1 = 'First Name cannot be empty!';
    }

    if(this.business_type == null){
      validateStatus = false;
      this.message2 = 'Business Type cannot be empty!';
    }

    if(this.vendor_contact_num != null){
      if(this.vendor_contact_num.match(mobPattern) == null){
        validateStatus = false;
        this.message3 = 'Please enter a valid Phone number';
      }
    }else{
      validateStatus = false;
      this.message3 = 'Phone number cannot be empty!';
    }
   
    if(this.vendor_mail_id != null){
      if(this.vendor_mail_id.match(email) == null){
        validateStatus = false;
        this.message4 = 'Email Address format invalid!';
      }
    }

    if(this.pan_id == null){
      validateStatus = false;
      this.message5 = 'Pan Id cannot be empty!';
    }
    if(this.gst_num == null){
      validateStatus = false;
      this.message6 = 'Gst number cannot be empty!';
    }
    if(this.agreement_expiry_date == null){
      validateStatus = false;
      this.message7 = 'cannot be empty!';
    }
    if(this.cabs_provided == null){
      validateStatus = false;
      this.message8 = 'cannot be empty!';
    }
    if(this.business_address == null){
      validateStatus = false;
      this.message9 = 'Address cannot be empty!';
    }
   
    if(this.sup_contact_num != null){
      if(this.sup_contact_num.match(mobPattern) == null){
        validateStatus = false;
        this.message10 = 'Please enter a valid Phone number';
      }
    }
   
    if(this.sup_mail_id != null){
      if(this.sup_mail_id.match(email) == null){
        validateStatus = false;
        this.message11 = 'Email Address format invalid!';
      }
    }


    if(this.manager_contact_num != null){
      if(this.manager_contact_num.match(mobPattern) == null){
        validateStatus = false;
        this.message12 = 'Please enter a valid Phone number';
      }
    }
   
    if(this.manager_mail_id != null){
      if(this.manager_mail_id.match(email) == null){
        validateStatus = false;
        this.message13 = 'Email Address format invalid!';
      }
    }

    if(this.owner_contact_num != null){
      if(this.owner_contact_num.match(mobPattern) == null){
        validateStatus = false;
        this.message14 = 'Please enter a valid Phone number';
      }
    }
   
    if(this.owner_mail_id != null){
      if(this.owner_mail_id.match(email) == null){
        validateStatus = false;
        this.message15 = 'Email Address format invalid!';
      }
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
    this.message12 = '';
    this.message13 = '';
    this.message14 = '';
    this.message15 = ''; 
  }


}
