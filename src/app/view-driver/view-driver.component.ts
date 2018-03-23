import { Component, OnInit } from '@angular/core';
import { DriverData } from '../driver-list/driverData';
import { DomSanitizer } from '@angular/platform-browser';
import { VendorService } from '../vendor.service';
import { VendorData } from '../vendor-list/vendorData';
import { Router } from '@angular/router';
import { CabData } from '../cab-list/cabData';
import { CabService } from '../cab.service';
@Component({
  selector: 'app-view-driver',
  templateUrl: './view-driver.component.html',
  styleUrls: ['./view-driver.component.css']
})
export class ViewDriverComponent implements OnInit {
  private dimage : any;
  module="vendor";
  navLocation="Driver Details"
  private pimage : any;
  private readonly imageType : string = 'data:image/PNG;base64,';  
 
  public driver;
  public selectedItem: any;
  filterValue: any;

  constructor(private sanitizer: DomSanitizer,public _driverData: DriverData, public _cabData: CabData, public _vendorData: VendorData, private router: Router,private _vendorService:VendorService, private _cabService:CabService) { }

  ngOnInit() {
    this.driver = JSON.parse(localStorage.getItem('Driver'));
    //this.driver=this._driverData.getItem();
    console.log(this.driver);
  }
  getImage(d)
  {
    console.log(d);
    return this.sanitizer.bypassSecurityTrustUrl('data:image/PNG;base64,'+ d);
  }
  searchVen(vendor_Id){
    
    this.filterValue= vendor_Id;
   // this.filterType=vendor_id;
    //console.log(vendor_Id+" "+this.filterValue);
   
    let JSONStr = "{'request':{'vendor_id': '"+this.filterValue+"'}}";
     console.log(JSONStr);
    this._vendorService.searchVendor(JSONStr).subscribe((response)=>{
      //console.log(this.vendor);
      let a=response.result;
      console.log(a[0]);
     //  this.selectedItem=response.result;
      console.log(this.selectedItem)
      this._vendorData.setItem(a[0]);
      this.router.navigate(['view-vendor']);
     });
   //  this.selectedItem=this.vendor;
   
    //this.router.navigate(['view-vendor']);
  }
  
  searchCab(cab_Id){
    
    this.filterValue= cab_Id;
   // this.filterType=vendor_id;
    //console.log(vendor_Id+" "+this.filterValue);
   
    let JSONStr = "{'request':{'cab_license_plate_no': '"+this.filterValue+"'}}";
     console.log(JSONStr);
    this._cabService.searchCab(JSONStr).subscribe((response)=>{
      //console.log(this.vendor);
      let a=response.result;
      console.log(a[0]);
     //  this.selectedItem=response.result;
      console.log(this.selectedItem)
      this._cabData.setItem(a[0]);
      this.router.navigate(['view-cab']);
     });
   //  this.selectedItem=this.vendor;
   
    //this.router.navigate(['view-vendor']);
  }
}
