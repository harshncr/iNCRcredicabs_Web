import { Component, OnInit } from '@angular/core';
import { CabData } from '../cab-list/cabData';
import { VendorData } from '../vendor-list/vendorData';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorListComponent } from '../vendor-list/vendor-list.component';
import { VendorService } from '../vendor.service';
import { Vendor } from '../Model/vendor';
import { CabService } from '../cab.service';



@Component({
  selector: 'app-view-cab',
  templateUrl: './view-cab.component.html',
  styleUrls: ['./view-cab.component.css']
})
export class ViewCabComponent implements OnInit {
  module= "vendor";
  navLocation = "/ Cab Details";

  public selectedItem: any;
  public vendor;
  public cab;
  public driverPrimary;
  public driverSecondary;
  filterValue: any;
  public message;
  public cab_id;
  showLoading = true; 
  constructor(public _cabData: CabData,public _cabService:CabService,public _vendorData:VendorData, private _vendorService: VendorService, private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    //this.cab=this._cabData.getItem();
    // this.cab = JSON.parse(localStorage.getItem('Cab'));
    this.cab = this.route.params.subscribe(params => {
      this.cab_id = +params['cab_id'];
      console.log(this.cab_id);
    });
    let JSONStr = "{'request':{'cab_id': '"+this.cab_id+"'}}";
    // console.log(body);
    this._cabService.searchCab(JSONStr).subscribe((response)=>{
      
      this.cab=response.result[0];
      this.showLoading=false;
      console.log(this.cab);
    });
    
    // console.log(this.cab);
    
    
  }
  // vendorview(vendor_id){
  //   this.selectedItem=vendor_id;
  //   this._vendorData.setItem(this.selectedItem);
  //   this.router.navigate(['view-vendor']);
  // }
  
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
   checkPresence1(){
    if(this.cab.tax_delhi_certi == ''|| this.cab.tax_delhi_certi == null)
    {
      
      return true;
    }
    else{
      
      return false;
    }
  }   
  checkPresence2(){
    if(this.cab.tax_haryana_certi == ''|| this.cab.tax_haryana_certi == null)
    {
      
      return true;
    }
    else{
      return false;
    }
  }   
  checkPresence3(){
    if(this.cab.tax_up_certi == ''|| this.cab.tax_up_certi == null)
    {
     
      return true;
    }
    else{
      return false;
    }
  }   
 

   
   addsecondarydriver(cab)
   {
    console.log(cab);
    this.selectedItem=cab;
    this._cabData.setItem(this.selectedItem);
    this._cabData.setType("secondary");
    this.router.navigate(['add-driver']);
  }
  addprimarydriver(cab){
    console.log(cab);
    this.selectedItem=cab;
    this._cabData.setItem(this.selectedItem);
    this._cabData.setType("primary");
    this.router.navigate(['add-driver']);
  }
}