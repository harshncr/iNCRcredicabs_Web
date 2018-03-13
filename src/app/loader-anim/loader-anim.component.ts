import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-anim',
  templateUrl: './loader-anim.component.html',
  styleUrls: ['./loader-anim.component.css']
})
export class LoaderAnimComponent implements OnInit {
  @Input() showLoader: boolean;
  @Input() loaderText: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.loaderText);
  }
}
