import { Component, OnInit } from '@angular/core';
import { CabService } from '../cab.service';
import { CabData } from './cabData';
import { Router } from '@angular/router';
import { VendorData } from '../vendor-list/vendorData';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-cab-list',
  templateUrl: './cab-list.component.html',
  styleUrls: ['./cab-list.component.css']
})
export class CabListComponent implements OnInit {
  module = "vendor";
  public popup;
  public filterType='';
  public filterValue;
  showLoading = true;
  loadb=true;
  showFilterPanel = false;
  //loada=false;
  public click = 0;

  navLocation = "/ View Cab"

  public cabs=[];
  public selectedItem;

  id;
  public cab_num;
  public isDeleted;
  public popupString="";
  public tooltipText="disable?";
  public showCabArr = [];
  new:boolean = false;
  public message;
  public msgValue;
  
  constructor(private _cabService: CabService, private _cabData: CabData,private _vendors:VendorData, private router: Router, private route:ActivatedRoute ) { }

  ngOnChanges(){
    
    // console.log("1");
  }
  
  ngOnInit() {
    this.filterType='';
    this.filterValue='';
    this.popup=false;
    // //this.route.queryParams
    //   .filter(params => params.id).subscribe(params=>{
    //     console.log(params);
    //     this.id=params.id;
    //   })
         
    this._cabService.getCabs().subscribe(resp=>{
      this.cabs = resp.result;
     console.log(this.cabs)
      if(this.cabs.length != 0)
      {
        this.showLoading= false;
      }
      this.initShowDetails(this.cabs);
          });
          this.isDeleted=false;  
          this.popupString="Are you sure, You want to delete this entry from Database?";
  }

  view(cab){

    // localStorage.removeItem('Driver');
    // localStorage.removeItem('Vendor');
    // localStorage.removeItem('Cab');
    // localStorage.setItem('Cab', JSON.stringify(cab));
    //this.selectedItem=cab;
    console.log(cab);
   // console.log(cab.cab_no);
    //this._cabData.setItem(this.selectedItem);
    //console.log(this._cabData.getItem());
    this.router.navigate(['view-cab', cab.cab_id]);
    
  }
  update(cab){
    // localStorage.removeItem('Driver');
    // localStorage.removeItem('Vendor')
    // localStorage.setItem('Cab', JSON.stringify(cab));
    // console.log(cab);
    //this.selectedItem=cab;
    //this._cabData.setItem(this.selectedItem);
    this.router.navigate(['cab-update' , cab.cab_id]);
  }

  search(){
    this.showLoading=true;
    if(this.filterType==''){
      this._cabService.getCabs().subscribe(resp=>{
        this.cabs = resp.result;
       // console.log(this.cabs)
        if(this.cabs.length != 0)
        {
          this.showLoading= false;
        }
        this.initShowDetails(this.cabs);
            });
      return ;
  }
    //console.log(this.filterType+" "+this.filterValue);
    
    let JSONStr = "{'request':{'"+this.filterType+"': '"+this.filterValue+"'}}";
    // console.log(body);
    this._cabService.searchCab(JSONStr).subscribe((response)=>{
      
      this.cabs=response.result;
      this.showLoading=false;
      console.log(this.cabs);
    });
  }

  
  checkStatus(cab){
    if(cab.status==0)
    return "panel-danger";
    else
    return "panel-info";
  }

  text(cab){
    if(cab.status==0)
    return "enable?";
    else
    return "disable?";
  }

  searchFlagged(){
    this.filterType='cab_compliance';
    this.filterValue=0;
    this.search();
    this.filterType='';
    this.filterValue='';
  }
  color(cab){
    //console.log(cab.status);
    if(cab.status==0)
    return "#5cb85c";
    else
    return "#d9534f";
  }

  disable(cab){
    if(cab.status==0)
    return "cdisabled";
    else
    return "";
  }

  check(cab){
    if(cab.status==0)
    return false;
    else
    return true;
  }

  status(cab){
    this.cab_num=cab.cab_no;
    this.tooltipText="enable?";
    let JSONStr="{'request':{'cab_license_plate_no': '"+cab.cab_no+"'}}";
    if(cab.status == 0){
        this._cabService.enableCab(JSONStr).subscribe((response)=>{
          this.isDeleted=response.result;
          this._cabService.getCabs().subscribe(resp=>{
            this.cabs=resp.result;
            console.log(this.cabs);
            this.initShowDetails(this.cabs);
          })
        })

    }
    else{
      
    this._cabService.deleteCab(JSONStr).subscribe((response)=>{
      //console.log(response);
      this.isDeleted=response.result;
      if(this.isDeleted == "active")
      this.popup=true;
      //this.popupString="The selected entry has been deleted!";  
      this._cabService.getCabs().subscribe(resp=>{
        this.cabs = resp.result;
        this.initShowDetails(this.cabs);
            });
    });
    }
  }
  initShowDetails(cab){
    this.showCabArr = [];
    for(var i=0; i<cab.length; ++i){
      this.showCabArr.push(false);
    }
  // console.log(this.showCabArr);
  }

    onShowDetails(i){
      if(this.click == 0)
      {
       $('#cb-'+i).slideDown();
       this.showCabArr[i] = true;
      
      this.click=this.click+1;
     }
     else{
       $('#cb-'+i).slideUp();
       this.showCabArr[i] = false;
       this.click = 0;
   
     }
   }
  driver(cab){
    this.selectedItem= cab.cab_no;
    console.log(this.selectedItem)
    console.log("upar wale value hai");
    this._cabData.setItem(this.selectedItem);
    this.router.navigate(['driver-list'],{queryParams:{cab :this.selectedItem}, queryParamsHandling: 'merge'});

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

  checkCompliance(cab){
    // console.log(cab.compliance + "this is the real one");
    if(cab.compliance == 0)
    return true;
    else
    return false;
  }
}


