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
 
  constructor(private _http: Http) { }

  getSuperhumans() {
    // return this._http.get("http://localhost/superhuman/api/listSuperhumans.php/")
    return this._http.get("http://localhost/heroandvillain/superhuman/api/listSuperhumans.php/")
    .catch(this._errorHandler);    
  }

  createSuperhuman(superhuman: Superhuman) {
    return this._http.post("http://localhost/heroandvillain/superhuman/api/createSuperhuman.php/", superhuman)
    .catch(this._errorHandler);    
  }

  updateSuperhuman(superhuman: Superhuman) {
    return this._http.post("http://localhost/heroandvillain/superhuman/api/updateSuperhuman.php/", superhuman)
    .catch(this._errorHandler);       
  }  

  deleteSuperhuman(superhuman: Superhuman) {
    return this._http.post("http://localhost/heroandvillain/superhuman/api/deleteSuperhuman.php/", superhuman)
    .catch(this._errorHandler);       
  }  

  public uploadSuperhuman(formData: any) {
    return this._http.post("http://localhost/heroandvillain/superhuman/api/uploadSuperhuman.php", formData)
    .catch(this._errorHandler);    
  }

  private _errorHandler(error: Response) {
    console.error('Error Occured: ' + error);
    return Observable.throw(error || 'Some Error on Server Occured');  
  }

}
