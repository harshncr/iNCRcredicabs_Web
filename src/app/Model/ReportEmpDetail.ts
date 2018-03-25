
export class ReportEmpDetail{
    constructor(
        public EmployeeName?: string,
        public DateAndTime?: string,
        public VendorName?: string,
        public CabType?: string,
        public TripType?: string,
        public Source?: string,
        public Destination?: string,
        public Zone?: string,
        public Cost?: string
    ) {}
}