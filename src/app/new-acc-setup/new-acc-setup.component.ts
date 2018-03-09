import { Component, OnInit } from '@angular/core';
import { UserCredService } from '../Services/user-cred.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-acc-setup',
  templateUrl: './new-acc-setup.component.html',
  styleUrls: ['./new-acc-setup.component.css']
})
export class NewAccSetupComponent implements OnInit {
  qlid:string;
  showReqStatus = false;
  responseJSON;
  constructor(private userCredService: UserCredService, private router: Router) {}

  ngOnInit() {}

  onSubmit(){
    this.userCredService.accSetupEnterQlid(this.qlid).subscribe((data) => {
      if(data !== undefined && data !== null){
        this.showReqStatus = true;
        this.responseJSON = data;
        console.log(data);
      }
    });
  }
}
