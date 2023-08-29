

export class CustomerModel {


  constructor(private _identification: string, private _name: string, private _address: string, private _phone: string){

  }

  public get phone(): string {
    return this._phone;
  }
  public set phone(value: string) {
    this._phone = value;
  }
  public get address(): string {
    return this._address;
  }
  public set address(value: string) {
    this._address = value;
  }
  public get identification(): string {
    return this._identification;
  }
  public set identification(value: string) {
    this._identification = value;
  }
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }

}
