import { Component, OnInit,Input } from '@angular/core';
import { EmployeeData } from '../view-employee/employeeData';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Model/employee';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
  selector: 'app-view-employee-details',
  templateUrl: './view-employee-details.component.html',
  styleUrls: ['./view-employee-details.component.css']
})

export class ViewEmployeeDetailsComponent implements OnInit {
  public emp: Employee;
  ////-------------data for header-------------
  module                = "employee";
  navLocation           = "/ View Details";
  ////-----------------------------------------

  ////-------------data for loader-------------
  showLoader            = true;
  loaderText            = "Loading...";
  ////-----------------------------------------


  showDeactivatePopup   = false;
  error                 = false;
  errorMessage          = '';
  employeeLoaded        = false;
  roleLoaded            = false;
  selectedItem;
  currEmployeeRole;       //// The current employee role
  
  constructor(
    public _employeeData: EmployeeData,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // console.log('aaa'+this._employeeData.getItem());
    this.emp = this._employeeData.getItem();

    if(this.emp != null && this.emp != undefined){
      //// if employee data from previous component is initialized,
      //// initialize employee role based on rolesId
      
      this.employeeService.getAllRoles().subscribe((roleData) => {
        this.currEmployeeRole = roleData[this.emp.rolesId];
        this.roleLoaded = true;
        console.log('Roles Loaded!');
      });
    }else{
      this.route.params.subscribe((params) => {
        let qlid = params['qlid'];
        this.employeeService.getEmployeeByQlid(qlid).subscribe((data) => {
          if(data != null && data != undefined){
            if(data.success){
              this.emp = data;
              this.employeeLoaded = true;
              console.log('Employee loaded!');
              console.log(this.emp);
              
              //// now initialize employee role based on rolesId
              this.employeeService.getAllRoles().subscribe((roleData) => {
                this.currEmployeeRole = roleData[this.emp.rolesId];
                this.roleLoaded = true;
                console.log('Roles Loaded!');
              });
            }else{
              this.error = true;
              if(data.message != null){
                this.errorMessage = data.message;
              }else{
                this.errorMessage = 'Couldn\'t find the user with qlid: ' + qlid
              }
            }
          }else{
            this.error = true;
            this.errorMessage = 'Error retrieving the data!';
          }
        });
      });

      // this.employeeService.currentEmp.subscribe((emp) => {
      //   this.emp = emp;
      //   this.initCurrEmployeeRole(this.emp);
      //   // console.log(emp);
      // });
      // this.router.events.subscribe((e) => {
      //   if(e instanceof NavigationEnd){
      //     // this.getEmployeeFromUrl();
      //   }
      // });
    }
  }

  //// To initialise the role of the current employee
  initCurrEmployeeRole(emp:Employee){
    this.employeeService.getAllRoles().subscribe((data) => {
      this.currEmployeeRole = data[emp.rolesId];
      return;
    });
  }

  getEmployeeFromUrl(){    
    let url = this.router.url;
    let urlQlidMatch = url.match(/^\/employee\/view\/details\/(\w\w\d{6})$/i);
    let qlidArr = url.split('/');
    let qlid = qlidArr[qlidArr.length - 1];
    if(urlQlidMatch != null){
      this.employeeService.viewEmployee({filterType:'empqlid', filterValue: qlid})
        .subscribe((data) => {
          this.emp = data[0];
          // console.log(data);
      });
    }
  }

  editEmployee(emp){
    this.selectedItem = emp;
    this._employeeData.setItem(this.selectedItem);
    this.router.navigate(['employee/edit']);
    this.employeeService.giveEmployee(emp);
  }

  showPopup(){
    this.showDeactivatePopup = true;
  }

  hidePopup(){
    this.showDeactivatePopup = false;
    this.employeeService.viewEmployee({filterType: 'empqlid', filterValue: this.emp.empQlid})
      .subscribe((data) =>{
        this.emp = data[0];
        console.log(data);
    });
  }

  changeStatus(){
    if(this.emp.empStatus == 'I'){
      this.employeeService.activateEmployee(this.emp).subscribe((data) => {
        if(data.success == true){
          console.log('!!');
          this.hidePopup();
        }else{
          this.error = true;
          this.errorMessage = "Error: The Employee status could not be updated!";
        }
      });
    }else{
      this.employeeService.deactivateEmployee(this.emp).subscribe((data) => {
        if(data.success == true){
          console.log('!!');
          this.hidePopup();
        }else{
          this.errorMessage = "Error: The Employee status could not be updated!";
        }
      });
    }
  }

  onMouseEnter(tgt){
    let ttParent;
    let tt;
    let childId;
    let leftMargin;
    let id;
    
    //// Get the target .tooltip-text and make an 'id' string for jquery....
    for(var i=0; i<tgt.parentElement.children.length; ++i){
      if(tgt.parentElement.children[i].className == 'tooltip-text'){
        id = '#' + tgt.parentElement.children[i].id;
        break;
      }    
    }

    //// Since the tooltip text is to the right, set it to the left...
    leftMargin = -1 * Math.round(($(id).width())/4);
    
    //// If margins are not set
    if(($(id).attr('marginset')) == undefined){
      //// Different left margin settings for different buttons
      leftMargin = 0;
      if(id.match(/vd-eed$/i)){
        leftMargin = -65;
      }
      else if(id.match(/vd-de$/i)){
        leftMargin = 10;
      }     
      else if(id.match(/vd-ae$/i)){
        leftMargin = 10;
      }

      //// Finally, set the margins....
      $(id).css('margin', '5px 0px 0px '+ leftMargin + 'px');
      $(id).attr('marginset', 'true');
    }

    $(id).css('display', 'inherit');


  }

  onMouseLeave(tgt){
    $('.tooltip-text').css('display', 'none');
  }
}