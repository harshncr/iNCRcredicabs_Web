import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader-anim-inline',
  templateUrl: './loader-anim-inline.component.html',
  styleUrls: ['./loader-anim-inline.component.css']
})
export class LoaderAnimInlineComponent implements OnInit {
  @Input() showLoader: boolean;
  @Input() loaderText: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.loaderText);
  }
}
