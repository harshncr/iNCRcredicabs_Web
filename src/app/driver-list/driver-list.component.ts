import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';
import { DriverData } from './driverData';
import { Router, ActivatedRoute } from '@angular/router';
import { CabData } from '../cab-list/cabData';
import { VendorData } from '../vendor-list/vendorData';
import 'rxjs/add/operator/filter';

declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {
 loadc=true;
 public popup;
 module = "vendor";
 navLocation = "/ View Driver"
 showLoading = true;
 showFilterPanel = false;
  public filterType='';
  public filterValue;
  public drivers=[];
  public selectedItem;
  public isDeleted;
  public popupString="";
  public tooltipText="disable?";
  public showDriverArr = [];
  public driver_id;
  public cab_id;
  public vendor_id;
  pickedDate
  new:boolean = false;
  cablist = false;
  today;
  pickedDates;
  click = 0;
  constructor(private _driverService: DriverService, private _driverData: DriverData, private router: Router,private _cabData:CabData, private _vendorData:VendorData, private route:ActivatedRoute) { }

  ngOnInit() {
    this.popup=false;
    // this.route.queryParams.filter(params => params.id).subscribe(params=>{
     
    //    this.vendor_id=params.id;
    //    console.log(this.vendor_id);
    // })
    // this.route.queryParams.filter(params => params.cab).subscribe(params=>{
    // this.cab_id=params.cab;
    // console.log(this.cab_id);
    // })
    
    this._driverService.getDriver().subscribe(resp=>{
      this.drivers = resp.result;
      console.log(this.drivers);
      //console.log(this.drivers);
      if(this.drivers.length !=0)
      {
        this.showLoading = false;
      }
     this.today = new Date();
     //console.log(this.today);
     //console.log(this.drivers[0].license_exp_date);
        this.initShowDetails(this.drivers);
          });
          this.isDeleted=false;  
          this.popupString="Are you sure, You want to delete this entry from Database?";
          
  }


  view(driver){
    localStorage.removeItem('Driver');
    localStorage.removeItem('Cab');
    localStorage.removeItem('Vendor');
    localStorage.setItem('Driver', JSON.stringify(driver));
    //this.selectedItem=driver;
    console.log(driver);
    //this._driverData.setItem(this.selectedItem);
    //console.log(this._driverData.getItem());
    this.router.navigate(['view-driver']);
  }
  update(driver)
  { 
    localStorage.removeItem('Driver');
    localStorage.removeItem('Cab');
    localStorage.removeItem('Vendor');
    localStorage.setItem('Driver', JSON.stringify(driver));
    //this.selectedItem=driver;
    //console.log(driver);
    //this._driverData.setItem(this.selectedItem);
    //console.log(this._driverData.getItem());
    this.router.navigate(['driver-update']);
  }

  driverlist(){
    // // if(this.filterType=='')
    // // return ;
    // // console.log(this.filterType+" "+this.filterValue);
    
    // // let JSONStr = "{'request':{'"+this.filterType+"': '"+this.filterValue+"'}}";
    // // // console.log(body);
    // this._driverService.searchDriver(JSONStr).subscribe((response)=>{
    //   this.drivers=response.result;
     this._driverService.getDrivers().subscribe(resp=>{
       this.drivers= resp.result();
       this.cablist = false;
     }); 
     console.log(this.drivers);
    }
    search(){
      this.showLoading=true;
      if(this.filterType==''){
        this._driverService.getDriver().subscribe(resp=>{
          this.drivers = resp.result;
          //console.log(this.drivers);
          if(this.drivers.length !=0)
          {
            this.showLoading = false;
          }
         this.today = new Date();
         //console.log(this.today);
         //console.log(this.drivers[0].license_exp_date);
            this.initShowDetails(this.drivers);
              });
      
      return ;}
      console.log(this.filterType+" "+this.filterValue);
    
      let JSONStr = "{'request':{'"+this.filterType+"': '"+this.filterValue+"'}}";
      // console.log(body);
      this._driverService.searchDriver(JSONStr).subscribe((response)=>{
      this.drivers=response.result;
        this.showLoading=false;
      

      }
      
    )

    }
  

  checkStatus(driver){
    if(driver.status==0)
    return "panel-danger";
    else
    return "panel-info";
  }

  text(driver){
    if(driver.status==0)
    return "enable?";
    else
    return "disable?";
  }

  color(driver){
    if(driver.status==0)
    return "#5cb85c";
    else
    return "#d9534f";
  }

  disable(driver){
    if(driver.status==0)
    return "cdisabled";
    else
    return "";
  }

  check(driver){
    if(driver.status==0)
    return false;
    else
    return true;
  }

  status(driver){
    console.log(driver);
    this.driver_id=driver.driver_id;
    console.log(this.driver_id)
    this.tooltipText="enable?";
    let JSONStr="{'request':{'driver_id': '"+this.driver_id+"'}}";
    console.log(JSONStr)
    if(driver.status == 0){
        this._driverService.enableDriver(JSONStr).subscribe((response)=>{
          this.isDeleted=response.result;
          this._driverService.getDrivers().subscribe(resp=>{
            this.drivers=resp.result;
            this.initShowDetails(this.drivers);
          })
        })

    }
    else{
      
    this._driverService.deleteDriver(JSONStr).subscribe((response)=>{
      //console.log(response);
      this.isDeleted=response.result;
      if (this.isDeleted == "active")
      this.popup=true;
      //this.popupString="The selected entry has been deleted!";  
      this._driverService.getDrivers().subscribe(resp=>{
        this.drivers = resp.result;
        this.initShowDetails(this.drivers);
            });
    });
    }
  }
  initShowDetails(Driver){
    this.showDriverArr = [];
    for(var i=0; i<Driver.length; ++i){
      this.showDriverArr.push(false);
    }
  //  console.log(this.showVenArr);
  }

  onShowDetails(i){
    if(this.click == 0)
    {
    $('#dr-'+i).slideDown();
    this.showDriverArr[i] = true;
    this.click= this.click +1;
  }
  else{
    $('#dr-'+i).slideUp();
    this.showDriverArr[i] = false;
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

  backed(){
    this.popup=false;
  }
  checkCompliance(driver){
    if(driver.compliance==0)
    return true;
    else
    return false;
  }

  searchFlagged(){
    this.filterType='driver_compliance';
    this.filterValue=0;
    this.search();
    this.filterType='';
    this.filterValue='';
  }
}


