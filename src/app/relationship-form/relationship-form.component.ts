import { Component, OnInit } from '@angular/core';
import { RelationService } from '../relation.service';


@Component({
  selector: 'app-relationship-form',
  templateUrl: './relationship-form.component.html',
  styleUrls: ['./relationship-form.component.css']
})
export class RelationshipFormComponent implements OnInit {

  public relations=[];
  loadd= "true";
  navLocation = "/Relationship";
  module = "vendor";

  constructor(private _relationService: RelationService) { }

  ngOnInit() {
     this._relationService.getRelations().subscribe(resp=>{
     this.relations = resp.result;
     console.log(this.relations);
      //this.initShowDetails(this.relations);
          });
      
  }

}
