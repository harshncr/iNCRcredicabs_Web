export class Vendor{
    constructor(
		public id?:string,
        public name?: string,
        public bussType?: string,
		public venContact?: string,
		public venEmail?:string,
        public website?: string,
		public pan?: string,
	    public gstnum?: string,
	    public bussAddr?: string,
		public supervisorName?: string, 	
		public supContact?: string,
		public supEmail?: string,
		
		//publi cOoCabs=0;
		public cabs_provided?:number,
		public manName?: string,
		public manContact?: string,
	    public manager_mail_id?: string,
		public ownerName?: string,
		public ownerContact?:string,
		public ownerEmail?:string,
		public vendor_status?:number,
		public agreementExpiry?:string,
    ){}
}