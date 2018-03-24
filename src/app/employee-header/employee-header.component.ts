import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-header',
  templateUrl: './employee-header.component.html',
  styleUrls: ['./employee-header.component.css']
})
export class EmployeeHeaderComponent implements OnInit {
  admin = true;

  constructor() { }
  ngOnInit() {
    if(localStorage.getItem('role') != null && localStorage.getItem('role') != 'null'
      && localStorage.getItem('role') != "" && localStorage.getItem('role') != undefined
      && localStorage.getItem('role') != 'undefined'
    ){
      console.log(localStorage.getItem('role'));
      if(localStorage.getItem('role') == 'ADMIN'){
        this.admin = true;
      }
    }
  }
}
