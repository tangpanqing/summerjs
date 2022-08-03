export default class RouteItem{
    method: string;
    path: string;
    call: Function;

    constructor(method:string, path:string, call:Function) {
        this.method = method;
        this.path = path;
        this.call = call;
    }
}
