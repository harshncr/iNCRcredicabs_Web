import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.css']
})
export class HeaderListComponent implements OnInit {
  loada ;
  loadb;
  loadc; 
  a;
  constructor(private route:Router) {
    if(this.route.url == '/vendor-list'){
      this.loada = true;
      this.loadb = false;
      this.loadc = false;
      this.a=this.route.url;
    }
   }

  ngOnInit() {
  }

}
