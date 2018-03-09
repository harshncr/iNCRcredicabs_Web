import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onlogin: EventEmitter<any> = new EventEmitter<any>();
  constructor(private loginService: LoginService, private _router: Router) {
    this.router = _router;
  }

  router: Router;
  error = false;
  login = {};
  responseJSON = {};
  user = new User('', '');
  errorMessage = '';

  ngOnInit() {    
    // this.loginService.startLogin(this.user).subscribe(
    //   (data) => {
    //     if(data['login']){
    //       return this.router.navigateByUrl('dash');
    //     }
    // });
  }

  onSubmit(f) {
    this.loginService.startLogin(this.user).subscribe(
      (data) => {
          this.responseJSON = data;
          this.login = this.responseJSON['login'];
          if(this.login){
            // this.onlogin.emit(f);
            this.router.navigateByUrl('dash');
          }else{
            this.error = true;
            this.errorMessage = this.responseJSON['message'];
          }
    });
  }
}
