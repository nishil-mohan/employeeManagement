import { Component, ElementRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { EmployeeService } from '../core/service/employee.service';
import { Employee } from '../core/model/employee';


/**
 * @title Table with filtering
 */
@Component({
  selector: 'd-table',
  styleUrls: ['employeelist.scss'],
  templateUrl: 'employeelist.html',
})

export class EmployeeListComponent {

  @Input()
  gridView:boolean;

  constructor(
    private employeeService: EmployeeService) { }

  @Output()
  editDialog: EventEmitter<Employee> = new EventEmitter<Employee>();

  @Output()
  viewDialog: EventEmitter<Employee> = new EventEmitter<Employee>();

  displayedColumns = ['actions', 'employeeId', 'name', 'Designation', 'Department','email'];
  dataSource: EmployeeDataSource;

  

  ngOnInit() {
    this.dataSource = new EmployeeDataSource(this.employeeService);
  }

  onEditDisplay(employee): void {
    this.editDialog.emit(employee);
  }

  onViewDisplay(employee): void {
    this.viewDialog.emit(employee);
  }

  deleteEmployee(employee): void {
    this.employeeService.deleteEmployee(employee);
  }

  getEmployeeFeed(){
    return this.employeeService.employeeRecords;
  }
}


/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, EmployeeDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class EmployeeDataSource extends DataSource<any> {

  constructor(private empService: EmployeeService) {

    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Employee[]> {
    return this.empService.employeeRecords;
  }

  disconnect() { }
}