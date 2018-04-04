import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { UserCredService } from '../Services/user-cred.service';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-forgot-password-change-employee',
  templateUrl: './forgot-password-change-employee.component.html',
  styleUrls: ['./forgot-password-change-employee.component.css']
})
export class ForgotPasswordChangeEmployeeComponent implements OnInit {
  password1?:string;
  password2?:string;
  buttonDisabled?:String;
  qlid:string;
  token:string;
  responseJSON = {success: false, message: ''};
  showResponse = false;
  message = "";
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

  constructor(
    private route: ActivatedRoute,
    private userCredService: UserCredService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.qlid = params['qlid'];
      this.token = params['token'];

      this.userCredService.verifyPwdToken(this.qlid, this.token).subscribe((data) => {
        console.log(data);
        if(data != null && data != undefined){
          this.showLoading = false;
          if(data.valid){
            this.invalidTokenError = false;
          }else{
            this.invalidTokenError = true;
          }
        }
      });
    });
  }

  onSave(f){
    if(this.validate()){
      let userCred = {qlid: this.qlid, token: this.token, password: this.password1};
      this.userCredService.forgotPassSetPass(userCred).subscribe((data) => {
        if(data != null && data != undefined){
          this.responseJSON = data;
          this.showResponse = true;
        }
      });
    }
  }

  validate(){
    this.refreshErrorValues();
    let validateStatus = true;

    if(this.password1 == null || this.password1 == undefined){
      validateStatus = false;
    }else{
      if(this.password1.toUpperCase().match(this.qlid.toUpperCase()) != null){
        // if(this.password1.toUpperCase() == this.qlid.toUpperCase()){
        validateStatus = false;
        this.formError.password1.error = true;
        this.formError.password1.message = 'Error! Password cannot contain qlid!'; 
      }
    }
    
    if(this.password2 != null && this.password2 != undefined){
      if(this.password1 != this.password2){
        validateStatus = false;
      }

      if(this.password2.toUpperCase().match(this.qlid.toUpperCase()) != null){
        validateStatus = false;
        this.formError.password2.error = true;
        this.formError.password2.message = 'Error! Password cannot contain qlid!'; 
      }
    }else{
      validateStatus = false;
    }

    return validateStatus;
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
}