import { Component, OnInit } from '@angular/core';
import { EmployeeData } from '../view-employee/employeeData';
import { EmployeeService } from '../Services/employee.service';
import { Filter } from '../Model/filter';
import { Employee } from '../Model/employee';
import { Location } from '@angular/common';
import { Manager } from '../Model/manager';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})

export class EditEmployeeComponent implements OnInit {
  emp: Employee;
  editDetails = true;
  noResultError = true;
  filter: Filter;
  mgr: string = null;
  mgrArr:Array<Manager> = [];
  mgrSuggestion = false;
  selectedManager1:string;
  selectedManager2:string;
  showSuccess = false;
  showError = false;
  message = '';

  //// Initialise formError
  formError = {
    empQlid: {error: false, message: ''},
    empFName: {error: false, message: ''},
    empMName: {error: false, message: ''},
    empLName: {error: false, message: ''},
    empMobNbr: {error: false, message: ''},
    empGender: {error: false, message: ''},
    rolesId: {error: false, message: ''},
    empMgrQlid1: {error: false, message: ''},
    empMgrQlid2: {error: false, message: ''},
    empAddLine1: {error: false, message: ''},
    empAddLine2: {error: false, message: ''},
    empZone: {error: false, message: ''},
    empPin: {error: false, message: ''},
    empPickupArea: {error: false, message: ''},
    empHomeNbr: {error: false, message: ''},
    empEmergNbr: {error: false, message: ''},
    empBloodGrp: {error: false, message: ''}
  };

  constructor(
    public _employeeData: EmployeeData,
    public employeeService: EmployeeService,
    public _location: Location
  ){ }

  ngOnInit() {
    this.employeeService.currentEmp.subscribe((emp) => {
      // emp.empStatus.toUpperCase();
      this.emp = emp;
      this.emp.empStatus = this.emp.empStatus.toUpperCase();
      this.emp.empGender = this.emp.empGender.toUpperCase();
      // console.log(this.emp);
    });
    this.mgrSuggestion = true;
    this.employeeService.getAllManagers().subscribe((data) => {
      this.mgrArr = data;
      // console.log(data);

      //// Set the Manager name 
      let mgrQlid, mgrIndex;
      for(var i=0; i<this.mgrArr.length; ++i){
        if(this.mgrArr[i].mgrQlid == this.emp.empMgrQlid1){
          mgrQlid = this.emp.empMgrQlid1;
          mgrIndex = i;
          break;
        }
      }

      if(this.mgrArr[mgrIndex] != null){
        this.selectedManager1 = this.mgrArr[mgrIndex].mgrFName + ' '
                + this.mgrArr[mgrIndex].mgrLName + ' : ' + mgrQlid;
      }
    });
  }

  onClickBack(){
    this._location.back();
  }

  setManagerQlid1(manager){
    let strArr = manager.split(':');
    let mgrQlid1;
    let mgrQlid2;
    if(strArr){
      mgrQlid1 = strArr[1].replace(/\s/g, '');
    }
    this.emp.empMgrQlid1 = mgrQlid1;
  }

  setManagerQlid2(manager){
    let strArr = manager.split(':');
    let mgrQlid2;
    if(strArr){
      mgrQlid2 = strArr[1].replace(/\s/g, '');
    }
    this.emp.empMgrQlid2 = mgrQlid2;
  }

  onSave(f){
    // console.log(this.emp);
    if(this.validate()){
      console.log("From is valid!");
      this.employeeService.editEmployee(this.emp).subscribe((data) => {
        // console.log("!!");
        // console.log(data);
        if(data.success == false){
          this.formError = data;
        }
      });
      this.showSuccess = true;
      this.showError = false;
      this.message = "Employee successfully added to the Database!";
    }else{
      console.log("Invalid!!");
      this.showSuccess = false;
      this.showError = true;
      this.message = "Employee could not be added to the Database!";
    }
  }

  validate(){
    let validateStatus = true;
    let qlidPattern = /^\w\w\d{6}$/i;
    let mobPattern = /^\d{10}$/i;
    let pinPattern = /^\d{6}$/i;
    let bloodGrpPattern = /^(A|B|AB|O|a|b|ab|o)[\\+\\-]$/i;
    let genderPattern = /^((M|F)|(m|f))$/i;

    let gender = this.emp.empGender;
    
    this.refreshErrorValues();

    if(this.emp.empQlid != null){
      if(this.emp.empQlid.match(qlidPattern) == null){
        validateStatus = false;
        this.formError.empQlid.error = true;
        this.formError.empQlid.message = 'Invalid QLID format!';
      }
    }else{
      validateStatus = false;
      this.formError.empQlid.error = true;
      this.formError.empQlid.message = 'QLID cannot be empty!'; 
    }

    if(this.emp.empFName != null){
      if(this.emp.empFName.length > 15 || this.emp.empFName == ""){
        validateStatus = false;
        this.formError.empFName.error = true;
        this.formError.empFName.message =
        'Firstname length should be between 1 and 16';
      }
    }else{
      validateStatus = false;
      this.formError.empFName.error = true;
      this.formError.empFName.message = 'First Name cannot be empty!';
    }

    if(this.emp.empMName != null){
      if(this.emp.empMName.length > 15){
        validateStatus = false;
        this.formError.empMName.error = true;
        this.formError.empMName.message = 'Middle name cannot exceed 15 characters';
      }
    }

    if(this.emp.empLName != null){
      if(this.emp.empLName.length > 15 || this.emp.empLName == ""){
        validateStatus = false;
        this.formError.empLName.error = true;
        this.formError.empLName.message = 
        'Lastname length should be between 1 and 16';
      }
    }else{
      validateStatus = false;
      this.formError.empLName.error = true;
      this.formError.empLName.message = 'Last Name cannot be empty!';
    }

    if(this.emp.empGender != null){
      if(this.emp.empGender.match(genderPattern) == null){
        validateStatus = false;
        this.formError.empGender.error = true;
        this.formError.empGender.message = 'Please Select Gender!';
      }
    }else{
      validateStatus = false;
      this.formError.empGender.error = true;
      this.formError.empGender.message = 'Please Select Gender!';
    }

    if(this.emp.empMobNbr != null){
      if(this.emp.empMobNbr.match(mobPattern) == null){
        validateStatus = false;
        this.formError.empMobNbr.error = true;
        this.formError.empMobNbr.message = 'Mobile no format invalid!';
      }
    }else{
      validateStatus = false;
      this.formError.empMobNbr.error = true;
      this.formError.empMobNbr.message = 'Contact No cannot be Empty!';
    }

    //// Roles are optional, default 
    // if(this.employee.rolesId != null){
    //   if(this.employee.rolesId != '100'){
    //     validateStatus = false;
    //     this.formError.rolesId.error = true;
    //     this.formError.rolesId.message = 'Please select a Role';
    //   }
    // }

    if(this.emp.empMgrQlid1 != null){
      if(this.emp.empMgrQlid1.match(qlidPattern) == null){
        validateStatus = false;
        this.formError.empMgrQlid1.error = true;
        this.formError.empMgrQlid1.message = 'Invalid QLID format!';
      }
    }else{
      validateStatus = false;
      this.formError.empMgrQlid1.error = true;
      this.formError.empMgrQlid1.message = 'Manager QLID cannot be empty!'; 
    }

    if(this.emp.empAddLine1 != null){
      if(this.emp.empAddLine1.length > 100){
        validateStatus = false;
        this.formError.empAddLine1.error = true;
        this.formError.empAddLine1.message = 'Address Line 1 can have maximum 100 characters!';
      }
    }else{
      validateStatus = false;
      this.formError.empAddLine1.error = true;
      this.formError.empAddLine1.message = 'Address Line 1 cannot be empty!';
    }

    if(this.emp.empAddLine2 != null){
      if(this.emp.empAddLine2.length > 20){
        validateStatus = false;
        this.formError.empAddLine2.error = true;
        this.formError.empAddLine2.message = 'Address Line 2 can have maximum 40 characters!';
      }
    }else{
      validateStatus = false;
      this.formError.empAddLine2.error = true;
      this.formError.empAddLine2.message = 'Address Line 2 cannot be empty!';
    }

    if(this.emp.empZone != null){
      if(this.emp.empZone.length > 15){
        validateStatus = false;
        this.formError.empZone.error = true;
        this.formError.empZone.message = 'Zone cannot exceed 15 characters!';
      }
    }else{
      validateStatus = false;
      this.formError.empZone.error = true;
      this.formError.empZone.message = 'Zone cannot be empty!';
    }

    if(this.emp.empPin != null){
      if((this.emp.empPin+"").match(pinPattern) == null){
        validateStatus = false;
        this.formError.empPin.error = true;
        this.formError.empPin.message = 'Invalid Postal Code Pattern!';
      }
    }else{
      validateStatus = false;
      this.formError.empPin.error = true;
      this.formError.empPin.message = 'Postal Code cannot be empty!';
    }

    if(this.emp.empPickupArea != null){
      if(this.emp.empPickupArea.length > 20){
        validateStatus = false;
        this.formError.empPickupArea.error = true;
        this.formError.empPickupArea.message = 'Pickup Location cannot exceed 20 characters!';
      }
    }else{
      validateStatus = false;
      this.formError.empPickupArea.error = true;
      this.formError.empPickupArea.message = 'Pickup Location cannot be empty!';
    }

    if(this.emp.empHomeNbr != null){
      if(this.emp.empHomeNbr.match(mobPattern) == null){
        validateStatus = false;
        this.formError.empHomeNbr.error = true;
        this.formError.empHomeNbr.message = 'Please enter a valid home phone no';
      }
    }

    if(this.emp.empEmergNbr != null){
      if(this.emp.empEmergNbr.match(mobPattern) == null){
        validateStatus = false;
        this.formError.empEmergNbr.error = true;
        this.formError.empEmergNbr.message = 'Please enter a valid emergency no';
      }
    }else{
      validateStatus = false;
      this.formError.empEmergNbr.error = true;
      this.formError.empEmergNbr.message = 'Emergency no cannot be empty!';
    }

    if(this.emp.empBloodGrp != null){
      if(this.emp.empBloodGrp.match(bloodGrpPattern) == null){
        validateStatus = false;
        this.formError.empBloodGrp.error = true;
        this.formError.empBloodGrp.message = 'Please enter a valid blood group name';
      }
    }//else{
    //   validateStatus = false;
    //   this.formError.empBloodGrp.error = true;
    //   this.formError.empBloodGrp.message = 'Blood Group cannot be empty!';
    // }

    return validateStatus;
  }

  refreshErrorValues(){
    this.formError.empQlid.error = false;
    this.formError.empFName.error = false;
    this.formError.empMName.error = false;
    this.formError.empLName.error = false;
    this.formError.empMobNbr.error = false;
    this.formError.empGender.error = false;
    this.formError.rolesId.error = false;
    this.formError.empMgrQlid1.error = false;
    this.formError.empMgrQlid2.error = false;
    this.formError.empAddLine1.error = false;
    this.formError.empAddLine2.error = false;
    this.formError.empZone.error = false;
    this.formError.empPin.error = false;
    this.formError.empPickupArea.error = false;
    this.formError.empHomeNbr.error = false;
    this.formError.empEmergNbr.error = false;
    this.formError.empBloodGrp.error = false;
    
    this.formError.empQlid.message = '';
    this.formError.empFName.message = '';
    this.formError.empMName.message = '';
    this.formError.empLName.message = '';
    this.formError.empMobNbr.message = '';
    this.formError.empGender.message = '';
    this.formError.rolesId.message = '';
    this.formError.empMgrQlid1.message = '';
    this.formError.empMgrQlid2.message = '';
    this.formError.empAddLine1.message = '';
    this.formError.empAddLine2.message = '';
    this.formError.empZone.message = '';
    this.formError.empPin.message = '';
    this.formError.empPickupArea.message = '';
    this.formError.empHomeNbr.message = '';
    this.formError.empEmergNbr.message = '';
    this.formError.empBloodGrp.message = '';
  }
}