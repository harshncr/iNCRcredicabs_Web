import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
//import { TodolistComponent } from './todolist/todolist.component';
//import { AddtodoComponent } from './addtodo/addtodo.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule } from '@angular/http';
// import { StoreModule } from '@ngrx/store';
// import { todoreducer } from '../app/Reducers/todoreducer';
// import { TodoActions } from '../app/Actions/TodoActions';
// import { TodoService } from '../app/Services/todo.service';
import { LoginService } from '../app/Services/login.service';
import { ApiService } from '../app/Services/api.service';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeData } from './view-employee/employeeData';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewEmployeeDetailsComponent } from './view-employee-details/view-employee-details.component';
import { DashComponent } from './dash/dash.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { RosterViewComponent } from './roster-view/roster-view.component';
import { ShowRouteComponent } from './show-route/show-route.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { RosterService } from './Services/roster.service';
import { AddempComponent } from './addemp/addemp.component';
import { RosterEmpDetailComponent } from './roster-emp-detail/roster-emp-detail.component';
import { UnscheduledFormComponent } from './unscheduled-form/unscheduled-form.component';
import { ScheduledFormComponent } from './scheduled-form/scheduled-form.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { EmployeditComponent } from './employedit/employedit.component';
import { EditRouteComponent } from './edit-route/edit-route.component';
import { EmployeeService } from './Services/employee.service';
import { LogoutComponent } from './logout/logout.component';
import { NoSessionComponent } from './no-session/no-session.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { Employee } from './Model/employee';
import { UnscheduledRequestComponent } from './unscheduled-request/unscheduled-request.component';
import { NewAccSetupComponent } from './new-acc-setup/new-acc-setup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UserCredService } from './Services/user-cred.service';
import { UnscheduledRequestService } from './Services/unscheduled-request.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReportComponent } from './report/report.component';
import { HeaderReportlistComponent } from './header-reportlist/header-reportlist.component';
import { SetPasswordEmployeeComponent } from './set-password-employee/set-password-employee.component';
import { ForgotPasswordChangeEmployeeComponent } from './forgot-password-change-employee/forgot-password-change-employee.component';
import { ReportService } from './Services/reportservice';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { ViewVendorComponent } from './view-vendor/view-vendor.component';
import { AddVendorComponent } from './add-vendor/add-vendor.component';
import { VendorData } from './vendor-list/vendorData';
import { VendorService } from './vendor.service';
import { HeaderListComponent } from './header-list/header-list.component';
import { UpdateVendorComponent } from './update-vendor/update-vendor.component';
import { DatePipe } from '@angular/common';
// import { ViewCabComponent } from './view-cab/view-cab.component';
// import { CabListComponent } from './cab-list/cab-list.component';
// import { CabData } from './view-cab/cabData';
// import { CabService } from './cab.service'
import { CabListComponent } from './cab-list/cab-list.component';
import { ViewCabComponent } from './view-cab/view-cab.component';
import { DriverListComponent } from './driver-list/driver-list.component';
import { ViewDriverComponent } from './view-driver/view-driver.component';
import { CabData } from './cab-list/cabData';
import { CabService } from './cab.service';
import { CabUpdateComponent } from './cab-update/cab-update.component';
import { AddCabComponent } from './add-cab/add-cab.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { DriverService } from './driver.service';
import { DriverUpdateComponent } from './driver-update/driver-update.component';
import { DriverData } from './driver-list/driverData';
import { LoaderAnimComponent } from './loader-anim/loader-anim.component';
import { MassUploadEmployeeComponent } from './mass-upload-employee/mass-upload-employee.component';
import { RelationshipFormComponent } from './relationship-form/relationship-form.component';
import { RelationService } from './relation.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    //TodolistComponent,
    //AddtodoComponent,
    FooterComponent,
    LoginComponent,
    DashboardComponent,
    ViewEmployeeComponent,
    ViewEmployeeDetailsComponent,
    DashComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    LogoutComponent,
    NoSessionComponent,
    EditEmployeeComponent,
    ReportComponent,
    HeaderReportlistComponent,
    UnscheduledRequestComponent,
    NewAccSetupComponent,
    ForgotPasswordComponent,
    SetPasswordEmployeeComponent,
    RosterViewComponent,
    ShowRouteComponent,
    UploadFormComponent,
    AddempComponent,
    RosterEmpDetailComponent,
    UnscheduledFormComponent,
    ScheduledFormComponent,
    AddRouteComponent,
    EmployeditComponent,
    EditRouteComponent,
    ForgotPasswordChangeEmployeeComponent,
    VendorListComponent,
    ViewVendorComponent,
    AddVendorComponent,
    HeaderListComponent,
    UpdateVendorComponent,
    CabListComponent,
    ViewCabComponent,
    DriverListComponent,
    ViewDriverComponent,
    CabUpdateComponent,
    AddCabComponent,
    AddDriverComponent,
    DriverUpdateComponent,
    LoaderAnimComponent,
    MassUploadEmployeeComponent,
    RelationshipFormComponent
    
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    // StoreModule.provideStore({todoreducer}),
    AppRoutingModule
  ],
  providers: [
    // TodoActions,
    // TodoService,
    ApiService,
    LoginService,
    EmployeeData,
    EmployeeService,
    ReportService,
    UnscheduledRequestService,
    UserCredService,
    Location,
    RosterService,
   VendorData,
   VendorService,
   DatePipe,
   CabData,
   CabService,
   DriverService,
   DriverData,
   RelationService,
   UnscheduledRequestComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
