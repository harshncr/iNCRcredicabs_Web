import { Component, OnInit } from '@angular/core';
import { VendorData } from '../vendor-list/vendorData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.css']
})
export class ViewVendorComponent implements OnInit {

  public vendor;
  public selectedItem;
  constructor(public _vendorData : VendorData,private router:Router){ }

  ngOnInit() {
    this.vendor=this._vendorData.getItem();
  }
  update(vendor){
    console.log(vendor);
    this.selectedItem=vendor;
    this._vendorData.setItem(this.selectedItem);
    this.router.navigate(['update-vendor']);
  }
  addcab(vendor)
  {
    this.selectedItem=vendor;
    this._vendorData.setItem(this.selectedItem);
    console.log(vendor.id);
    
    this.router.navigate(['add-cab']);
  }

}
