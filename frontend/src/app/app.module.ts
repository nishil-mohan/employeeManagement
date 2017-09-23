

// Copyright 2016 Google Inc. All Rights Reserved.
// Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license
                    

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { EmployeeService } from './core/service/employee.service';

import {MdTableModule} from '@angular/material'; 
import { MaterialModule} from '@angular/material';
import {MdToolbarModule} from '@angular/material';
import {MdIconModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MdGridListModule, MdDialogModule, MdInputModule } from '@angular/material';

import 'hammerjs';
import { EmployeeBackendService } from './core/service/employee.backendservice';
import { EmployeeDialog } from './employee/dialog/empDialog.component';
import { FileUploadDialog } from './shared/fileupload/fileUploadDialog.component';
import { FileUtil } from './shared/fileupload/file.util';
import { EmployeeListComponent } from './employee/employeelist.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeDialog,FileUploadDialog
  ],
  entryComponents: [
    AppComponent,EmployeeListComponent ,EmployeeDialog,FileUploadDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,MdDialogModule,
    MdTableModule,
    FlexLayoutModule,
    MdToolbarModule,
    MdIconModule,
    MdInputModule,
    MdGridListModule
    
  ],
  providers: [
    EmployeeService,EmployeeBackendService,FileUtil
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



// Copyright 2016 Google Inc. All Rights Reserved.
// Use of this source code is governed by an MIT-style license that can be found in the LICENSE file at https://angular.io/license
            
