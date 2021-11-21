import { Injectable } from '@angular/core';
import { Superhuman } from './superhuman';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Dbconnect } from '../dbconnect'

@Injectable()
export class SuperhumanService {

  superhumans: Array<Superhuman> = [];
  // connectDB: Array<Mysqlserver> = [];

  dbconnect = new Dbconnect();

  constructor(private _http: Http) { }

  getSuperhumans(formData: any) {
    console.log("getSuperhumans:");
    console.log(formData);
    // return this._http.get("http://localhost/superhuman/api/listSuperhumans.php/")
    return this._http.get("https://herovillain.000webhostapp.com/herovillain/api/listSuperhumans.php", formData)
    .catch(this._errorHandler);    
  }

  // createSuperhuman(superhuman: Superhuman, formData: any) {
    createSuperhuman(param: any) {
    console.log("createSuperhuman:");
    console.log(param.superhuman);
    console.log(param.dbconnect);
    return this._http.post("https://herovillain.000webhostapp.com/herovillain/api/createSuperhuman.php/", param)
    .catch(this._errorHandler);    
  }

  updateSuperhuman(superhuman: Superhuman, formData: any) {
    console.log("updateSuperhuman:");
    console.log(formData);
    return this._http.post("https://herovillain.000webhostapp.com/herovillain/api/updateSuperhuman.php/", superhuman, formData)
    .catch(this._errorHandler);       
  }  

  deleteSuperhuman(superhuman: Superhuman, formData: any) {
    console.log("deleteSuperhuman:");
    console.log(formData);    
    return this._http.post("https://herovillain.000webhostapp.com/herovillain/api/deleteSuperhuman.php/", superhuman, formData)
    .catch(this._errorHandler);       
  }  

  public uploadSuperhuman(formData: any) {
    return this._http.post("https://herovillain.000webhostapp.com/herovillain/api/uploadSuperhuman.php", formData)
    .catch(this._errorHandler);    
  }

  private _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');  
  }

}
