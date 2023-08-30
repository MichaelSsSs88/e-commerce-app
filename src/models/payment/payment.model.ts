export class PaymentModel {

  
  constructor(private _description: string, private _amount: number, private _date: Date){
  }

  public get date(): Date {
    return this._date;
  }
  public set date(value: Date) {
    this._date = value;
  }
  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }
  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }

}
