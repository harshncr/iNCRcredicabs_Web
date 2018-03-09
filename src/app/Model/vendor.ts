export class Vendor{
    constructor(
		public vendor_id?:string,
        public vendor_name?: string,
        public business_type?: string,
		public vendor_contact_num?: number,
		public vendor_mail_id?:string,
        public website?: string,
		public pan_id?: string,
	    public gst_num?: string,
	    public business_address?: string,
		public supervisor_name?: string, 	
		public sup_contact_num?: string,
		public sup_mail_id?: number,
		public active_cabs?: number,
		//publi cOoCabs=0;
		public manager_name?: string,
		public manager_contact_num?: number,
	    public manager_mail_id?: string,
		public owner_name?: string,
		public owner_contact_num?:string,
		public owner_mail_id?:string,
		public vendor_status?:number,
		public agreement_expiry_date?:string,
    ){}
}