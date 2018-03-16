import { NgModule }                               from '@angular/core';
import { RouterModule, Routes }                   from '@angular/router';
import { DashboardComponent }                     from './dashboard/dashboard.component';
import { ViewEmployeeDetailsComponent }           from './view-employee-details/view-employee-details.component';
import { ViewEmployeeComponent }                  from './view-employee/view-employee.component';
import { DashComponent }                          from './dash/dash.component';
import { EmployeeComponent }                      from './employee/employee.component';
import { AddEmployeeComponent }                   from './add-employee/add-employee.component';
import { LoginComponent }                         from './login/login.component';
import { LogoutComponent }                        from './logout/logout.component';
import { NoSessionComponent }                     from './no-session/no-session.component';
import { EditEmployeeComponent }                  from './edit-employee/edit-employee.component';
import { UnscheduledRequestComponent }            from  './unscheduled-request/unscheduled-request.component';
import { ReportComponent }                        from './report/report.component';
import { NewAccSetupComponent }                   from './new-acc-setup/new-acc-setup.component';
import { ForgotPasswordComponent }                from './forgot-password/forgot-password.component';
import { SetPasswordEmployeeComponent }           from './set-password-employee/set-password-employee.component';
import { ForgotPasswordChangeEmployeeComponent }  from './forgot-password-change-employee/forgot-password-change-employee.component';
import { ShowRouteComponent }                     from './show-route/show-route.component';
import { RosterViewComponent }                    from './roster-view/roster-view.component';
import { AddempComponent }                        from './addemp/addemp.component';
import { RosterEmpDetailComponent }               from './roster-emp-detail/roster-emp-detail.component';
import { AddRouteComponent }                      from './add-route/add-route.component';
import { EmployeditComponent }                    from './employedit/employedit.component';
import { EditRouteComponent }                     from './edit-route/edit-route.component';
import { VendorListComponent }                    from './vendor-list/vendor-list.component';
import { ViewVendorComponent }                    from './view-vendor/view-vendor.component';
import { AddVendorComponent }                     from './add-vendor/add-vendor.component';
import { UpdateVendorComponent }                  from './update-vendor/update-vendor.component';
import { CabListComponent }                       from './cab-list/cab-list.component';
import { ViewCabComponent }                       from './view-cab/view-cab.component';
import { DriverListComponent }                    from './driver-list/driver-list.component';
import { ViewDriverComponent }                    from './view-driver/view-driver.component';
import { CabUpdateComponent }                     from './cab-update/cab-update.component';
import { AddDriverComponent }                     from './add-driver/add-driver.component';
import { AddCabComponent }                        from './add-cab/add-cab.component';
import { DriverUpdateComponent }                  from './driver-update/driver-update.component';
import { MassUploadEmployeeComponent }            from './mass-upload-employee/mass-upload-employee.component';
import { RelationshipFormComponent }              from  './relationship-form/relationship-form.component';
import { EmployeeDashComponent }                  from './employee-dash/employee-dash.component';
import { EmployeeReqUnschComponent }              from './employee-req-unsch/employee-req-unsch.component';

const routes: Routes = [
  { path: '', redirectTo: '/login',   pathMatch: 'full' },
  { path: 'login',                    component: LoginComponent},
  { path: 'new-acc-setup',            component: NewAccSetupComponent},
  {
    path:       'new-acc-setup/set-password/:qlid/:token',
    component:  SetPasswordEmployeeComponent
  },
  {
    path:       'forgot-password/set-password/:qlid/:token',
    component:  ForgotPasswordChangeEmployeeComponent
  },
  {
    path:       'employee/view/details/:qlid',
    component:  ViewEmployeeDetailsComponent
  },
  {
    path: 'employee/edit/:qlid',
    component: EditEmployeeComponent
  },
  { path: 'dash',                     component: DashComponent },
  { path: 'employee-dash',            component: EmployeeDashComponent },
  {
    path:       'employee-dash/unscheduled-cab-request',
    component:  EmployeeReqUnschComponent
  },
  { path: 'forgot-password',          component: ForgotPasswordComponent },
  { path: 'employee/view',            component: ViewEmployeeComponent },
  { path: 'employee',                 component: EmployeeComponent },
  { path: 'employee/add',             component: AddEmployeeComponent },
  { path: 'employee/mass-upload',     component: MassUploadEmployeeComponent },
  { path: 'employee/edit',            component: EditEmployeeComponent },
  { path: 'logout',                   component: LogoutComponent },
  { path: 'unscheduledRequest',       component: UnscheduledRequestComponent },
  { path: 'no-session',               component: NoSessionComponent },
  { path: 'report',                   component: ReportComponent },
  { path: 'roster/view',              component: RosterViewComponent },
  { path: 'roster/addEmp',            component: AddempComponent },
  { path: 'roster/go',                component: ShowRouteComponent },
  { path: 'roster/chl',               component: RosterEmpDetailComponent },
  { path: 'roster/addRoute',          component: AddRouteComponent },
  { path: 'roster/editemp',           component: EmployeditComponent },
  { path: 'roster/editroute',         component: EditRouteComponent },
  { path: 'vendor-list',              component: VendorListComponent },
  { path: 'view-vendor',              component: ViewVendorComponent },
  { path: 'add-vendor',               component: AddVendorComponent },
  { path: 'update-vendor',            component: UpdateVendorComponent },
  { path: 'cab-list',                 component: CabListComponent },
  { path: 'view-cab',                 component: ViewCabComponent },
  { path: 'driver-list',              component: DriverListComponent },
  { path: 'view-driver',              component: ViewDriverComponent },
  { path: 'cab-update',               component: CabUpdateComponent },
  { path: 'add-driver',               component: AddDriverComponent },
  { path: 'add-cab',                  component: AddCabComponent },
  { path: 'driver-list',              component: DriverListComponent },
  { path: 'driver-update',            component: DriverUpdateComponent },
  { path: 'relationship',            component:RelationshipFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
