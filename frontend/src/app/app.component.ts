

// Copyright 2016 Google Inc. All Rights Reserved.
// Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license


import { Component, ViewChild, ViewContainerRef, OnInit, ElementRef } from '@angular/core';
import { MdSidenav, MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { EmployeeService } from './core/service/employee.service';
import { Employee } from './core/model/employee';
import { EmployeeDialog } from './employee/dialog/empDialog.component';
import { EmployeeOperation } from './core/model/employeeOperation';
import { Observable } from 'rxjs/Observable';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { FileUploadDialog } from './shared/fileupload/fileUploadDialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isDarkTheme: boolean = true;
  isGridView: boolean = true;
  constructor(public dialog: MdDialog, private employeeService: EmployeeService) {
  }
  @ViewChild('filter') filter: ElementRef;
  ngOnInit() {
    this.employeeService.getEmployees();
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        this.employeeService.getEmployee(this.filter.nativeElement.value);

      });
  }

  openEmployeeDialog(employee, action: string): void {
    let empOp: EmployeeOperation = new EmployeeOperation();
    empOp.employee = employee;
    empOp.operation = action;
    let dialogRef = this.dialog.open(EmployeeDialog, {
      width: '250px',
      data: empOp
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(EmployeeDialog, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });



  }

  exportData() {
    let empToExport: Employee[] = null;
    this.employeeService._employeeRecords.subscribe(res => {
      empToExport = res;
    })
    new Angular2Csv(empToExport, 'Employee Report');
  }

  openFileDialog() {
    let dialogRef = this.dialog.open(FileUploadDialog, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
