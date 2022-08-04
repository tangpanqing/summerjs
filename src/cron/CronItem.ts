export default class RouteItem{
    period: string;
    param: any;
    call: Function;

    constructor(period:string, param:any, call:Function) {
        this.period = period;
        this.param = param;
        this.call = call;
    }
}
