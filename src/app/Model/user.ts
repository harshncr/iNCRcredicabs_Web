export class User {
    constructor(
        public qlid: string,
        public password: string,
        public grecaptchaResponse: string,
        public fname?: string,
        public lname?: string,
        public mname?: string
    ){}
}
