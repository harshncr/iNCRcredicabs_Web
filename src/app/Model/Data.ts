import { Injectable } from '@angular/core';

@Injectable()
export class Data {
    public onrshp;
    public cab_no;
    public model;
    public fuel=0;
    public type=0;
    public occupancy = 0;
    public cab_rate;
    public Rcert;
    public Pcert;
    public Fcert;
    public icert;
    public tax_haryana_certi="";
    public tax_delhi_certi="";
    public tax_up_certi="";
    public entry_tax_haryana_exp_date="";
    public entry_tax_delhi_exp_date="";
    public entry_tax_up_exp_date=""; 
    public Mdate ;
    public Pdate;
    public Fdate;
    public idate;

    public constructor() { }

}