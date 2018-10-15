import { Component, OnInit, Input } from '@angular/core';
import { Employee }                 from '../Model/employee';
import { EmployeeService }          from '../Services/employee.service';
import { MgrRequest }               from '../Model/mgrRequest';
import { Manager }                  from '../Model/manager';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  ////-------------data for header-------------
  module                  = "EMPLOYEE";
  navLocation             = "/ Add Employee";
  ////-----------------------------------------

  ////-------------data for loader-------------
  showLoader              = true;
  loaderText              = "Loading...";
  ////-----------------------------------------

  //// For loader that appears after clicking on "Save"
  showSaveLoader          = false;

  //// Text to show along with loader when "save" is clicked!
  textOnSave              = "Saving.... Please Wait!";

  textInputDisabled       = false;
  showError               = false;
  showSuccess             = false;
  mgr:string              = null;
  mgrSuggestion           = false;
  saveClicked             = false;
  managersLoaded          = false;

  emp: Employee;
  mgrReq:MgrRequest;
  selectedManager:string;
  selectedManager1:string;
  selectedManager2:string;
  mgrArr:Array<Manager> = [];

  //// Stores which fields have been altered by the user....
  altered = {
    empQlid:      false,
    empFName:     false,
    empMName:     false,
    empLName:     false,
    empMobNbr:    false,
    empGender:    false,
    rolesId:      false,
    empMgrQlid1:  false,
    empMgrQlid2:  false,
    empAddLine1:  false,
    empAddLine2:  false,
    empZone:      false,
    empPin:       false,
    empPickupArea:false,
    empHomeNbr:   false,
    empEmergNbr:  false,
    empBloodGrp:  false
  };
  //// Initialise formError
  formError = {
    empQlid:        {error: false, message: ''},
    empFName:       {error: false, message: ''},
    empMName:       {error: false, message: ''},
    empLName:       {error: false, message: ''},
    empMobNbr:      {error: false, message: ''},
    empGender:      {error: false, message: ''},
    rolesId:        {error: false, message: ''},
    empMgrQlid1:    {error: false, message: ''},
    empMgrQlid2:    {error: false, message: ''},
    empAddLine1:    {error: false, message: ''},
    empAddLine2:    {error: false, message: ''},
    empZone:        {error: false, message: ''},
    empPin:         {error: false, message: ''},
    empPickupArea:  {error: false, message: ''},
    empHomeNbr:     {error: false, message: ''},
    empEmergNbr:    {error: false, message: ''},
    empBloodGrp:    {error: false, message: ''}
  };

  message = "";

  constructor(private employeeService: EmployeeService) {
    this.emp = new Employee();
    this.emp.empGender = '';
    this.emp.rolesId = '';
    this.emp.empEmergNbr = '9999999999';
    this.emp.empBloodGrp = 'O+';
  }

  ngOnInit() {
    this.mgrSuggestion = true;
    this.employeeService.getAllManagers().subscribe((data) => {
      this.mgrArr = data;
      this.showLoader = false;
      this.managersLoaded = true;
    });
  }

  setManagerQlid1(mgr){
    let strArr = mgr.split(':');
    let mgrQlid1;
    if(strArr){
      mgrQlid1 = strArr[1].replace(/\s/g, '');
    }
    this.emp.empMgrQlid1 = mgrQlid1;
  }

  setManagerQlid2(mgr){
    let strArr = mgr.split(':');
    let mgrQlid2;
    if(strArr){
      mgrQlid2 = strArr[1].replace(/\s/g, '');
    }
    this.emp.empMgrQlid2 = mgrQlid2;
  }

  onMgrQlid1Change(qlid){
    let mgrIndex1 = -1;
    this.emp.empMgrQlid1 = this.emp.empMgrQlid1.toUpperCase();

    for(var i=0; i<this.mgrArr.length; ++i){
      if(this.mgrArr[i].mgrQlid.toUpperCase() == qlid.toUpperCase()){
        mgrIndex1 = i;
        break;
      }
    }

    if(mgrIndex1 == -1 || this.mgrArr == null || this.mgrArr == undefined){
      this.selectedManager1 = '';
      return;
    }

    this.selectedManager1 = this.mgrArr[mgrIndex1].mgrFName + ' ' +
                            this.mgrArr[mgrIndex1].mgrLName + ' : ' +
                            this.mgrArr[mgrIndex1].mgrQlid;
  }

  onMgrQlid2Change(qlid){
    let mgrIndex2 = -1;
    this.emp.empMgrQlid2 = this.emp.empMgrQlid2.toUpperCase();

    for(var i=0; i<this.mgrArr.length; ++i){
      if(this.mgrArr[i].mgrQlid.toUpperCase() == qlid.toUpperCase()){
        mgrIndex2 = i;
        break;
      }
    }

    if(mgrIndex2 == -1 || this.mgrArr == null || this.mgrArr == undefined){
      this.selectedManager2 = '';
      return;
    }

    this.selectedManager2 = this.mgrArr[mgrIndex2].mgrFName + ' ' +
                            this.mgrArr[mgrIndex2].mgrLName + ' : ' +
                            this.mgrArr[mgrIndex2].mgrQlid;
  }

  onSave(f){
    // this.showLoader = true;
    this.saveClicked = true;
    this.textInputDisabled = true;
    this.showSaveLoader = true;
    this.showError = false;
    this.showSuccess = false;
    this.refreshErrorValues();
    this.scrollToBottom();

    if(this.validate()){
      this.employeeService.addEmployee(this.emp).subscribe((data) => {
        console.log(data);
        if(data.success){
          this.showSuccess = true;
          this.showError = false;
          this.message = "Employee successfully added!";
        }else{
          console.log("saari problem ki jadd!");
          this.formError = Object.assign({}, this.formError, data);
          this.showError = true;
        }

        this.textInputDisabled = false;
        this.showSaveLoader = false;
        this.scrollToTop();
      });
      
    }else{
      this.showSuccess = false;
      this.showError = true;
      this.message = "Employee could not be added!";

      this.textInputDisabled = false;
      this.showSaveLoader = false;
      this.scrollToTop();
    }

    // this.showLoader = false;
  }

  newEmployee(){
    this.refreshErrorValues();
    this.resetAltered();
    this.resetForm();
    this.showError               = false;
    this.showSuccess             = false;
    this.showLoader              = false;
    this.selectedManager1        = null;
    this.selectedManager2        = null;
  }

  validate(){
    let validateStatus = true;

    let qlidPattern     = /^[a-zA-Z]{2}\d{6}$/i;
    let mobPattern      = /^\d{10}$/i;
    let pinPattern      = /^\d{6}$/i;
    let bloodGrpPattern = /^(A|B|AB|O|a|b|ab|o)[\\+\\-]$/i;
    let genderPattern   = /^((M|F)|(m|f))$/i;

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
      if(mobPattern.test(this.emp.empMobNbr) == false){
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
      }else{
        let isValidManagerQlid = false;
        for(var i=0; i<this.mgrArr.length; ++i){
          if(this.emp.empMgrQlid1.toUpperCase() == this.mgrArr[i].mgrQlid.toUpperCase()){
            isValidManagerQlid = true;
            break
          }
        }

        if(isValidManagerQlid == false){
          validateStatus = false;
          this.formError.empMgrQlid1.error = true;
          this.formError.empMgrQlid1.message = 'Invalid Manager QLID';
        }
      }
    }else{
      validateStatus = false;
      this.formError.empMgrQlid1.error = true;
      this.formError.empMgrQlid1.message = 'L1 Manager QLID cannot be empty!'; 
    }

    if(this.emp.empMgrQlid2 != null){
      if(this.emp.empMgrQlid2.match(qlidPattern) == null){
        validateStatus = false;
        this.formError.empMgrQlid2.error = true;
        this.formError.empMgrQlid2.message = 'Invalid QLID format!';
      }else{
        let isValidManagerQlid = false;
        for(var i=0; i<this.mgrArr.length; ++i){
          if(this.emp.empMgrQlid2.toUpperCase() == this.mgrArr[i].mgrQlid.toUpperCase()){
            isValidManagerQlid = true;
            break
          }
        }

        if(isValidManagerQlid == false){
          validateStatus = false;
          this.formError.empMgrQlid2.error = true;
          this.formError.empMgrQlid2.message = 'Invalid Manager QLID';
        }
      }
    }else{
      validateStatus = false;
      this.formError.empMgrQlid2.error = true;
      this.formError.empMgrQlid2.message = 'L2 Manager QLID cannot be empty!'; 
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
      if((this.emp.empPin+'').match(pinPattern) == null){
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
      if(mobPattern.test(this.emp.empHomeNbr) == false){
        validateStatus = false;
        this.formError.empHomeNbr.error = true;
        this.formError.empHomeNbr.message = 'Please enter a valid home phone no';
      }
    }

    if(this.emp.empEmergNbr != null){
      if(mobPattern.test(this.emp.empEmergNbr) == false){
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
    this.formError.empQlid.error          = false;
    this.formError.empFName.error         = false;
    this.formError.empMName.error         = false;
    this.formError.empLName.error         = false;
    this.formError.empMobNbr.error        = false;
    this.formError.empGender.error        = false;
    this.formError.rolesId.error          = false;
    this.formError.empMgrQlid1.error      = false;
    this.formError.empMgrQlid2.error      = false;
    this.formError.empAddLine1.error      = false;
    this.formError.empAddLine2.error      = false;
    this.formError.empZone.error          = false;
    this.formError.empPin.error           = false;
    this.formError.empPickupArea.error    = false;
    this.formError.empHomeNbr.error       = false;
    this.formError.empEmergNbr.error      = false;
    this.formError.empBloodGrp.error      = false;
    
    this.formError.empQlid.message        = '';
    this.formError.empFName.message       = '';
    this.formError.empMName.message       = '';
    this.formError.empLName.message       = '';
    this.formError.empMobNbr.message      = '';
    this.formError.empGender.message      = '';
    this.formError.rolesId.message        = '';
    this.formError.empMgrQlid1.message    = '';
    this.formError.empMgrQlid2.message    = '';
    this.formError.empAddLine1.message    = '';
    this.formError.empAddLine2.message    = '';
    this.formError.empZone.message        = '';
    this.formError.empPin.message         = '';
    this.formError.empPickupArea.message  = '';
    this.formError.empHomeNbr.message     = '';
    this.formError.empEmergNbr.message    = '';
    this.formError.empBloodGrp.message    = '';
  }

  resetForm(){
    this.refreshErrorValues();
    this.emp.empQlid        = '';
    this.emp.empFName       = '';
    this.emp.empMName       = '';
    this.emp.empLName       = '';
    this.emp.empMobNbr      = '';
    this.emp.empGender      = '';
    this.emp.rolesId        = '';
    this.emp.empMgrQlid1    = '';
    this.emp.empMgrQlid2    = '';
    this.emp.empAddLine1    = '';
    this.emp.empAddLine2    = '';
    this.emp.empZone        = '';
    this.emp.empPin         = '';
    this.emp.empPickupArea  = '';
    this.emp.empHomeNbr     = '';
    this.emp.empEmergNbr    = '';
    this.emp.empBloodGrp    = '';

    this.showError = false;
    this.showSuccess = false;
  }

  resetAltered(){
    this.altered.empQlid = false;
    this.altered.empFName = false;
    this.altered.empMName = false;
    this.altered.empLName = false;
    this.altered.empMobNbr = false;
    this.altered.empGender = false;
    this.altered.rolesId = false;
    this.altered.empMgrQlid1 = false;
    this.altered.empMgrQlid2 = false;
    this.altered.empAddLine1 = false;
    this.altered.empAddLine2 = false;
    this.altered.empZone = false;
    this.altered.empPin = false;
    this.altered.empPickupArea = false;
    this.altered.empHomeNbr = false;
    this.altered.empEmergNbr = false;
    this.altered.empBloodGrp = false;
  }

  scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  scrollToBottom(){
    window.scrollTo(0,document.body.scrollHeight);
  }
}
