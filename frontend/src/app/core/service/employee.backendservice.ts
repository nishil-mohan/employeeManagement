import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions, RequestOptionsArgs } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { Employee } from '../model/employee';

@Injectable()
export class EmployeeBackendService {

  private url: string = "/employee";
  private headers = new Headers({'Content-Type': 'application/json'});
  constructor(private http: Http) { }

  getEmployees(){
    return this.http.get(this.url+"/list")
      .map(res => res.json());
  }

  getEmployee(id){
    return this.http.get(this.url+"/show/"+id)
      .map(res => res.json());
  }

  addEmployee(Employee){
    let headers = new Headers({ 'Content-Type': 'application/json' });
     
    return this.http.post(this.url+"/add", JSON.stringify(Employee),
    {headers: this.headers})
      .map(res => res.json());
  }

  addEmployees(employees:Employee[]){
    let headers = new Headers({ 'Content-Type': 'application/json' });
     
    return this.http.post(this.url+"/upload", JSON.stringify(employees),
    {headers: this.headers})
      .map(res => res.json(),error =>null);
  }

  updateEmployee(Employee){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/update/" + Employee.id, JSON.stringify(Employee),{headers: this.headers})
      .map(res => res.json());
  }

  deleteEmployee(id){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.url + "/delete/" + id,'',{headers: this.headers})
      .map(res => res.json());
  }

  private getEmployeeUrl(id){
    return this.url + "/" + id;
  }
}