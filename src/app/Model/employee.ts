export class Employee {
    constructor(
        public empQlid?: string,
        public empFName?: string,
        public empMName?: string,
        public empLName?: string,
        public empGender?: string,
        public empMobNbr?: string,
        public empHomeNbr?: string,
        public empEmergNbr?: string,
        public empAddLine1?: string,
        public empAddLine2?: string,
        public empZone?: string,
        public empPin?: string,
        public empPickupArea?: string,
        public empBloodGrp?: string,
        public rolesId?: string,
        public empMgrQlid1?: string,
        public empMgrQlid2?: string,
        public empStatus?:string,
        public empCreatedBy?:string,
        public empCreationDate?:string,
        public empLastUpdatedBy?:string,
        public empLastUpdateDate?:string
    ){}
}
