import { Component, OnInit } from '@angular/core';
import { CabData } from '../cab-list/cabData';
import { CabService } from '../cab.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cab-update',
  templateUrl: './cab-update.component.html',
  styleUrls: ['./cab-update.component.css']
})
export class CabUpdateComponent implements OnInit {
public cab: any;
public message: any;
  constructor(private _cabData:CabData, private _cabService:CabService, private router:Router) { }

  ngOnInit() {
    this.cab=this._cabData.getItem();
    console.log(this.cab);
  }
  upd(f) {
    
    console.log(this.cab);
    this._cabService.updateCab(this.cab)
    .subscribe((response)=>{
        console.log(response);
        if(response.status == 200){
          this.message = response._body;
        }
        this.router.navigate(['cab-list']);
    })

}
}
