/// <reference types="node" />
import { IncomingMessage } from "http";
import AnyObj from "../model/AnyObj";
export default class Request {
    path: string;
    method: string;
    param: AnyObj;
    files: AnyObj;
    cookie: string;
    constructor();
    static fromCommon(req: IncomingMessage): Promise<Request>;
    addParam(key: string, val: any): void;
    setParam(val: any): void;
    getParam(val: any): AnyObj;
    getString(key: string, def?: string): string;
    getNumber(key: string, def?: number): number;
    getFile(key: string): any;
    getCookie(): string;
}
//# sourceMappingURL=Request.d.ts.map