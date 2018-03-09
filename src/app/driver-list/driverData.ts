import {Injectable} from '@angular/core'
@Injectable()
export class DriverData{
    public selectedItem;
    public setItem(item){
        this.selectedItem = item;
    }
    public getItem(){
        return this.selectedItem;   
    }
}