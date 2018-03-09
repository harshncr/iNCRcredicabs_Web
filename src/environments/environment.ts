// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // url: "http://localhost:7000/api/",
  // loginUrl: "http://localhost:8080/iNCRediCabs/login",
  // logoutUrl: "http://localhost:8080/iNCRediCabs/logout",
  // checkLoginUrl: "http://localhost:8080/iNCRediCabs/check-login-status",
  // addEmployeeUrl: "http://localhost:8080/iNCRediCabs/add-employee",
  // activateEmployeeUrl: "http://localhost:8080/iNCRediCabs/activate-employee",
  // deactivateEmployeeUrl: "http://localhost:8080/iNCRediCabs/deactivate-employee",
  // editEmployeeUrl: "http://localhost:8080/iNCRediCabs/edit-employee",
  // viewEmployeeUrl: "http://localhost:8080/iNCRediCabs/view-employee",
  // getManagerByNameUrl: "http://localhost:8080/iNCRediCabs/get-manager-by-name",
  // getAllManagersUrl: "http://localhost:8080/iNCRediCabs/get-all-managers",
  // getAllRolesUrl: "http://localhost:8080/iNCRediCabs/get-all-roles",
  // newAccSetupQlidUrl: "http://localhost:8080/iNCRediCabs/new-acc-setup",
  // forgotpasswordUrl:  "http://localhost:8080/iNCRediCabs/forgot-password",
  // forgotpassSetPasswordUrl:  "http://localhost:8080/iNCRediCabs/forgot-password/set-password",
  // accSetupSetPasswordUrl: "http://localhost:8080/iNCRediCabs/new-acc-setup/set-password",
  // verifyPwdTokenUrl: "http://localhost:8080/iNCRediCabs/verify-pwd-token",
  
  loginUrl: "http://localhost:8080/NCAB/EmployeeService/login",
  logoutUrl: "http://localhost:8080/NCAB/EmployeeService/logout",
  checkLoginUrl: "http://localhost:8080/NCAB/EmployeeService/check-login-status",
  addEmployeeUrl: "http://localhost:8080/NCAB/EmployeeService/add-employee",
  activateEmployeeUrl: "http://localhost:8080/NCAB/EmployeeService/activate-employee",
  deactivateEmployeeUrl: "http://localhost:8080/NCAB/EmployeeService/deactivate-employee",
  editEmployeeUrl: "http://localhost:8080/NCAB/EmployeeService/edit-employee",
  viewEmployeeUrl: "http://localhost:8080/NCAB/EmployeeService/view-employee",
  getManagerByNameUrl: "http://localhost:8080/NCAB/EmployeeService/get-manager-by-name",
  getAllManagersUrl: "http://localhost:8080/NCAB/EmployeeService/get-all-managers",
  getAllRolesUrl: "http://localhost:8080/NCAB/EmployeeService/get-all-roles",
  newAccSetupQlidUrl: "http://localhost:8080/NCAB/EmployeeService/new-acc-setup",
  forgotpasswordUrl:  "http://localhost:8080/NCAB/EmployeeService/forgot-password",
  forgotpassSetPasswordUrl:  "http://localhost:8080/NCAB/EmployeeService/forgot-password/set-password",
  accSetupSetPasswordUrl: "http://localhost:8080/NCAB/EmployeeService/new-acc-setup/set-password",
  verifyPwdTokenUrl: "http://localhost:8080/NCAB/EmployeeService/verify-pwd-token",
  getrequestUrl: "http://localhost:8080/NCAB/RequestService/getrequest",
  allocateRequest: "http://localhost:8080/NCAB/RequestService/onApproved",
  employeeRequest: "http://localhost:8080/NCAB/ReportService/employeereport",
  managerUrl:"http://localhost:8080/NCAB/ReportService/managerreport",
  vendorUrl:"http://localhost:8080/NCAB/ReportService/vendorreport",
  url: "http://localhost:8080/NCAB"
};