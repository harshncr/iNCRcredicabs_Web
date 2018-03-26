//reportemp.ts
export class ReportEmp {
    constructor(
        public MgrQlid?: string,
        public ShiftID?: string,
        public RequestID?: string,
        public EmpQlid?: string,
        public StartDateTime?: string,
        public CabCost?: string,
        public CabNo?: string,
        public EmpFName?: string,
    ) {}
}