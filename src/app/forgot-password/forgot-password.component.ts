import { Component, OnInit } from '@angular/core';
import { UserCredService } from '../Services/user-cred.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent implements OnInit {
  qlid:string;
  showReqStatus = false;
  responseJSON;

  constructor(
    private userCredService: UserCredService,
    private router: Router
  ) { }

  ngOnInit() {}

  onSubmit(){
    this.userCredService.forgotpassword(this.qlid).subscribe((data) => {
      if(data !== undefined && data !== null){
        this.showReqStatus = true;
        this.responseJSON = data;
        console.log(data);
      }
    });
  }
}