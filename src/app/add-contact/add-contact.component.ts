import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  
  constructor(private router: Router) { }

  onCancel()
  {
    this.router.navigateByUrl('/contacts');
  }
  onSave()
  {
    this.router.navigateByUrl('/contacts');
  }
  ngOnInit() {
  }

}
