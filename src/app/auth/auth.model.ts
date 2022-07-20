export interface SignUp{
  email:string;
  password:string;
  returnSecureToken:boolean
}
export interface SignUpInResponse{
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:string;
}
export class User{
  constructor(public id:string, public email:string,private _token:string, private _tokenExpirationDate:Date, ){}
  get token(){
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null;
    }
    return this._token;
  }
}
