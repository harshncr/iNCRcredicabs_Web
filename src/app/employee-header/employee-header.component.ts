import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
  admin = false;
  empFName = 'Me';
  @Output() onRoleChange: EventEmitter<any> = new EventEmitter();
  
  constructor(
    private router: Router,
    private loginService: LoginService,    
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.checkLoginStatus();
    if(localStorage.getItem('role') != null && localStorage.getItem('role') != 'null'
      && localStorage.getItem('role') != "" && localStorage.getItem('role') != undefined
      && localStorage.getItem('role') != 'undefined'
    ){
      console.log(localStorage.getItem('role'));
      if(localStorage.getItem('role') == 'ADMIN'){
        this.admin = true;
      }

      if(localStorage.getItem('empFName') != undefined && localStorage.getItem('empFName') != null){
        this.empFName = localStorage.getItem('empFName');
      }
    }else{
      // let resp;
      // this.employeeService.getRole().subscribe((data) => {
      //   if(data != null || data != "" || data != undefined){
      //     // resp = data.roleName;
      //     this.empFName = data.empFName;
      //     console.log(data);
      //     localStorage.setItem('role', data.roleName);
      //     localStorage.setItem('empFName', data.empFName);
      //     if(localStorage.getItem('role') != 'ADMIN'){
      //       this.router.navigateByUrl('/employee-dash');
      //     }
      //   }        
      //   setTimeout(this.onRoleChange.emit(), 1000);
      // });
    }

    //// check every 90 seconds whether user is logged in!
    setInterval(()=>{this.checkLoginStatus()}, 90000);
  }

  checkLoginStatus(){
    let now = new Date();
    console.log(now +'>>>> Checking login status....');
    this.loginService.checkLoginStatus().subscribe((data)=>{
      if(data['login'] == false){
        return this.router.navigateByUrl('/no-session');
      }else{
        console.log('>>>> logged in!');
      }
    });
  }
}