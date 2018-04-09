import { Component, OnInit, EventEmitter, Output }  from '@angular/core';
import { LoginService }                             from '../Services/login.service';
import { User }                                     from '../Model/user';
import { Router }                                   from '@angular/router';
import { EmployeeService } from '../Services/employee.service';

declare var grecaptcha:any;
declare var grecaptchaLoaded: boolean;
declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader              = true;
  loaderText              = "Loading...";
  ////-----------------------------------------

  @Output() onlogin: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private loginService: LoginService,
    private _router: Router,
    private employeeService: EmployeeService    
  ) {
    this.router = _router;
  }

  router: Router;
  error = false;
  login = {};
  responseJSON = {};
  user = new User('', '', '');
  errorMessage = '';
  reCaptchaResponse;

  ngOnInit() {    
    $('#login-error').hide();  
    console.log(grecaptchaLoaded);
    this.loginService.checkLoginStatus().subscribe(
      (data) => {
        if(data.login){
          return this.router.navigateByUrl('dash');
        }
        this.showLoader = false;
    });
  }

  onSubmit(f) {
    this.showLoader = true;
    // console.log(grecaptchaLoaded);
    // console.log('"'+this.user.grecaptchaResponse.length+'"');
    this.loginService.startLogin(this.user).subscribe((data) => {
      this.responseJSON = data;
      this.login = this.responseJSON['login'];
      if(this.login){
        this.employeeService.getRole().subscribe((data) => {
          if(data != null || data != "" || data != undefined){
            console.log(data);
            // localStorage.setItem('role', data.roleName);
            // localStorage.setItem('empFName', data.empFName);
            // if(localStorage.getItem('role') != 'ADMIN'){
            //   this.router.navigateByUrl('/employee-dash');
            // }

            
            sessionStorage.setItem('role', data.roleName);
            sessionStorage.setItem('empFName', data.empFName);
            if(sessionStorage.getItem('role') != 'ADMIN'){
              this.router.navigateByUrl('/employee-dash');
            }
          }
        });

        this.router.navigateByUrl('dash');
      }else{
        this.error = true;
        $('#login-error').slideDown();
        this.errorMessage = this.responseJSON['message'];
      }
    });
    this.showLoader = false;
  }

  errorClose(){
    this.error = false;
  }
}
