import {IncomingMessage} from "http";
import * as qs from "qs";
import * as url from "url";
import AnyObj from "../model/AnyObj";
import * as multiparty from "multiparty";

export default class Request {
    path!: string;
    method!: string;
    param!: AnyObj;
    files!: AnyObj;
    cookie!: string;

    constructor() {
        this.path = "";
        this.method = "";
        this.param = {};
        this.files = {};
    }

    static async fromCommon(req: IncomingMessage) {
        let o = new Request();
        o.method = req.method ?? "";
        o.param = {};

        let urlObj = url.parse(req.url ?? "", true);
        o.path = urlObj.pathname ?? "";

        for (let k in urlObj.query) {
            o.addParam(k, urlObj.query[k]);
        }

        if (req.method === 'POST') {
            let parsePostData = function (): Promise<any> {
                return new Promise((resolve, reject) => {
                    let postData = '';
                    req.on('data', (chunk) => postData += chunk.toString());
                    req.on('end', () => resolve(postData));
                });
            }

            let postObj;
            if (req.headers["content-type"]) {
                let arr = req.headers["content-type"].split(";");

                if (arr[0] == "application/x-www-form-urlencoded") {
                    postObj = qs.parse(await parsePostData());
                }

                if (arr[0] == "application/json") {
                    postObj = JSON.parse(await parsePostData());
                }

                if (arr[0] == "multipart/form-data") {
                    let handle_call = function (req: IncomingMessage): Promise<any> {
                        return new Promise((resolve, reject) => {
                            let form = new multiparty.Form();
                            form.parse(req, (err: Error, fields: any, files: any) => {
                                resolve({fields, files});
                            })
                        });
                    }

                    let call_res = await handle_call(req);

                    if (call_res.fields) {
                        for (let k in call_res.fields) {
                            o.addParam(k, call_res.fields[k][0]);
                        }
                    }

                    if (call_res.files) {
                        for (let k in call_res.files) {
                            o.files[k] = call_res.files[k][0];
                        }
                    }
                }
            }

            for (let k in postObj) {
                o.addParam(k, postObj[k]);
            }
        }

        o.cookie = req.headers.cookie ?? "";

        if (o.cookie != "") {
            let cookieArr = o.cookie.split(";");
            for (let k in cookieArr) {
                let arr = cookieArr[k].trim().split("=");
                o.addParam(arr[0], arr[1]);
            }
        }

        return o;
    }

    addParam(key: string, val: any) {
        this.param[key] = val;
    }

    setParam(val: any) {
        this.param = val;
    }

    getParam(val: any) {
        return this.param;
    }

    getString(key: string, def: string = ""): string {
        if (this.param.hasOwnProperty(key)) {
            return this.param[key] + "";
        }
        return def;
    }

    getNumber(key: string, def: number = 0): number {
        if (this.param.hasOwnProperty(key)) {
            return Number(this.param[key]);
        }
        return def;
    }

    getFile(key: string) {
        if (this.files[key]) return this.files[key];
        return null;
    }

    getCookie() {
        return this.cookie;
    }

}
