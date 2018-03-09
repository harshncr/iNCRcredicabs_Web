import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../app/employee/employee.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  router: Router;
  constructor() {}
  ngOnInit() {}
  headerUpdate(){}
}
