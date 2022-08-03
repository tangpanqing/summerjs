import {ServerResponse} from "http";

export default class Response {

    res!:ServerResponse;

    static async fromCommon(res: ServerResponse) {
        let o =  new Response();
        o.res = res;
        return o;
    }

    setCookie(value:string){
        this.res.setHeader('Set-Cookie', value)
    }

}
