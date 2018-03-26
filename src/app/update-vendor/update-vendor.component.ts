import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { VendorData } from '../vendor-list/vendorData';
import { Vendor } from '../Model/vendor';
import { Data} from '../Model/Data'
@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
  module ="vendor";
  navLocation ="Update Vendor";
  
 /* public fname;
  public lname;
  public gender;
  public id;
public address;
public contact;
public emailId?;
//public imgId?: string,	
public gstNum;
public totalCabs;
//publi cOoCabs=0;
public contractedCabs;
public ownedCabs;
public supervisorName;
public supContact;
*/
public validateStatus:boolean;
public agreement_expiry_date;
public message;

public gstPattern;
public panPattern;
public today;
public expiryDate:Date;



public message1;  public message2;
public message3;  public message4;
public message5;  public message6;  
public message7;  public message8; 
public message9;  public message10;  
public message11;  public message12; 
public message13;  public message14; 
public message15; public message16;


  public vendor:Vendor;
  public img;
  //public vend=[];
  
 public selectedItem;
  constructor(public datepipe:DatePipe,private _vendorService : VendorService,private router : Router, private _vendorData : VendorData, private _Data:Data) { }

  ngOnInit() {
    this.vendor = JSON.parse(localStorage.getItem('Vendor'));
      //localStorage.removeItem('Vendor')
 // this.vendor=this._Data.vendor;
  //this._vendorData.getItem();
  console.log(this.vendor);
 this.agreement_expiry_date=this.datepipe.transform(this.vendor.agreementExpiry,'mm/dd/yyyy');
//  console.log(this.vendor);
  //this._vendorService.getVendors().subscribe(resp=>{
   // this.vend = resp.result;  })
   
 // this.img =this.vendor.imgId
//  console.log(this.vendor);
  }
 
  upd(f) {
    console.log(this.vendor.bussType);
    //console.log(this.validate()+"update init");
    if(this.validate()==true)
    {
    //console.log(this.validate());
    //console.log("validation is true"+this.vendor);
    this._vendorService.updateVendor(this.vendor)
    .subscribe((response)=>{
        console.log(response);
        if(response.status == 200){
          this.message = response._body;
        }
        this.router.navigate(['vendor-list']);
      
    })
  }
  else{
    this.validateStatus = false;
   this.validate();

  }
  }
  validate(){
    this.refreshErrorValues();
    let validateStatus:boolean = true;
   // let validateStatus:boolean = true;
    let today = new Date();
    today.setMonth(today.getMonth() + 1);
    this.expiryDate = new Date(this.vendor.agreementExpiry); 
    //let mobPattern = /^[1-9]{1}[0-9]{9}$/;
    let mobPattern = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    let email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i;
    let panPattern=("[A-Z]{5}[0-9]{4}[A-Z]{1}");
    let gstPattern=/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
   
  

    if(this.vendor.name!= null && this.vendor.name !=""){
      if(this.vendor.name.length > 20){
        this.validateStatus = false;
        this.message1 = 'First name cannot exceed 20 characters';
      }
    }
    else{
      this.validateStatus = false;
      this.message1 = 'First Name cannot be empty!';
    }

    if(this.vendor.bussType == null){
      this.validateStatus = false;
      this.message2 = 'Business Type cannot be empty!';
    }

    if(this.vendor.venContact != null && this.vendor.venContact != ""){
      if(this.vendor.venContact.match(mobPattern) == null){
        this.validateStatus = false;
        this.message3 = 'Please enter a valid Phone number';
      }
    }
    else{
      this.validateStatus = false;
      this.message3 = 'Phone number cannot be empty!';
    }
   
    if(this.vendor.venEmail != null && this.vendor.venEmail != ""){
      if(this.vendor.venEmail.match(email) == null){
        this.validateStatus = false;
        this.message4 = 'Email Address format invalid!';
      }
    }

    if(this.vendor.pan != null && this.vendor.pan != ""){
      if(this.vendor.pan.match(panPattern) == null){
        this.validateStatus = false;
        this.message5= 'Please enter a valid pan number';
      }
    }
    else{
      this.validateStatus=false;
      this.message5='pan id cannot empty';
    }
    if(this.vendor.gstnum != null && this.vendor.gstnum != ""){
      if(this.vendor.gstnum.match(gstPattern)==null){

      
      this.validateStatus = false;
      this.message6 = 'enter valid gst number!';
    }
  }
  else{
   validateStatus=false;
    this.message6='cannot be empty';
  }
    if(this.vendor.agreementExpiry != null){
      if(this.expiryDate<=today){
        this.validateStatus = false;
        this.message7 = 'License has been expired!';
      }
      }
      else{
        validateStatus=false;
        this.message7='cannot be empty';
      }
    if(this.vendor.cabs_prov== null){
      this.validateStatus = false;
      this.message8 = 'cannot be empty!';
    }
    if(this.vendor.bussAddr == null || this.vendor.bussAddr==""){
      this.validateStatus = false;
      this.message9 = 'Address cannot be empty!';
    }
   
    if(this.vendor.supContact != null && this.vendor.supContact != ""){
      if(this.vendor.supContact.match(mobPattern) == null){
        this.validateStatus = false;
        this.message10 = 'Please enter a valid Phone number';
      }
    }
   
    if(this.vendor.supEmail != "" && this.vendor.supEmail != null){
      if(this.vendor.supEmail.match(email) == null){
        this.validateStatus = false;
        this.message11 = 'Email Address format invalid!';
      }
    }

    if(this.vendor.manContact != "" && this.vendor.manContact != null){
      if(this.vendor.manContact.match(mobPattern) == null){
        this.validateStatus = false;
        this.message12 = 'Please enter a valid Phone number';
      }
    }
    if(this.vendor.ownerName == "" || this.vendor.ownerName == null)
    {
      this.validateStatus = false;
      this.message16 = 'Owner Name cannot be empty'
    }
   
    if(this.vendor.manager_mail_id != "" && this.vendor.manager_mail_id != null){
      if(this.vendor.manager_mail_id.match(email) == null){
        this.validateStatus = false;
        this.message13 = 'Email Address format invalid!';
      }
    }
    if(this.vendor.ownerContact == "" || this.vendor.ownerContact == null)
    {
      this.validateStatus = false;
      this.message14= 'owner number cannot be empty';
    }


    if(this.vendor.ownerContact != "" && this.vendor.ownerContact != null){
      if(this.vendor.ownerContact.match(mobPattern) == null){
       this.validateStatus = false;
        this.message14 = 'Please enter a valid Phone number';
      }
    }
    if(this.vendor.ownerEmail == "" || this.vendor.ownerEmail == null)
    {
      this.validateStatus = false;
      this.message15 = "owner mail cannot be empty";
    }

   
    if(this.vendor.ownerEmail != "" && this.vendor.ownerEmail != null){
      if(this.vendor.ownerEmail.match(email) == null){
        this.validateStatus = false;
        this.message15 = 'Email Address format invalid!';
      }
    }
    //console.log(this.validateStatus);
    //console.log(this.vendor);

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
  }

}
