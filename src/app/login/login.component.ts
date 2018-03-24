import { Component, OnInit, EventEmitter, Output }  from '@angular/core';
import { LoginService }                             from '../Services/login.service';
import { User }                                     from '../Model/user';
import { Router }                                   from '@angular/router';

declare var grecaptcha:any;
declare var grecaptchaLoaded: boolean;

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
  constructor(private loginService: LoginService, private _router: Router) {
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
    console.log(grecaptchaLoaded);
    console.log('"'+this.user.grecaptchaResponse.length+'"');
    try{
      // if(grecaptchaLoaded){
      //   this.user.grecaptchaResponse = grecaptcha.getResponse();
      //   if(this.user.grecaptchaResponse != null && this.user.grecaptchaResponse.length > 0){
          this.loginService.startLogin(this.user).subscribe((data) => {
            this.responseJSON = data;
            this.login = this.responseJSON['login'];
            if(this.login){
              this.router.navigateByUrl('dash');
            }else{
              this.error = true;
              this.errorMessage = this.responseJSON['message'];
            }
          });
        // }else{
        //   this.error = true;
        //   this.errorMessage = 'You Must solve the Captcha!';
        // }
      // }else{
      //   this.error = true;
      //   this.errorMessage = 'reCaptcha could not be loaded, refresh the page and try again!';
      // }
    }catch(e){
      console.log(e);
      this.error = true;
      this.errorMessage = 'reCaptcha could not be loaded, refresh the page and try again!';
    }
    this.showLoader = false;
  }
}
