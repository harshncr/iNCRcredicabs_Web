import {  OnInit } from '@angular/core';
import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http} from '@angular/http';
import { RosterService } from '../Services/roster.service';
import { ShowRouteComponent } from '../show-route/show-route.component';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
  providers:[RosterService,ShowRouteComponent]
})
export class UploadFormComponent implements OnInit {
  constructor(private _http:RosterService,private elem:ElementRef,private http:ShowRouteComponent) {

  }
  ngOnInit() {
  }

  upload(){
    let files=this.elem.nativeElement.querySelector("#uploadFile").files;
    let formdata =new FormData();
    let file=files[0];
    formdata.append('uploadFile',file,file.name);
    this._http.sendfile(formdata).subscribe( 
      () =>alert("File Uploaded Successfully."),
    );
  this.http.gettingPostData();
  }

}
