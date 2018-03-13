import { Component, OnInit, Input } from '@angular/core';
import { Router }                   from '@angular/router';
import { RouterModule, Routes}      from '@angular/router';
import { EmployeeData }             from './employeeData';
import { Filter }                   from '../Model/filter';
import { EmployeeService }          from '../Services/employee.service';
import { Employee }                 from '../Model/employee';

declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})

export class ViewEmployeeComponent implements OnInit {
  module = "employee";
  navLocation = "/ View Employee";
  filter: Filter;
  showFilterPanel = false;
  employeeArr: Employee[];
  showLoader = true;
  loaderText = "Loading...";
  noResultError = false;
  empShowQuickDetails;
  optionsRequired = false;
  options;
  rolesCache = null;
  arr:any=[];

  constructor(
    private router: Router,
    private _employeeData: EmployeeData,
    private employeeService: EmployeeService
  ) {
    this.filter = {
      filterType: '',
      filterValue: ''
    };
  }
  public selectedItem: Employee;

  ngOnInit() {
    this.onFilterGo();
    // this.employeeService.currentEmp.subscribe((data) => {
    //   this.arr = data;
    // });
    // console.log(this.empShowQuickDetails);
    $('#filter-panel .panel-body').hide();
  }

  viewDetails(emp,selectedIndex){
    this.selectedItem = emp;
    this._employeeData.setItem(this.selectedItem);
    this.employeeService.giveEmployee(emp);
    this.router.navigate(['employee/view/details/'+emp.empQlid]);
  }

  showQuickDetails(index){
    this.empShowQuickDetails[index] = true;
    $('#qd-'+index).slideDown();
    $('.tooltip-text').css('display', 'none');
  }

  hideQuickDetails(index){
    this.empShowQuickDetails[index] = false;
    $('#qd-'+index).slideToggle();
    $('.tooltip-text').css('display', 'none');
  }

  editEmployee(emp, index){
    this.selectedItem = emp;
    this._employeeData.setItem(this.selectedItem);
    this.router.navigate(['employee/edit']);
    this.employeeService.giveEmployee(emp);
  }

  onFilterGo(){
    this.employeeService.viewEmployee(this.filter).subscribe((data) => {
      this.arr = data;
      console.log(data);
      if(data.length == 0){
        this.noResultError = true;
      }else{
        this.noResultError = false;
        this.showLoader = false;
      }
      this.empShowQuickDetails = [];
      for(var i=0; i<this.arr.length; ++i){
        this.empShowQuickDetails.push(false);
      }
    });
  }

  onFilterPanelChevronMouseEnter(tgt){
    $('.filter-panel-heading-button .tooltip-text').show();
  }

  onFilterPanelChevronMouseLeave(tgt){
    $('.filter-panel-heading-button .tooltip-text').hide();
  }

  //// Called when user clicks on one of the quick display buttons
  onPanelQuickButtonMouseEnter(tgt){
    let ttParent;
    let tt;
    let leftMargin;
    let id;
    
    //// Get the target .tooltip-text and make an 'id' string for jquery....
    for(var i=0; i<tgt.parentElement.children.length; ++i){
      if(tgt.parentElement.children[i].className == 'tooltip-text'){
        ttParent = '#' + tgt.parentElement.id;
        tt = '#' + tgt.parentElement.children[i].id;
        id = ttParent + ' ' + tt;
        break;
      }    
    }

    //// Since the tooltip text is to the right, set it to the left...
    leftMargin = -1 * Math.round(($(id).width())/4);
    
    //// If margins are not set
    if(($(id).attr('marginset')) == undefined){
      //// Different left margin settings for different buttons
      if(id.match(/vd-\d$/i)){
        leftMargin -= 18;
      }
      else if(id.match(/eed-\d$/i)){
        leftMargin += 8;
      }     
      else if(id.match(/(h|s)qd-\d$/i)){
        leftMargin = 20;
      }

      //// Finally, set the margins....
      $(id).css('margin', '5px 0px 0px '+ leftMargin + 'px').attr('marginset', 'true');
    }

    $(id).css('display', 'inherit');
  }

  onPanelQuickButtonMouseLeave(tgt){
    $('.tooltip-text').css('display', 'none');
  }

  onFilterChange(){
    if(this.filter.filterType.toUpperCase() == 'ROLESID'){
      //// If the rolesCache is null, initialize it with all roles,
      //// else set options to rolesCache
      if(this.rolesCache == null){
        this.employeeService.getAllRoles().subscribe((data) => {
          this.options = [];
          console.log(data);
          this.rolesCache = [
            {value: 1, text: data[1]},
            {value: 2, text: data[2]},
            {value: 3, text: data[3]},
            {value: 4, text: data[4]},
            {value: 5, text: data[5]}
          ];
          this.options = this.rolesCache;
        });
      }else{
        this.options = this.rolesCache;
      }
      this.optionsRequired = true;
    } else if(this.filter.filterType.toUpperCase() == 'EMPSTATUS'){
      this.options = [
        {value: 'A', text: 'Active'},
        {value: 'I', text: 'Inactive'}
      ];
      this.optionsRequired = true;
    }else{
      this.filter.filterValue = '';
      this.optionsRequired = false;      
    }
  }

  filterPanelToggle(){
    if(this.showFilterPanel){
      $('#filter-panel .panel-body').slideUp();
      this.showFilterPanel = false;
    }else{
      $('#filter-panel .panel-body').slideDown();
      this.showFilterPanel = true;
    }
  }
}