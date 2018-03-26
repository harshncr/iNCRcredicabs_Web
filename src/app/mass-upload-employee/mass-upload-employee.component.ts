import { Component, OnInit } from '@angular/core';
import { RosterService } from '../Services/roster.service';
import { ElementRef, ViewChild,Input} from '@angular/core';
import { Router }                   from '@angular/router';
import { EmployeeService } from '../Services/employee.service';

declare var jquery:any;
declare var $ :any;

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
  resp;
  employeeList;
  showEmpList = false;
  empShowQuickDetails;

  constructor(
    private emp_service:EmployeeService,
    private elem:ElementRef,
    private router:Router
  ) { }

  ngOnInit() {}
  
  upload(){
    this.showEmpList = false;
    this.showLoader = true;
    this.showSuccess = false;
    this.showError = false;
    //this.upload_spinner=true;
    let files=this.elem.nativeElement.querySelector("#uploadFile").files;
    let formdata = new FormData();
    let file=files[0];
    formdata.append('uploadFile', file, file.name);
    
    this.empShowQuickDetails = [];
    this.emp_service.sendfile(formdata).subscribe((data)=>{
      if(data.success){
        console.log('Successfull');
        this.resp = data;
        this.showSuccess = true;
        this.showEmpList = true;
        this.showError = false;
        this.message = data.message;
        this.employeeList = data.successfullUpload;

        console.log(this.employeeList);
      }else{
        this.resp = data;
        this.showError = true;
        this.showEmpList = true;
        this.employeeList = data.successfullUpload;
        this.message = 'Mass upload executed with errors!';
      }
      
      for(var i=0; i<this.employeeList.length; ++i){
        this.empShowQuickDetails.push(false);
      }
      console.log(data);
      this.showLoader = false;
    });
  }

  close(){
    console.log('!!');
    this.showSuccess = false;
    this.showError = false;
    this.showEmpList = false;

  }

  viewDetails(emp,selectedIndex){
    this.router.navigate(['employee/view/details/'+emp.empQlid]);
  }

  showQuickDetails(index){
    this.empShowQuickDetails[index] = true;
    $('#qd-'+index).slideDown();
    $('.tooltip-text').css('display', 'none');
  }

  onToolTipMouseEnter(tgt){
    $('.tooltip-text').fadeOut('slow');
  }

  hideQuickDetails(index){
    this.empShowQuickDetails[index] = false;
    $('#qd-'+index).slideToggle();
    $('.tooltip-text').css('display', 'none');
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
}
