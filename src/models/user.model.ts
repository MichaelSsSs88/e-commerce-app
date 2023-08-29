export class User {

  constructor(private _email: string, public id: string, private _token: string, private _tokenExpirationDate:Date) {

  }

  getToken():string {
    if(!this._tokenExpirationDate||this._tokenExpirationDate<new Date()){
      return '';
    }
    return this._token;
  }
  
}
