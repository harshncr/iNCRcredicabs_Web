import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { VendorService } from '../vendor.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser'
@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
public display;
public showLoading=true;
public message;
public certificate;

constructor(private sanitizer:DomSanitizer,private httpService: VendorService, private ac:ActivatedRoute,private router:Router) { }

ngOnInit() {
    
    this.certificate=this.ac.snapshot.params['certi'];
    if(this.certificate == "" || this.certificate == null || this.certificate == "undefined")
    {
       this.message = "Image Not Found";
    }
    else{
        console.log(this.certificate);
        //let body = {"image": "AP19AK2803_icert.jpg"}
        let body = {"image": this.certificate}
        this.httpService.getimage(body)
        .subscribe((response)=>{
        if(response.status == 200){
          this.display=response._body;
          this.showLoading= false;
        }
       })
      }
  }
  photo(){
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+this.display);
  }

}
