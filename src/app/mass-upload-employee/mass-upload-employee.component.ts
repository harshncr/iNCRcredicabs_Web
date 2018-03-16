import { Component, OnInit, ElementRef } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';

@Component({
  selector: 'app-mass-upload-employee',
  templateUrl: './mass-upload-employee.component.html',
  styleUrls: ['./mass-upload-employee.component.css']
})
export class MassUploadEmployeeComponent implements OnInit {
  ////-------------data for header-------------
  module                  = "employee";
  navLocation             = "/ Mass Upload";
  ////-----------------------------------------
  ////-------------data for loader-------------
  showLoader              = false;
  loaderText              = "Loading...";
  ////-----------------------------------------
  showError = false;
  showSuccess = false;
  message = '';

  constructor(private elem:ElementRef, private employeeService: EmployeeService) {}

  ngOnInit() {}

  upload(){   
    if(this.elem.nativeElement.querySelector("#uploadFile").value != ""){ 
      this.showLoader = true;
      let files=this.elem.nativeElement.querySelector("#uploadFile").files;
      let formdata =new FormData();
      let file=files[0];
      formdata.append('uploadFile',file,file.name);
      this.employeeService.uploadExcel(formdata).subscribe((data)=>{
        if(data.success){
          this.showSuccess = true;
          this.showError = false;
          this.message = data.message;
        }else{
          this.showSuccess = false;
          this.showError = true;
          this.message = 'Ann error occured whlie uploading the Excel '
            +'file, Please try again later!';
        }
      });
      this.showLoader = false;
    }

    this.showError = true;
    this.showSuccess = false;
    this.message = 'You must select a file!';
  }

  close(){
    console.log('!!');
    this.showSuccess = false;
    this.showError = false;
  }
}
