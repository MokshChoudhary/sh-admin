class ServiceConstants {
    private port:String = ":8000";
    private url:String = "http://127.0.0.1"+this.port;

    public login:string = this.url + "/admin/login";
    public addUser:string = this.url + "/admin/addUser";
    public addSubject:string = this.url + "/admin/addSubject";
    public addClass:string = this.url + "/admin/addClass";
    public addUserSubject:string = this.url + "/admin/addUserSubject";
    public addClassSubject:string = this.url + "/admin/addClassSubject";
    public addUserClass:string = this.url + "/admin/addUserClass";
    public getUsers:string = this.url + "/admin/getUsers";
    public getSubjects:string = this.url + "/admin/getSubjects";
    public getClasses:string = this.url + "/admin/getClasses";
    public getUserSubject:string = this.url + "/admin/getUserSubject";
    public getClassSubject:string = this.url + "/admin/getClassSubject";
    public getUserClass:string = this.url + "/admin/getUserClass";
    public getMeta:string = this.url + "/get/meta";
}

export default ServiceConstants;