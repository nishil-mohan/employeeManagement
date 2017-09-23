import { Component, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Employee } from '../../core/model/employee';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeService } from '../../core/service/employee.service';
import { EmployeeOperation } from '../../core/model/employeeOperation';
import { FileUtil } from './file.util';

/**
 * @title Dialog
 */
@Component({
    selector: 'file-upload',
    templateUrl: 'fileUploadDialog.html',
    styleUrls: ['./fileUploadDialog.scss']
})
export class FileUploadDialog implements OnInit {

    @ViewChild('fileImportInput')
    fileImportInput: any;
  
    csvRecords = [];

    empForm: FormGroup;
    constructor(
        public dialogRef: MdDialogRef<FileUploadDialog>,
        public employeeService: EmployeeService,
        private _fileUtil: FileUtil) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
   

    ngOnInit() { }
    
      // METHOD CALLED WHEN CSV FILE IS IMPORTED
      fileChangeListener($event): void {
    
        var text = [];
        var files = $event.srcElement.files;
    
        if (this._fileUtil.isCSVFile(files[0])) {
          var input = $event.target;
          var reader = new FileReader();
          reader.readAsText(input.files[0]);
    
          reader.onload = (data) => {
            let csvData = reader.result;
            let csvRecordsArray = csvData.split(/\r\n|\n/);
    
            let headersRow = this._fileUtil
                .getHeaderArray(csvRecordsArray);
            
            this.csvRecords = this._fileUtil
                .getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
            let employees:Employee[]=new Array;
            this.csvRecords.forEach(csvRecord=>{
                csvRecord.forEach(record=>{
                    let employeeLoad:Employee=new Employee();
                    let split=record.split(',');
                    if(split[1]!=null && this.trimQuotes(split[1].trim())!='')
                    employeeLoad.name=this.trimQuotes(split[1]);
                    employeeLoad.designation=this.trimQuotes(split[2]);
                    employeeLoad.email=this.trimQuotes(split[3]);
                    employeeLoad.department=this.trimQuotes(split[4]);
                     employees.push(employeeLoad);
                });
               
            });
            this.employeeService.addEmployees(employees);
            this.employeeService.getEmployees();
            this.dialogRef.close();
          }
    
          reader.onerror = function () {
            alert('Unable to read ' + input.files[0]);
          };
    
        } else {
          alert("Please import valid .csv file.");
           
        }
      };
    
      trimQuotes(str){
          if(str!=null){
              return str.replace(/['"]+/g, '');
          }
      }
       
    
      
}

