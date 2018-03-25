
export class ReportManagerDetail{
    constructor(
        public Manager_Name?: string,
        public Manager_Id?: string,
        public Employee_Name?: string,
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