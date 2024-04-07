class ServiceConstants {
    private port:String = ":8000";
    private url:String = "http://127.0.0.1"+this.port;

    public login:string = this.url + "/admin/login";
    public addUser:string = this.url + "/admin/addUser";
    public getUsers:string = this.url + "/admin/getUsers";
    public getMeta:string = this.url + "/get/meta";
}

export default ServiceConstants;