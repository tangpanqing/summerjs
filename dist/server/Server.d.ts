/// <reference types="node" />
import Context from "../context/Context";
import { IncomingMessage, ServerResponse } from "http";
export default class Server {
    protected content_type_map: any;
    protected static instance: Server;
    static getInstance: () => Server;
    http(exception_handle: Function, port: number): void;
    getContentType(): any;
    addContentType(suffix: string, content_type: string): void;
    handle_static(req: IncomingMessage, res: ServerResponse): void;
    handle_request(req: IncomingMessage, res: ServerResponse, exception_handle: Function): Promise<void>;
    runCommon(ctx: Context): Promise<any>;
}
//# sourceMappingURL=Server.d.ts.map