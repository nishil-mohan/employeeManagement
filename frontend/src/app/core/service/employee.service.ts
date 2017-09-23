import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { EmployeeBackendService } from './employee.backendservice';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Employee } from '../model/employee';

@Injectable()
export class EmployeeService {

  _employeeRecords: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>(null);

  get employeeRecords(): Observable<Employee[]>{
return new Observable(fn =>this._employeeRecords.subscribe(fn))  }

  constructor(private employeeBackendService: EmployeeBackendService) { }

  getEmployees(){
    this.employeeBackendService.getEmployees().subscribe(
      res =>{
        this._employeeRecords.next(res);
      }
    
    );
  } 

  getEmployee(id){
    let empR=null;
    if(id.trim()==''){
      empR=this.employeeBackendService.getEmployees();
    }else{
      empR=this.employeeBackendService.getEmployee(id);
    }
    empR.subscribe(
      res =>{
        this._employeeRecords.next(res);  
      },
      error => {
        this._employeeRecords.next(null);
      }
    );
  }

  addEmployee(Employee){
    this.employeeBackendService.addEmployee(Employee).subscribe(
      res =>{
        let emps:Employee[]=this._employeeRecords.getValue();
        emps.push(res);
        this._employeeRecords.next(emps);
      }
    );
  }

  addEmployees(employees:Employee[]){
    this.employeeBackendService.addEmployees(employees).subscribe(
      res =>{
        if(res){
          return true;
        }
      },
      error=>{ return true;}
    );
  }

  updateEmployee(Employee){
    this.employeeBackendService.updateEmployee(Employee).subscribe(res =>{
        let emps:Employee[]=this._employeeRecords.getValue();
        let itemIndex = emps.findIndex(item => item.id == Employee.id);
        emps[itemIndex] = Employee;
        this._employeeRecords.next(emps);
      }
    );
  }
  
  deleteEmployee(Employee){
    let suceess:boolean=false;
    this.employeeBackendService.deleteEmployee(Employee.id).subscribe(res =>{
      let emps:Employee[]= this._employeeRecords.getValue().filter(
        emp => emp.id != Employee.id
      );
      this._employeeRecords.next(emps);
      }
    ); 
  }

  }

  
 