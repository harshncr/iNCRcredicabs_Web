import { Component, OnInit } from '@angular/core';
import { VendorService } from '../vendor.service';

import { Router } from '@angular/router';
import { VendorData } from './vendorData';
import { Data } from '../Model/Data';


declare var jquery:any;
declare var $:any;


@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {
  module = "vendor";  
  navLocation = "/ View Vendor";

  loada = true;

  showFilterPanel = false;
  public a=0;
  showLoading = true;
  public click = 0;
  
  public vendors=[];
  public selectedItem;
  public filterType='';
  public filterValue;
  public vendor_id;
  public isDeleted;
  public popupString="";
  public tooltipText="disable?";
  public showVenArr = [];
  new:boolean = false;
 
  constructor(private _vendorService : VendorService,private router : Router, private _vendorData : VendorData,private _Data:Data  ) {

   
   }

  ngOnChanges(){
    console.log("1");
    // this._vendorService.getVendors().subscribe(resp=>{
    //   this.vendors = resp.result;
    //  // console.log(resp.result);
    //   this.initShowDetails(this.vendors);
    //       }); 
  }

  ngOnInit() {
    console.log("2");
    this._vendorService.getVendors().subscribe(resp=>{
      this.vendors = resp.result;
      if(this.vendors.length != 0)
      {
        this.showLoading = false;
      }
     // console.log(resp.result);
      this.initShowDetails(this.vendors);
          });
         
        //  debugger;
          //console.log(this.vendors);
          this.isDeleted=false;  
          this.popupString="Are you sure, You want to delete this entry from Database?";
  }
  ngDoCheck(){
    console.log("3");
  }
  ngAfterContentInit(){
    console.log("4");
  }
  ngAfterContentChecked(){
    console.log("5");
  }
  ngAfterViewInit(){
    console.log("6");
  }
  ngAfterViewChecked(){
    console.log("7");
  }
  ngOnDestroy(){
    console.log("8");
  }
  view(vendor){
    localStorage.removeItem('Driver');
    localStorage.removeItem('Cab');
    localStorage.removeItem('Vendor');
  localStorage.setItem('Vendor', JSON.stringify(vendor));

    //this.selectedItem=vendor;
    //this._vendorData.setItem(this.selectedItem);
    this.router.navigate(['view-vendor']);
  }

  search(){
    this.showLoading=true;
    if(this.filterType==''){
      this._vendorService.getVendors().subscribe(resp=>{
        this.vendors = resp.result;
        if(this.vendors.length != 0)
        {
          this.showLoading = false;
        }
       // console.log(resp.result);
        this.initShowDetails(this.vendors);
            });
            return ;
    }
    let JSONStr = "{'request':{'"+this.filterType+"': '"+this.filterValue+"'}}";
    // //    if(this.filterType=="cabs_provided"){
    // // body={
    // //   "request":{
    // //       "cabs_provided":this.filterValue
    // //   }
    // // };
    // }
     console.log(JSONStr);
    this._vendorService.searchVendor(JSONStr).subscribe((response)=>{
    
      this.vendors=response.result;
      this.showLoading=false;
    });
  }
  filt(){
    if(this.a==1){
      this.a=this.a-1;
    }
    else{
      this.a=this.a+1;
    }
  }

  onDeleteClick(vendor){
  this.new=true;
    //   this.popup.options = {
  //     header: "Warning",
  //     color: "red", // red, blue.... 
  //     widthProsentage: 40, // The with of the popou measured by browser width 
  //     animationDuration: 0.5, // in seconds, 0 = no animation 
  //     showButtons: true, // You can hide this in case you want to use custom buttons 
  //     confirmBtnContent: "Accept", // The text on your confirm button 
  //     cancleBtnContent: "Decline", // the text on your cancel button 
  //     confirmBtnClass: "btn btn-success", // your class for styling the confirm button 
  //     cancleBtnClass: "btn btn-primary", // you class for styling the cancel button 
  //     animation: "fadeInUp" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
  // }
  // this.popup.show();
  // window.scroll(0,0);
   this.vendor_id=vendor.id;
  //
   }
  

  delete(){
    
    //alert("rishabh");
    console.log("this is working");
    let JSONStr="{'request':{'vendor_id': '"+this.vendor_id+"'}}";
    this._vendorService.deleteVendor(JSONStr).subscribe((response)=>{
   //   console.log(response);
      this.isDeleted=response.result;
      //this.popupString="The selected entry has been deleted!";  
      this._vendorService.getVendors().subscribe(resp=>{
        this.vendors = resp.result;
      //  this.initShowDetails(this.vendors);
            });
    });
    
    
    //console.log("yes");
    // this.router.navigate(['vendor-list']);    
    // console.log("no");
    // this.popup.options = {
    //   header:"Alert",
    //   color: "blue",
    //   showButtons:true,
    //   cancleBtnContent:"Okay",
    //   confirmBtnClass:"invisible"
      
      
    // }
    // this._vendorService.getVendors().subscribe(resp=>{
    //   this.vendors = resp.result;
    //       });
    // //this.ngOnInit();
    
    //this.router.navigate(['vendor-list']);
    
    this.new=false;
  }
  update(vendor)
  {
    localStorage.removeItem('Driver');
    localStorage.removeItem('Cab');
    localStorage.removeItem('Vendor');
  localStorage.setItem('Vendor', JSON.stringify(vendor));
   // this._Data.vendor = vendor;
   // console.log(this._Data.vendor);
    
   // this.selectedItem=vendor;
   // this._vendorData.setItem(this.selectedItem);
    this.router.navigate(['update-vendor']);
  }
  popUp(){
    this.new=true;
  }
  backed(){
    this.new=false;
  }
  checkStatus(vendor){
    if(vendor.status==1)
    return "panel-danger";
    else
    return "panel-info";
  }
  status(vendor){
    this.vendor_id=vendor.id;
    this.tooltipText="enable?";
    let JSONStr="{'request':{'vendor_id': '"+vendor.id+"'}}";
    if(vendor.status == 1){
        this._vendorService.enableVendor(JSONStr).subscribe((response)=>{
          this.isDeleted=response.result;
          this._vendorService.getVendors().subscribe(resp=>{
            this.vendors=resp.result;
            this.initShowDetails(this.vendors);
          })
        })

    }
    else{
      
    this._vendorService.deleteVendor(JSONStr).subscribe((response)=>{
      //console.log(response);
      this.isDeleted=response.result;
      //this.popupString="The selected entry has been deleted!";  
      this._vendorService.getVendors().subscribe(resp=>{
        this.vendors = resp.result;
        this.initShowDetails(this.vendors);
            });
    });
    }
  }
  check(vendor){
    if(vendor.status==1)
    return false;
    else
    return true;
  }

  text(vendor){
    if(vendor.status==1)
    return "enable?";
    else
    return "disable?";
  }
  color(vendor){
    if(vendor.status==1)
    return "#5cb85c";
    else
    return "#d9534f";
  }
  disable(vendor){
    if(vendor.status==1)
    return "vdisabled";
    else
    return "";
  }
  cabbie(vendor){
    console.log(vendor.id);
    this.selectedItem=vendor.id;
    console.log(this.selectedItem);
    this._vendorData.setItem(this.selectedItem);
    this.router.navigate(['cab-list'], {queryParams:{id :vendor.id}});


  }

  initShowDetails(ven){
    this.showVenArr = [];
    for(var i=0; i<ven.length; ++i){
      this.showVenArr.push(false);
    }
    console.log(this.showVenArr);
  }

  onShowDetails(i){
   if(this.click == 0)
   {
    $('#vd-'+i).slideDown();
    this.showVenArr[i] = true;
   this.click=this.click+1;
  }
  else{
    $('#vd-'+i).slideUp();
    this.showVenArr[i] = false;
    this.click = 0;

  }
}

  onHideDetails(i){
   
  }
  onFilterPanelChevronMouseEnter(tgt){
    $('.filter-panel-heading-button .tooltip-text').show();
  }

  onFilterPanelChevronMouseLeave(tgt){
    $('.filter-panel-heading-button .tooltip-text').hide();
  }

  filterPanelToggle(){
    if(this.showFilterPanel){
      $('#filter-panel .panel-body').slideUp();
      this.showFilterPanel = false;
    }else{
      $('#filter-panel .panel-body').slideDown();
      this.showFilterPanel = true;
    }
  }
}


