import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { UserCredService } from '../Services/user-cred.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.css']
})
export class EmployeeChangePasswordComponent implements OnInit {
  ////-------------data for loader-------------
  showLoader              = true;
  loaderText              = "Loading...";
  ////-----------------------------------------

  showError               = false;
  showSuccess             = false;
  message                 = '';

  currentPassword?:string = '';
  password1?:string = '';
  password2?:string = '';
  buttonDisabled?:String;
  qlid:string = 'zz000000';
  token:string;
  responseJSON = {success: false, message: ''};
  showResponse = false;
  // message = "";
  tokenValid = false;
  invalidTokenError = true;
  showLoading = true;

  formTest = {
    char8: false,
    ucase: false,
    lcase: false,
    num: false,
    pwdmatch: false
  };

  formError = {
    currentPassword: {error: false, message: ''},
    password1: {error: false, message: ''},
    password2: {error: false, message: ''}
  };

  constructor(
    private userCredService: UserCredService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeService.getQlid().subscribe((data) => {
      if(data.success){
        this.qlid = data.qlid;
        console.log(this.qlid);
      }else{
        // do something
      }

      this.showLoader = false;
    });
  }

  onSave(f){
    this.refreshErrorValues();
    if(this.validate()){
      console.log('!!');
      let payload = {
        currentPassword: this.currentPassword,
        password1: this.password1,
        password2: this.password2        
      };

      this.userCredService.setPassword(payload).subscribe((data) => {
        if(data != null && data != undefined){
          if(data.success){
            this.showSuccess = true;
            this.showError = false;
          }else{
            this.showError = true;
            this.showSuccess = false;
          }
          this.message = data.message;
        }else{
          this.showError = true;
          this.message = 'No data received!';
        }
        console.log(data);
      });
    }
  }

  validate(){
    this.refreshErrorValues();
    let validateStatus = true;

    if(this.password1 != this.password2){
      validateStatus = false;
    }

    if(this.password1 != null && this.password1 != undefined){
      if(this.password1.toUpperCase().match(this.qlid.toUpperCase()) != null){
        validateStatus = false;
        this.formError.password1.error = true;
        this.formError.password1.message = 'Error! Password cannot be qlid!'; 
      }
    }else{
      validateStatus = false;
    }
    
    if(this.password2 != null && this.password2 != undefined){
      if(this.password2.toUpperCase().match(this.qlid.toUpperCase()) != null){
        validateStatus = false;
        this.formError.password2.error = true;
        this.formError.password2.message = 'Error! Password cannot be qlid!'; 
      }
    }else{
      validateStatus = false;
    }

    if((this.formTest.char8 && this.formTest.ucase && this.formTest.lcase
      && this.formTest.num && this.formTest.pwdmatch
      && this.formError.password1.error == false
      && this.formError.password2.error == false) == false
    ){
      validateStatus = false;
    }

    return validateStatus;
  }

  input(){
    this.validate();
  }

  onInput(f){
    var ucase = /[A-Z]+/;
    var lcase = /[a-z]+/;
    var num = /[0-9]+/;

    this.validate();
    
    if(this.password1.length >= 8 && this.password1.length <= 16){
      $("#8char").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color","#00A41E");
      this.formTest.char8=true;
    }else{
      $("#8char").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color","#FF0004");
      this.formTest.char8=false;
    }
    
    if(ucase.test(this.password1)){
      $("#ucase").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color","#00A41E");
      this.formTest.ucase=true;
    }else{
      $("#ucase").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color","#FF0004");
      this.formTest.ucase=false;
    }
    
    if(lcase.test(this.password1)){
      $("#lcase").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color","#00A41E");
      this.formTest.lcase=true;
    }else{
      $("#lcase").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color","#FF0004");
      this.formTest.lcase=false;
    }
    
    if(num.test(this.password1)){
      $("#num").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color","#00A41E");
      this.formTest.num=true;
    }else{
      $("#num").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color","#FF0004");
      this.formTest.num=false;
    }
    
    if(this.password1 == this.password2 && this.password1 != null){
      $("#pwmatch").removeClass("glyphicon-remove").addClass("glyphicon-ok").css("color","#00A41E");
      this.formTest.pwdmatch=true;      
    }else{
      $("#pwmatch").removeClass("glyphicon-ok").addClass("glyphicon-remove").css("color","#FF0004");
      this.formTest.pwdmatch=false;
    }
    if(this.formTest.char8 && this.formTest.ucase && this.formTest.lcase
      && this.formTest.num && this.formTest.pwdmatch
      && this.formError.password1.error == false
      && this.formError.password2.error == false
      && this.currentPassword != '' && this.currentPassword.length > 1
    ){
      $('#submit-button').css({
        'background-color': '#337ab7', 'border-color': '#2e6da4', 'cursor': 'pointer'
      });   
    }else{
      $('#submit-button').css({
        'background-color': '#888888', 'border-color': '#888888', 'cursor': 'no-drop'
      });
    }
  }

  closeErrorBox(){
    this.showError = false;
  }

  closeSuccessBox(){
    this.showSuccess = false;
    this.password1 = '';
    this.password2 = '';
    this.currentPassword = '';
  }

  refreshErrorValues(){
    this.formError.password1.error = false;
    this.formError.password2.error = false;

    this.formError.password1.message ='';
    this.formError.password2.message ='';
  }
}
