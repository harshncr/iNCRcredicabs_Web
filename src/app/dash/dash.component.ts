import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../app/employee/employee.component';
import { Router } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  // router: Router;
  constructor(private router: Router, private employeeService: EmployeeService) {}
  ngOnInit() {
    // debugger;
    let resp;
    if(localStorage.getItem('role') != null && localStorage.getItem('role') != 'null'
      && localStorage.getItem('role') != "" && localStorage.getItem('role') != undefined
      && localStorage.getItem('role') != 'undefined'){

        console.log(localStorage.getItem('role'));
        if(localStorage.getItem('role') != 'ADMIN'){
        this.router.navigateByUrl('/employee-dash');
      }
    }else{
      this.employeeService.getRole().subscribe((data) => {
        if(data != null || data != "" || data != undefined){
          resp = data.roleName;
          console.log(data);
          debugger;
          localStorage.setItem('role', resp);
          if(localStorage.getItem('role') != 'ADMIN'){
            this.router.navigateByUrl('/employee-dash');
          }
          // return;
        }
      })
    }
  }
  headerUpdate(){}
}
