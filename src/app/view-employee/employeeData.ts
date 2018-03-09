import {Injectable} from '@angular/core'
@Injectable()
export class EmployeeData{
    public selectedItem;
    public setItem(item){
        this.selectedItem = item;
    }
    public getItem(){
        return this.selectedItem;
    }
}