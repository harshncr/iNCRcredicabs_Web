import { Component, OnInit } from '@angular/core';
import { VendorData } from '../vendor-list/vendorData';
import { Router, ActivatedRoute } from '@angular/router';
import { CabService } from '../cab.service';
import { VendorService } from '../vendor.service';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {
  module= "vendor";
  navLocation = "/ Vendor Details";
  public sub;
  public vendor_id
  public vendor;
  public selectedItem;
  public showLoading = true;
  constructor(public _vendorData : VendorData,private router:Router,private route:ActivatedRoute, private _vendorService:VendorService){ }

  ngOnInit() 
  {
   // this.vendor=this._vendorData.getItem();
   //this.vendor = JSON.parse(localStorage.getItem('Vendor'));
   this.sub = this.route.params.subscribe(params => {
    this.vendor_id = +params['vendor_id'];
    console.log(this.vendor_id);
  });
  let JSONStr = "{'request':{'vendor_id': '"+this.vendor_id+"'}}";
  // console.log(body);
  this._vendorService.searchVendor(JSONStr).subscribe((response)=>{
    
    this.vendor=response.result[0];
    this.showLoading=false;
    console.log(this.vendor);
  });
  }



  update(vendor)
  {
    
    // console.log(vendor);
    // this.selectedItem=vendor;
    // this._vendorData.setItem(this.selectedItem);
    this.router.navigate(['update-vendor', vendor.id]);
  }


  addcab(vendor)
  {
    this.selectedItem=vendor;
    this._vendorData.setItem(this.selectedItem);
    console.log(vendor.id);
    
    this.router.navigate(['add-cab']);
  }

}
