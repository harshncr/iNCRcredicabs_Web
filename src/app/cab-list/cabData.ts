import {Injectable} from '@angular/core'
@Injectable()
export class CabData{
    public selectedItem;
    public driverType;
    public cabId;
    public venId;
    public setCabId(item){
        this.cabId=item;
    }
    public getCabId(){
        return this.cabId;
    }
    public setVenId(item){
        this.venId=item;
    }
    public getVenId(){
        return this.venId;
    }
    public setType(item)
    {
        this.driverType=item;
    }
    public getType()
    {
        return this.driverType;
    }
    public setItem(item){
        this.selectedItem = item;
    }
    public getItem(){
        return this.selectedItem;   
    }
}