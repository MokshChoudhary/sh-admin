class ServiceConstants {
    private port:String = ":8000";
    private url:String = "http://127.0.0.1"+this.port;

    public login:string = this.url + "/admin/login";
}

export default ServiceConstants;