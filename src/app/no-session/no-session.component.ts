import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginService } from '../Services/login.service';
import { User } from '../Model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-session',
  templateUrl: './no-session.component.html',
  styleUrls: ['./no-session.component.css']
})
export class NoSessionComponent implements OnInit {
  router: Router;
  logout = {logout: false, message: ''};

  constructor(private loginService:LoginService){}

  ngOnInit() {
    localStorage.removeItem('role');
    localStorage.clear();
  }
}
