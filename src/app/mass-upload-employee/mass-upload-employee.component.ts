import { Component, OnInit } from '@angular/core';
import { RosterService } from '../Services/roster.service';
import { ElementRef, ViewChild,Input} from '@angular/core';
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

  constructor(private emp_service:EmployeeService,private elem:ElementRef) { }

  ngOnInit() {
  }
  upload(){
    this.showLoader = true;
    //this.upload_spinner=true;
    let files=this.elem.nativeElement.querySelector("#uploadFile").files;
    let formdata = new FormData();
    let file=files[0];
    formdata.append('uploadFile', file, file.name);
    this.emp_service.sendfile(formdata).subscribe((data)=>{
      if(data.success){
        console.log('Successfull');
        this.showSuccess = true;
        this.showError = false;
        // this.showLoading = f
        this.message = data.message;
      }else{
        this.showError = true;
        this.message = 'An error was encountered while uploading. Please try again later....';
      }
      console.log(data);

      this.showLoader = false;
    });
  }

  close(){
    console.log('!!');
    this.showSuccess = false;
    this.showError = false;
  }
}
