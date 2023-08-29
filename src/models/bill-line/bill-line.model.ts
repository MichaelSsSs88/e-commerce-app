export class BillLineModel{
  constructor(private _product: string, private _size: string, private _quantity: number, private _price: number, private _deliverCost: number, private _totalCost: number, private _totalEarning: number){

  }
  public get product(): string {
    return this._product;
  }
  public set product(value: string) {
    this._product = value;
  }

  public get size(): string {
    return this._size;
  }
  public set size(value: string) {
    this._size = value;
  }
  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(value: number) {
    this._quantity = value;
  }

  public get totalEarning(): number {
    return this._totalEarning;
  }
  public set totalEarning(value: number) {
    this._totalEarning = value;
  }
  public get totalCost(): number {
    return this._totalCost;
  }
  public set totalCost(value: number) {
    this._totalCost = value;
  }
  public get deliverCost(): number {
    return this._deliverCost;
  }
  public set deliverCost(value: number) {
    this._deliverCost = value;
  }
  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }

}
