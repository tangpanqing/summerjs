export default class HookItem{
    type: string;
    call: Function;

    constructor(type:string, call:Function) {
        this.type = type;
        this.call = call;
    }
}
