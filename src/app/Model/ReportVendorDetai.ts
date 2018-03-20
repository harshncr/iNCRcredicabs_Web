
export class ReportVendorDetail{
    constructor(
        public VendorName?: string,
        public EmployeeName?: string,
        public DateAndTime?: string,
        public CabType?: string,
        public TripTypr?: string,
        public Source?: string,
        public Destination?: string,
        public Zone?: string,
        public Cost?: string
    ) {}
}