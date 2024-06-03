import { CustomerService } from 'src/services/customer.service';
import { Injectable } from '@angular/core';
import { BillModel } from 'src/models/bill/bill.model';
import { CustomerModel } from 'src/models/customer/customer.model';
import { BillLineModel } from 'src/models/bill-line/bill-line.model';
import { BehaviorSubject } from 'rxjs';
import { PaymentModel } from 'src/models/payment/payment.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private _billsList: BillModel[] = [];
  billServiceListEvent=new BehaviorSubject<BillModel[]|undefined|null>(null);
  billSelectedEvent= new BehaviorSubject<BillModel|undefined|null>(null);
  private billSelected!: BillModel | null;





  private customers: CustomerModel[] = [];


  constructor(private CustomerService: CustomerService, private http: HttpClient) {
    let customer: CustomerModel | undefined = this.CustomerService.getCustomer("1");
    let billLines: BillLineModel[] = [];
    billLines.push(new BillLineModel("shirt", "s", 4, 15, 3, 63, 15));
    billLines.push(new BillLineModel("Pant", "s", 2, 50, 6, 63, 15));
    billLines.push(new BillLineModel("Blouse", "s", 4, 10, 3, 43, 13));
    billLines.push(new BillLineModel("Underwear", "s", 4, 7, 3, 31, 7));
    customer && this._billsList.push(new BillModel(1,customer, billLines, 580, 600,[], new Date()));

    customer = this.CustomerService.getCustomer("2");
    billLines = [];
    billLines.push(new BillLineModel("shirt", "s", 4, 15, 3, 63, 15));
    billLines.push(new BillLineModel("Pant", "s", 2, 50, 6, 63, 15));
    billLines.push(new BillLineModel("Blouse", "s", 4, 10, 3, 43, 13));
    billLines.push(new BillLineModel("Underwear", "s", 4, 7, 3, 31, 7));
    customer && this._billsList.push(new BillModel(2,customer, billLines, 580, 600,[], new Date()));

    customer = this.CustomerService.getCustomer("3");
    billLines = [];
    billLines.push(new BillLineModel("shirt", "s", 4, 15, 3, 63, 15));
    billLines.push(new BillLineModel("Pant", "s", 2, 50, 6, 63, 15));
    billLines.push(new BillLineModel("Blouse", "s", 4, 10, 3, 43, 13));
    billLines.push(new BillLineModel("Underwear", "s", 4, 7, 3, 31, 7));
    customer && this._billsList.push(new BillModel(3,customer, billLines, 580, 600,[], new Date()));

    customer = this.CustomerService.getCustomer("4");
    billLines = [];
    billLines.push(new BillLineModel("shirt", "s", 4, 15, 3, 63, 15));
    billLines.push(new BillLineModel("Pant", "s", 2, 50, 6, 63, 15));
    billLines.push(new BillLineModel("Blouse", "s", 4, 10, 3, 43, 13));
    billLines.push(new BillLineModel("Underwear", "s", 4, 7, 3, 31, 7));
    customer && this._billsList.push(new BillModel(4,customer, billLines, 580, 600, [], new Date()));
  }

  public get billsList(): BillModel[] {
    return this._billsList;
  }
  public get getBillSelected():BillModel | undefined | null {
    return this.billSelected;
  }
  public set setBillSelected(value: BillModel) {
    this.billSelected = value;
    this.billSelectedEvent.next(this.billSelected);
  }

  public addNewBill(billModel:BillModel):void{
      this._billsList.push(billModel);
      this.billServiceListEvent.next(this._billsList);
  }

  public updateBill(billModel:BillModel):void{
    this._billsList=this._billsList.map(bill=>{
      if(bill.identificator==billModel.identificator){
         return billModel;
      }else{
        return bill;
      }
    })
   // this._billsList.push(billModel);
    this.billServiceListEvent.next(this._billsList);
}

  public getCustomer(identificator:number):BillModel|undefined{
   return this._billsList.find(bill => bill.identificator==identificator);
  }

  public getBalance(identificator:number):PaymentModel[]|any{
    return this._billsList.find(bill => bill.identificator==identificator)?.payments.find(payment =>{
      return payment;
    });
  }

  public getBalanceAmount(identificator:number):PaymentModel[]|any{
    let amountPaid=0;
    this._billsList.find(bill => bill.identificator==identificator)?.payments.forEach(payment =>{
        amountPaid+=payment.amount;
    });

    return amountPaid;
  }


  public applyPayment(identificator:number, description:string, amount:number){
    let balance=0;
    this._billsList.find(bill => bill.identificator==identificator)?.billLines.forEach(billLine =>{balance+=billLine.totalCost+billLine.totalEarning});
  }

  public getUsers(){
    this.http.get("http://localhost:8080/api/v1/user/").subscribe((response)=>console.log(response));
  }
}
