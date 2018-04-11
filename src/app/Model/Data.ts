import { Injectable } from '@angular/core';

@Injectable()
export class Data {
    public contract_owned;
    public cab_no;
    public model;
    public fuel=0;
    public type=0;
    public occupancy = 0;
    public cab_rate;
    public reg_certi;
    public poll_certi;
    public fit_certi;
    public insur_certi;

    public tax_haryana_certi="";
    public tax_delhi_certi="";
    public tax_up_certi="";
    public tax_haryana_exp="";
    public tax_delhi_exp="";
    public tax_up_exp=""; 
    public manufacture_date ;
    public poll_exp;
    public fit_exp;
    public insur_exp;

    public constructor() { }

}