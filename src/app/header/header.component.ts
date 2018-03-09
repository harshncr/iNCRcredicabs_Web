import { Component, OnInit, EventEmitter, AfterContentInit, AfterViewInit, AfterViewChecked, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { UnscheduledRequestService } from '../Services/unscheduled-request.service';
import {UnscheduledRequestComponent} from '../unscheduled-request/unscheduled-request.component';
import { RosterService } from '../Services/roster.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewChecked {
  employee = false;
  roster = false;
  vendor = false;
  reports = false;
  router: Router;
  loginService: LoginService;
  unscheduledRequestService:UnscheduledRequestService;
  public showDownload; 
  public uploadValue:boolean=true;
  public obj =new UnscheduledRequestComponent(this.unscheduledRequestService);
  @Output() public childevent =new EventEmitter(); 
  
  constructor(private _router: Router,
              private _loginService: LoginService,
	            private _http:RosterService) {
    			this.router = _router;
    			this.loginService = _loginService;
    			this.showDownload=true;
  }

  ngOnInit() {
    this.headerUpdate();
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.headerUpdate();
      }
    });

    //// TODO: uncomment below lines after session issues are resolved!
        
    // this.loginService.checkLoginStatus().subscribe((data)=>{
    //   if(data['login'] == false){
    //     return this.router.navigateByUrl('/no-session');
    //   }
    // });
  
  }


  downloadRequestExcel(){
    this.obj.downloadRequestExcel();
  }

  ngAfterViewChecked() {}
  
  emitUpload(){
    this.childevent.emit(this.uploadValue);
  }


  headerUpdate(){
    let url = this.router.url;
    
    //// Dash
    let empRes = url.match(/\/dash.*/gi);
    if(empRes != null){
      this.employee = false;
      this.roster = false;
      this.vendor = false;
      this.reports = false;
      return;
    }
    
    //// Employee
    empRes = url.match(/\/employee.*/gi);
    if(empRes != null){
      this.employee = true;
      this.roster = false;
      this.vendor = false;
      this.reports = false;
      return;
    }

    //// Roster
    empRes = url.match(/\/roster.*/i);
    if(empRes != null){
      this.employee = false;
      this.roster = true;
      this.vendor = false;
      this.reports = false;
      return;
    }    

    //// Vendor
    empRes = url.match(/\/vendor.*/i);
    if(empRes != null){
      this.employee = false;
      this.roster = false;
      this.vendor = true;
      this.reports = false;
      return;
    }

    //// Reports
    empRes = url.match(/\/report.*/i);
    if(empRes != null){
      this.employee = false;
      this.roster = false;
      this.vendor = false;
      this.reports = true;
      return;
    }
  }

  onMouseEnterLink(tgt){
    let ttParent;
    let tt;
    let id;
    let leftMargin;
    // console.log(tgt.parentElement.children);

    for(var i=0; i<tgt.parentElement.children.length; ++i){
      if(tgt.parentElement.children[i].className == 'tooltip-text'){
        // ttParent = '#' + tgt.parentElement.id;
        id = '#' + tgt.parentElement.children[i].id;
        // id = ttParent + ' ' + tt;
        break;
      }
    }


    //// If margins are not set
    if(($(id).attr('marginset')) == undefined){
      leftMargin = -20;
      //// Finally, set the margins....
      $(id).css('margin', '5px 0px 0px '+ leftMargin + 'px');
      $(id).attr('marginset', 'true');
    }

    $(id).css('display', 'inherit');
  }

  onMouseLeaveLink(){
    $('.tooltip-text').css('display', 'none');
  }

}
