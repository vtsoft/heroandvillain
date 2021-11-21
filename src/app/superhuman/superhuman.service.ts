import { Injectable } from '@angular/core';
import { Http, Response,  URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Superhuman } from './superhuman';
import { Dbonline } from '../dbonline'
import { Dboffline } from '../dboffline'
import { Urlonline } from '../urlonline'
import { Urloffline } from '../urloffline'

@Injectable()
export class SuperhumanService {

    superhumans: Array<Superhuman> = [];
    db = new Dboffline();   
    url = new Urloffline(); 
  
  // Change offline to online when "ng build --prod"
    // onlineDb: Boolean = true;
    onlineDb: Boolean = false;
    
    constructor(private _http: Http) { 
        this.db = this.onlineDb ? new Dbonline() : new Dboffline();     
        this.url = this.onlineDb ? new Urlonline() : new Urloffline();            
    }
  
    getSuperhumans(filterby: any) {
        let url = this.url.list;
    
        let params = new URLSearchParams();
        params.append("fk",filterby);
        let myParams = this.getParams(params);
        return this._http.get(url, { params: myParams })
        .catch(this._errorHandler);    
    }
  
    createSuperhuman(superhuman: Superhuman) {
        let url = this.url.create;
    
        let params = new URLSearchParams();
        let myParams = this.getParams(params);
        return this._http.post(url, superhuman, { params: myParams })
        .catch(this._errorHandler);  
    }
  
    updateSuperhuman(superhuman: Superhuman) {
        let url = this.url.update;
    
        let params = new URLSearchParams();
        let myParams = this.getParams(params);
        return this._http.post(url, superhuman, { params: myParams })
        .catch(this._errorHandler);       
    }  
  
    deleteSuperhuman(superhuman: Superhuman) {
        let url = this.url.remove;
    
        let params = new URLSearchParams();
        let myParams = this.getParams(params);
        return this._http.post(url, superhuman, { params: myParams })
        .catch(this._errorHandler);       
    }  
  
    public uploadSuperhuman(formData: any) {
        let url = this.url.upload;
    
        return this._http.post(url, formData)
        .catch(this._errorHandler);    
    }

    public resizeSuperhuman(formData: any) {
        let url = this.url.resize;
    
        return this._http.post(url, formData)
        .catch(this._errorHandler);    
    }    
  
    getParams(params) {
        params.append("servername",this.db.servername);
        params.append("username",this.db.username);
        params.append("password",this.db.password);
        params.append("dbname",this.db.dbname);
        params.append("tbname",this.db.tbname); 
        params.append("online",this.db.online); 
        return params;       
    }  
  
    private _errorHandler(error: Response) {
        console.error('Error Occured: ' + error);
        return Observable.throw(error || 'Some Error on Server Occured');  
    }
}
