import { Component, OnInit } from '@angular/core';
import { CabService } from '../cab.service';
import { CabData } from './cabData';
import { Router } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-cab-list',
  templateUrl: './cab-list.component.html',
  styleUrls: ['./cab-list.component.css']
})
export class CabListComponent implements OnInit {

  public filterType='';
  public filterValue;

  public cabs=[];
  public selectedItem;

  public cab_num;
  public isDeleted;
  public popupString="";
  public tooltipText="disable?";
  public showCabArr = [];
  new:boolean = false;
  public message;
  public msgValue;
  
  constructor(private _cabService: CabService, private _cabData: CabData, private router: Router) { }

  ngOnChanges(){
    console.log("1");
  }
  
  ngOnInit() {
    this._cabService.getCabs().subscribe(resp=>{
      this.cabs = resp.result;
      this.initShowDetails(this.cabs);
          });
          this.isDeleted=false;  
          this.popupString="Are you sure, You want to delete this entry from Database?";
  }

  view(cab){

    
    this.selectedItem=cab;
    //console.log(cab);
   // console.log(cab.cab_no);
    this._cabData.setItem(this.selectedItem);
    //console.log(this._cabData.getItem());
    this.router.navigate(['view-cab']);
    
  }
  update(cab){
    console.log(cab);
    this.selectedItem=cab;
    this._cabData.setItem(this.selectedItem);
    this.router.navigate(['cab-update']);
  }

  search(){
    if(this.filterType=='')
    return ;
    console.log(this.filterType+" "+this.filterValue);
    
    let JSONStr = "{'request':{'"+this.filterType+"': '"+this.filterValue+"'}}";
    // console.log(body);
    this._cabService.searchCab(JSONStr).subscribe((response)=>{
      this.cabs=response.result;
    });
  }

  
  checkStatus(cab){
    if(cab.status==1)
    return "panel-danger";
    else
    return "panel-info";
  }

  text(cab){
    if(cab.status==1)
    return "enable?";
    else
    return "disable?";
  }

  color(cab){
    console.log(cab.status);
    if(cab.status==1)
    return "#5cb85c";
    else
    return "#d9534f";
  }

  disable(cab){
    if(cab.status==1)
    return "cdisabled";
    else
    return "";
  }

  check(cab){
    if(cab.status==1)
    return false;
    else
    return true;
  }

  status(cab){
    this.cab_num=cab.cab_no;
    this.tooltipText="enable?";
    let JSONStr="{'request':{'cab_license_plate_no': '"+cab.cab_no+"'}}";
    if(cab.status == 1){
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
  //  console.log(this.showVenArr);
  }

  onShowDetails(i){
    $('#cb-'+i).slideDown();
    this.showCabArr[i] = true;
  }

  onHideDetails(i){
    $('#cb-'+i).slideUp();
    this.showCabArr[i] = false;
  }


}
