import { Component, Inject, OnInit, Output } from '@angular/core';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Employee } from '../../core/model/employee';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { EmployeeService } from '../../core/service/employee.service';
import { EmployeeOperation } from '../../core/model/employeeOperation';

/**
 * @title Dialog
 */
@Component({
    selector: 'dialog-emp',
    templateUrl: 'empDialog.html',
    styleUrls: ['./empDialog.scss']
})
export class EmployeeDialog implements OnInit {

    

    empForm: FormGroup;
    constructor(
        public dialogRef: MdDialogRef<EmployeeDialog>,
        public employeeService: EmployeeService,
        @Inject(MD_DIALOG_DATA) public employeeOp: EmployeeOperation, 
        private fb: FormBuilder) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
    action:string;

    ngOnInit() {
        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        if(this.employeeOp==null){
            this.employeeOp=new EmployeeOperation();
            this.employeeOp.employee=new Employee();
            this.employeeOp.operation='N';
        }
        this.action=this.employeeOp.operation;
        this.empForm = this.fb.group({
            
            name: [this.employeeOp.employee.name,Validators.required],
            department: this.employeeOp.employee.department,
            designation:this.employeeOp.employee.designation,
            email:[this.employeeOp.employee.email,[Validators.required, Validators.pattern(emailRegex)]] ,
            id:this.employeeOp.employee.id
        });
    }

    onSubmit(empForm): void {
        let employeeAdded=new Employee();
        employeeAdded.name=empForm._value.name;
        employeeAdded.designation=empForm._value.designation;
        employeeAdded.department=empForm._value.department;
        employeeAdded.email=empForm._value.email;
        employeeAdded.id=empForm._value.id;
        //employeeAdded.email=empForm._value.name;
        if(empForm._value.id==null){
            this.employeeService.addEmployee(employeeAdded);
        }else{
            this.employeeService.updateEmployee(employeeAdded);
        }
        
        this.dialogRef.close();
    }
}

