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
  showLoader              = false;
  loaderText              = "Loading...";
  ////-----------------------------------------

  showError               = false;
  showSuccess             = false;
  message                 = '';

  currentPassword?:string;
  password1?:string;
  password2?:string;
  buttonDisabled?:String;
  qlid:string;
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
    password1: {error: false, message: ''},
    password2: {error: false, message: ''}
  };

  constructor(private userCredService: UserCredService) { }

  ngOnInit() {}

  onSave(f){
    if(this.validate()){
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
          this.message = 'No data received!';
        }
        console.log(data);
      });
    }
  }

  validate(){
    this.refreshErrorValues();
    let validateStatus = true;

    if(this.password1 == null || this.password1 == undefined){
      validateStatus = false;
    }else{
      // if(this.password1.toUpperCase() == this.qlid.toUpperCase()){
      //   validateStatus = false;
      //   this.formError.password1.error = true;
      //   this.formError.password1.message = 'Error! Password cannot be qlid!'; 
      // }
    }
    
    if(this.password2 != null && this.password2 != undefined){
      if(this.password1 != this.password2){
        validateStatus = false;
      }
      // if(this.password2.toUpperCase() == this.qlid.toUpperCase()){
      //   validateStatus = false;
      //   this.formError.password2.error = true;
      //   this.formError.password2.message = 'Error! Password cannot be qlid!'; 
      // }
    }else{
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
    
    if(this.password1.length >= 8){
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

  refreshErrorValues(){
    this.formError.password1.error = false;
    this.formError.password2.error = false;

    this.formError.password1.message ='';
    this.formError.password2.message ='';
  }

  // currPass: string = null;
  // pass1: string = null;
  // pass2: string = null;
  // valid: boolean = false;

  // constructor(private employeeService: EmployeeService) { }

  // ngOnInit() {
  //   $("input[type=password]").keyup(function(){
  //     this.validate();
  //   });
  // }

  // validate(){
  //   let upper = false;
  //   let lower = false;
  //   let digit = false;
  //   let length = false;
  //   let equal = false;

  //   var ucase = /[A-Z]+/;
  //   var lcase = /[a-z]+/;
  //   var num   = /[0-9]+/;
    
  //   if(this.pass1.length >= 8){
  //     length = true;
  //     $("#8char").removeClass("glyphicon-remove");
  //     $("#8char").addClass("glyphicon-ok");
  //     $("#8char").css("color","#00A41E");
  //   }else{
  //     $("#8char").removeClass("glyphicon-ok");
  //     $("#8char").addClass("glyphicon-remove");
  //     $("#8char").css("color","#FF0004");
  //   }
    
  //   if(ucase.test(this.pass1)){
  //     upper = true;
  //     $("#ucase").removeClass("glyphicon-remove");
  //     $("#ucase").addClass("glyphicon-ok");
  //     $("#ucase").css("color","#00A41E");
  //   }else{
  //     $("#ucase").removeClass("glyphicon-ok");
  //     $("#ucase").addClass("glyphicon-remove");
  //     $("#ucase").css("color","#FF0004");
  //   }
    
  //   if(lcase.test(this.pass1)){
  //     lower = true;
  //     $("#lcase").removeClass("glyphicon-remove");
  //     $("#lcase").addClass("glyphicon-ok");
  //     $("#lcase").css("color","#00A41E");
  //   }else{
  //     $("#lcase").removeClass("glyphicon-ok");
  //     $("#lcase").addClass("glyphicon-remove");
  //     $("#lcase").css("color","#FF0004");
  //   }
    
  //   if(num.test(this.pass1)){
  //     digit = true;
  //     $("#num").removeClass("glyphicon-remove");
  //     $("#num").addClass("glyphicon-ok");
  //     $("#num").css("color","#00A41E");
  //   }else{
  //     $("#num").removeClass("glyphicon-ok");
  //     $("#num").addClass("glyphicon-remove");
  //     $("#num").css("color","#FF0004");
  //   }
    
  //   if(this.pass1 == this.pass2 && this.pass1 != null){
  //     equal = true;
  //     $("#pwmatch").removeClass("glyphicon-remove");
  //     $("#pwmatch").addClass("glyphicon-ok");
  //     $("#pwmatch").css("color","#00A41E");
  //   }else{
  //     $("#pwmatch").removeClass("glyphicon-ok");
  //     $("#pwmatch").addClass("glyphicon-remove");
  //     $("#pwmatch").css("color","#FF0004");
  //   }

  //   this.valid = equal && digit && lower && upper && length;
  // }

  // onSave(){
  //   this.showLoader = true;
  //   if(this.valid){
  //     let payload = {
  //       currentPassword:  this.currPass,
  //       password1:        this.pass1,
  //       password2:        this.pass2
  //     };
  //     this.employeeService.setPassword(payload).subscribe((data) => {
  //       this.showLoader = true;
  //       if(data != null || data != '' || data != undefined){
  //         if(data.success){
  //           this.showSuccess = true;            
  //           this.showError = false;
  //         }else{
  //           this.showError = true;
  //           this.showSuccess = false;
  //         }
  //         this.message = data.message;
  //       }
  //       this.showLoader = false;
  //     });
  //   }

  //   this.showLoader = false;
  // }

}
