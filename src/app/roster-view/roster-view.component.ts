import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core/src/linker/element_ref';
import { RosterService } from '../Services/roster.service';
import {ActivatedRoute,Params} from '@angular/router';
@Component({
  selector: 'app-roster-view',
  templateUrl: './roster-view.component.html',
  styleUrls: ['./roster-view.component.css'],
})
export class RosterViewComponent implements OnInit {

  public upload:boolean=true;
  constructor(private ok:ActivatedRoute) { 

  }

  ngOnInit() {
     console.log(this.ok.snapshot.params['foo']);
  }

}
