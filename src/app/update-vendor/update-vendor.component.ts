import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { VendorData } from '../vendor-list/vendorData';
import { Vendor } from '../Model/vendor';

@Component({
  selector: 'app-update-vendor',
  templateUrl: './update-vendor.component.html',
  styleUrls: ['./update-vendor.component.css']
})
export class UpdateVendorComponent implements OnInit {
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
public agreement_expiry_date;
public message;

  public vendor:Vendor;
  public img;
  //public vend=[];
  
 public selectedItem;
  constructor(public datepipe:DatePipe,private _vendorService : VendorService,private router : Router, private _vendorData : VendorData) { }

  ngOnInit() {
  this.vendor=this._vendorData.getItem();
  console.log(this.vendor);
  this.agreement_expiry_date=this.datepipe.transform(this.vendor.agreement_expiry_date,'mm/dd/yyyy');
  //this._vendorService.getVendors().subscribe(resp=>{
   // this.vend = resp.result;  })
   
 // this.img =this.vendor.imgId
  }
 
  upd(f) {
    
    console.log(this.vendor);
    this._vendorService.updateVendor(this.vendor)
    .subscribe((response)=>{
        console.log(response);
        if(response.status == 200){
          this.message = response._body;
        }
        this.router.navigate(['vendor-list']);
    })
    
  }
}
