export default class RouteItem{
    period: string;
    call: Function;

    constructor(period:string, call:Function) {
        this.period = period;
        this.call = call;
    }
}
