import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  router: Router;
  logout = {logout: false, message: ''};

  constructor(private loginService:LoginService){}

  ngOnInit() {
    this.loginService.logout().subscribe(
      (data) => {
        console.log(data);
        this.logout = data;
      }
    );
    localStorage.setItem('role', null);
    localStorage.setItem('empFName', null);
    localStorage.removeItem('role');
    localStorage.removeItem('empFName');
    localStorage.clear();
  }
}
