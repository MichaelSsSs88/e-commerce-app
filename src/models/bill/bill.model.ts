import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerModel } from '../customer/customer.model';
import { BillLineModel } from '../bill-line/bill-line.model';
import { PaymentModel } from '../payment/payment.model';


export class BillModel {



  constructor(private _identificator: number,private _customer: CustomerModel, private _billLines: BillLineModel[], private _dolarPrice: number, private _total: number, private _payments: PaymentModel[], private _date: Date) {

  }

  public get identificator(): number {
    return this._identificator;
  }
  public set identificator(value: number) {
    this._identificator = value;
  }
  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
  public get total(): number {
    return this._total;
  }
  public set total(value: number) {
    this._total = value;
  }
  public get dolarPrice(): number {
    return this._dolarPrice;
  }
  public set dolarPrice(value: number) {
    this._dolarPrice = value;
  }
  public get billLines(): BillLineModel[] {
    return this._billLines;
  }
  public set billLines(value: BillLineModel[]) {
    this._billLines = value;
  }
  public get customer(): CustomerModel {
    return this._customer;
  }
  public set customer(value: CustomerModel) {
    this._customer = value;
  }

  public get payments(): PaymentModel[] {
    return this._payments;
  }
  public set payments(value: PaymentModel[]) {
    this._payments = value;
  }

}
