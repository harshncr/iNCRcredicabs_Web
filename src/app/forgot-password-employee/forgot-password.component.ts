import { Component, OnInit } from '@angular/core';
import { ForgotpasswordService } from '../Services/forgotpassword.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
qlid:string;
a:string;
showError = false;
  showSuccess = false;
  formError = {
    empQlid: {error: false, message: ''}
  };
  message = "";
  
   constructor(private forgotpasswordService: ForgotpasswordService) {
   // this.employee = new Employee();
   this.forgotpasswordService.forgotpassword(this.qlid);
  
    
   }

  ngOnInit() {
    
  }
  onSave(f){
  // console.log(this.qlid);
   if(this.validate()){
      this.showSuccess = true;
      this.showError = false;
      this.forgotpasswordService.forgotpassword({qlid: this.qlid}).subscribe((data)=>{
        console.log(data);
        // return response.json();
      
      });
  
      this.message = "Employee successfully added to the Database!";
    }else{
      this.showSuccess = false;
      this.showError = true;
      this.message = "Employee could not be added to the Database!";
    
  
}
}

validate(){
    let validateStatus = true;
    let qlidPattern = /^\w\w\d{6}$/i;
    if(this.qlid != null){
      if(this.qlid.match(qlidPattern) == null){       
        validateStatus = false;        
        this.formError.empQlid.error = true;
        this.formError.empQlid.message = 'Invalid QLID format!';
      }
    }else{
     validateStatus = false;
      this.formError.empQlid.error = true;
      this.formError.empQlid.message = 'QLID cannot be empty!'; 
    }
return validateStatus;
  }
}
