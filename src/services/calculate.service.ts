import { Injectable } from '@angular/core';
import { BillLineModel } from 'src/models/bill-line/bill-line.model';

@Injectable({
  providedIn: 'root'
})
export class CalculateService {
  private _dolarPrice: number = 540;
  private _profitPercent: number = 30;

  constructor() { }

  public calulateTotalCost(quantity:number, lineDelibery:number, linePrice:number ):number{
    return ((linePrice*quantity) + (lineDelibery*quantity))*this._dolarPrice;
  }

  public calulateLineProficient(quantity:number, lineDelibery:number, linePrice:number ):number{
    return this.calulateTotalCost(quantity,lineDelibery,linePrice)*(this._profitPercent/100);
  }

  public calulateConsumerPrice(quantity:number, lineDelibery:number, linePrice:number):number{
    return this.calulateTotalCost(quantity,lineDelibery,linePrice)+this.calulateLineProficient(quantity,lineDelibery,linePrice);
  }

  public calulateTotalBill(billLines: BillLineModel[] ):number{
    let total:number=0;
    billLines.forEach(line => total+ line.totalCost+line.totalEarning);
    return total;
  }



  public get dolarPrice(): number {
    return this._dolarPrice;
  }
  public set dolarPrice(value: number) {
    this._dolarPrice = value;
  }

  public get profitPercent(): number {
    return this._profitPercent;
  }
  public set profitPercent(value: number) {
    this._profitPercent = value;
  }
}
