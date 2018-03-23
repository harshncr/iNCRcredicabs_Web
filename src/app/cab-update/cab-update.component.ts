import { Component, OnInit, ElementRef } from '@angular/core';
import { CabData } from '../cab-list/cabData';
import { CabService } from '../cab.service';
import { Router } from '@angular/router';
import { Data } from '../Model/Data';

@Component({
  selector: 'app-cab-update',
  templateUrl: './cab-update.component.html',
  styleUrls: ['./cab-update.component.css']
})
export class CabUpdateComponent implements OnInit {
public cab:Data;
module = "vendor";
navLocation = "Update Cab";
public message: any;
entry_tax_haryana = "";
entry_tax_delhi = "";
entry_tax_up = "";
public Rcert = "";
 Rcert1 = new FormData();
 Fcert1 = new FormData();
 Icert1 = new FormData();
 Pcert1 = new FormData();
 entry_tax_haryana_certi1= new FormData();
 entry_tax_delhi_certi1 = new FormData();
 entry_tax_up_certi1 =new FormData(); 

  constructor(private _cabData:CabData, private _cabService:CabService,private elem:ElementRef, private router:Router) { }

  ngOnInit() {
    //this.cab=this._cabData.getItem();
    this.cab = JSON.parse(localStorage.getItem('Cab'));
    console.log(this.cab);
  }
  image1_Rcert()
  {
    console.log("kuch hua");
    let files=this.elem.nativeElement.querySelector("#Rcert").files;
    //this.Rcert1 =new FormData();
    let file=files[0];
    let filename = 'Rcert.' + file.name.split(".")[1];
    this.cab.Rcert = this.cab.cab_no + "_a" + filename;
    this.Rcert1.append('file_upload',file,this.cab.Rcert);

  }
  image2_Pcert()
  {
    console.log("kuch hua");
    let files1=this.elem.nativeElement.querySelector("#Pcert").files;
     // let Pcert =new FormData();
      let file1=files1[0];
      let filename1 = 'Pcert.' + file1.name.split(".")[1];
      this.cab.Pcert = this.cab.cab_no + "_" + filename1;
      this.Pcert1.append('file_upload',file1,this.cab.Pcert);
      
  }
  image3_Fcert()
  {
    console.log("kuch hua");
    let files2=this.elem.nativeElement.querySelector("#Fcert").files;
     this.Fcert1 =new FormData();
      let file2=files2[0];
      let filename2 = 'Fcert.' + file2.name.split(".")[1];
      this.cab.Fcert = this.cab.cab_no + "_" + filename2;
      this.Fcert1.append('file_upload',file2,this.cab.Fcert);

  }
  image4_Icert()
  {
    console.log("kuch hua");
    let files4=this.elem.nativeElement.querySelector("#icert").files;
    this.Icert1 =new FormData();
    let file4=files4[0];
    let filename4 = 'icert.' + file4.name.split(".")[1];
    this.cab.icert = this.cab.cab_no + "_" + filename4;
    this.Icert1.append('file_upload',file4,this.cab.icert);
  }
  image5_Entry_Haryana()
  {
    console.log("kuch hua");
    let files5=this.elem.nativeElement.querySelector("#entry_tax_haryana_certi").files;
     //this.entry_tax_haryana_certi1 =new FormData();
      let file5=files5[0];
      let filename5 = 'entry_tax_haryana_certi.' + file5.name.split(".")[1];
      this.cab.tax_haryana_certi = this.cab.cab_no + "_" + filename5;
      this.entry_tax_haryana_certi1.append('file_upload',file5,this.cab.tax_haryana_certi);
      

  }
  image6_Entry_Delhi()
  {
    console.log("kuch hua");
    let files6=this.elem.nativeElement.querySelector("#entry_tax_delhi_certi").files;
      //let entry_tax_delhi_certi =new FormData();
      let file6=files6[0];
      let filename6 = 'entry_tax_delhi_certi.' + file6.name.split(".")[1];
      this.cab.tax_delhi_certi = this.cab.cab_no + "_" + filename6;
      this.entry_tax_delhi_certi1.append('file_upload',file6,this.cab.tax_delhi_certi);

  }
  image7_Entry_Up()
  {
    console.log("kuch hua");
    let files7=this.elem.nativeElement.querySelector("#entry_tax_up_certi").files;
    //let entry_tax_up_certi =new FormData();
    let file7=files7[0];
    let filename7 = 'entry_tax_up_certi.' + file7.name.split(".")[1];
    this.cab.tax_up_certi = this.cab.cab_no + "_" + filename7;
    this.entry_tax_up_certi1.append('file_upload',file7,this.cab.tax_up_certi);
    console.log("up "+this.cab.tax_up_certi);

  }



  upd(f) {
    
      
     

     
    console.log(this.cab);
    this._cabService.updateCab(this.cab)
    .subscribe((response)=>{
        console.log(response);
        if(response.result == 'Insert Data success'){
          this.message = response._body;

        
            console.log("inside success!");
          
                  
            let file_upload= [this.Rcert1,this.Pcert1,this.Fcert1,this.Icert1,this.entry_tax_haryana_certi1,this.entry_tax_delhi_certi1,this.entry_tax_up_certi1]
            for (let i=0;i<7;i++)
            {
              this._cabService.sendfile(file_upload[i]).subscribe();
            }
          }
        this.router.navigate(['cab-list']);
          

    })

}
}
