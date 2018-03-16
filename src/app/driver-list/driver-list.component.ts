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
 module = "vendor";
 navLocation = "/ View Driver"
 showLoading = true;
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
  new:boolean = false;
  cablist = false;
  constructor(private _driverService: DriverService, private _driverData: DriverData, private router: Router,private _cabData:CabData, private _vendorData:VendorData, private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.filter(params => params.id).subscribe(params=>{
     
       this.vendor_id=params.id;
       console.log(this.vendor_id);
    })
    this.route.queryParams.filter(params => params.cab).subscribe(params=>{
    this.cab_id=params.cab;
    console.log(this.cab_id);
    })
    
    this._driverService.getDriver(this.cab_id,this.vendor_id).subscribe(resp=>{
      this.drivers = resp.result;
      if(this.drivers.length !=0)
      {
        this.showLoading = false;
      }
     

      this.initShowDetails(this.drivers);
          });
          this.isDeleted=false;  
          this.popupString="Are you sure, You want to delete this entry from Database?";
  }


  view(driver){

    this.selectedItem=driver;
    //console.log(driver);
    this._driverData.setItem(this.selectedItem);
    console.log(this._driverData.getItem());
    this.router.navigate(['view-driver']);
  }
  update(driver)
  { this.selectedItem=driver;
    //console.log(driver);
    this._driverData.setItem(this.selectedItem);
    console.log(this._driverData.getItem());
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
    }
  

  checkStatus(driver){
    if(driver.status==1)
    return "panel-danger";
    else
    return "panel-info";
  }

  text(driver){
    if(driver.status==1)
    return "enable?";
    else
    return "disable?";
  }

  color(driver){
    if(driver.status==1)
    return "#5cb85c";
    else
    return "#d9534f";
  }

  disable(driver){
    if(driver.status==1)
    return "cdisabled";
    else
    return "";
  }

  check(driver){
    if(driver.status==1)
    return false;
    else
    return true;
  }

  status(driver){
    console.log(driver);
    this.driver_id=driver.driver_id;
    this.tooltipText="enable?";
    let JSONStr="{'request':{'driver_id': '"+this.driver_id+"'}}";
    if(driver.status == 1){
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
    $('#dr-'+i).slideDown();
    this.showDriverArr[i] = true;
  }

  onHideDetails(i){
    $('#dr-'+i).slideUp();
    this.showDriverArr[i] = false;
  }


}


