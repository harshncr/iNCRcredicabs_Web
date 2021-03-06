import { Component, OnInit, EventEmitter, AfterContentInit, AfterViewInit, AfterViewChecked, Output, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { UnscheduledRequestService } from '../Services/unscheduled-request.service';
import { UnscheduledRequestComponent } from '../unscheduled-request/unscheduled-request.component';
import { RosterService } from '../Services/roster.service';
import { ReportComponent } from '../report/report.component';
import { EmployeeService } from '../Services/employee.service';
import { DashData } from '../dash/dashData';

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
  unscheduledRequest = false;
  router: Router;
  loginService: LoginService;
  empFName = 'Me';
  checkLoginIntervalId;
  public showDownload; 
  public uploadValue:boolean=true;
  public filterReport='';
  public mode='';

  @Output() public childevent =new EventEmitter(); 
  @Output() onRoleChange: EventEmitter<any> = new EventEmitter();

  @Input() module:string;
  @Input() navLocation: string;
  @Input() loada:boolean;
  @Input() loadb:boolean;
  @Input() loadc:boolean;
  @Input() loadd:boolean;
  
  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _http:RosterService,
    private unscheduledRequestComponent:UnscheduledRequestComponent,
    private reportComponent:ReportComponent,
    private employeeService: EmployeeService,
    private _dashData: DashData,
  ) {
    this.router = _router;
    this.loginService = _loginService;
    this.showDownload=true;
  }
  ngOnInit() {
    this.headerUpdate();

    this.checkLoginStatus();

    let resp;
    // if(localStorage.getItem('role') != null && localStorage.getItem('role') != 'null'
    //   && localStorage.getItem('role') != "" && localStorage.getItem('role') != undefined
    //   && localStorage.getItem('role') != 'undefined'
    //   && localStorage.getItem('empFName') != null && localStorage.getItem('role') != 'null'
    //   && localStorage.getItem('role') != "" && localStorage.getItem('role') != undefined
    //   && localStorage.getItem('role') != 'undefined'
    // ){
    //   console.log(localStorage.getItem('role'));
    //   if(localStorage.getItem('role') != 'ADMIN'){
    //     this.router.navigateByUrl('/employee-dash');
    //   }
    //   if(localStorage.getItem('empFName') != undefined){
    //     this.empFName = localStorage.getItem('empFName');
    //   }
    // }else{
    //   this.employeeService.getRole().subscribe((data) => {
    //     if(data != null || data != "" || data != undefined){
    //       this.empFName = data.empFName;
    //       console.log(data);
    //       localStorage.setItem('role', data.roleName);
    //       localStorage.setItem('empFName', data.empFName);
    //       if(localStorage.getItem('role') != 'ADMIN'){
    //         this.router.navigateByUrl('/employee-dash');
    //       }
    //     }
        
    //     setTimeout(this.onRoleChange.emit(), 1000);
    //   });
    // }
    
    // if(sessionStorage.getItem('role') != null && sessionStorage.getItem('role') != 'null'
    //   && sessionStorage.getItem('role') != "" && sessionStorage.getItem('role') != undefined
    //   && sessionStorage.getItem('role') != 'undefined'
    //   && sessionStorage.getItem('empFName') != null && sessionStorage.getItem('role') != 'null'
    //   && sessionStorage.getItem('role') != "" && sessionStorage.getItem('role') != undefined
    //   && sessionStorage.getItem('role') != 'undefined'
    // ){
    //   console.log(sessionStorage.getItem('role'));
    //   if(sessionStorage.getItem('role') != 'ADMIN'){
    //     this.router.navigateByUrl('/employee-dash');
    //   }
    //   if(sessionStorage.getItem('empFName') != undefined){
    //     this.empFName = sessionStorage.getItem('empFName');
    //   }
    // }else{
      this.employeeService.getRole().subscribe((data) => {
        if(data != null || data != "" || data != undefined){
          this.empFName = data.empFName;
          console.log(data);
          sessionStorage.setItem('role', data.roleName);
          sessionStorage.setItem('empFName', data.empFName);
          if(sessionStorage.getItem('role') != 'ADMIN'){
            this.router.navigateByUrl('/employee-dash');
          }
        }
        setTimeout(this.onRoleChange.emit(), 1000);
      });
    // }

    if(this.reports){
      this.filterReport = this._dashData.getItem();
      this.refreshBody();  
    }

    if(this.vendor){
      this.mode=this._dashData.getItem();
    }

    //// check every 90 seconds whether user is logged in!
    this.checkLoginIntervalId = setInterval(()=>{this.checkLoginStatus()}, 90000);
  }
  
  ngOnDestroy() {
    if (this.checkLoginIntervalId) {
      clearInterval(this.checkLoginIntervalId);
    }
  }

  checkLoginStatus(){
    let now = new Date();
    console.log(now+'] Checking login status....');
    this.loginService.checkLoginStatus().subscribe((data)=>{
      if(data['login'] == false){
        clearInterval(this.checkLoginIntervalId);
        return this.router.navigateByUrl('/no-session');
      }else{
        console.log('>>>> logged in!');
      }
    });
  }

  downloadRequestExcel(){
    this.unscheduledRequestComponent.downloadRequestExcel();
  }

  downloadReportExcel(){
    this.reportComponent.downloadExcel(); 
  }

  refreshBody(){
    this.reportComponent.showDefaultData(this.filterReport); 
  }

  ngAfterViewChecked() {}
  
  emitUpload(){
    this.childevent.emit(this.uploadValue);
  }

  select_mode(){
    this._dashData.setItem(this.mode);
    this.router.navigate([this.mode]);
  }

  headerUpdate(){    
    // this.employee = false;
    // this.roster = false;
    // this.reports = false;
    // this.vendor = false;
    // this.unscheduledRequest=false;
    if(this.module != null && this.module != undefined){
      switch(this.module.toUpperCase()){
        case 'EMPLOYEE':
          this.employee = true;
          break;
        case 'VENDOR':
          this.vendor = true;
          break;
        case 'ROSTER':
          this.roster = true;
          break;
        case 'REPORTS':
          this.reports = true;
          break;
        case 'UNSCHEDULEDREQUEST':
          this.unscheduledRequest=true;
          break;
      }
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
