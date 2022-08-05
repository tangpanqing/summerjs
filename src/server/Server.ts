import * as http from "http";
import * as fs from "fs";
import Request from "../request/Request";
import Response from "../response/Response";
import Route from "../route/Route";
import Context from "../context/Context";
import Hook from "../hook/Hook";
import {IncomingMessage, ServerResponse} from "http";
import Env from "../env/Env";

export default class Server {

    protected content_type_map: any = {
        "ico": "image/x-icon",
        "jpg": "image/jpg",
        "png": "image/png",
        "css": "text/css;charset=utf8",
        "js": "application/javascript;charset=utf8",
        "htm": "text/html;charset=utf8",
        "html": "text/html;charset=utf8"
    }

    protected static instance: Server;

    static getInstance = function (): Server {
        if (Server.instance) {
            return Server.instance;
        } else {
            Server.instance = new Server();
            return Server.instance;
        }
    }

    http(exception_handle: Function, port: number) {
        const server = http.createServer(async (req, res) => {
            if (req.url?.indexOf(".") != -1) {
                this.handle_static(req, res);
            } else {
                await this.handle_request(req, res, exception_handle);
            }
        });

        server.listen(port, '0.0.0.0', () => {
            console.log("server is running at " + port.toString())
        });
    }

    getContentType() {
        return this.content_type_map;
    }

    addContentType(suffix: string, content_type: string) {
        this.content_type_map[suffix] = content_type;
    }

    handle_static(req: IncomingMessage, res: ServerResponse) {
        let arr = req.url?.split(".") || [];
        let suffix = arr[arr.length - 1];
        let content_type = "";
        if (this.content_type_map[suffix]) content_type = this.content_type_map[suffix];

        let path = './public' + req.url;
        if (!fs.existsSync(path)) {
            res.writeHead(400, {'Content-type': "text/html;charset=utf8"})
            res.end("NOT FOUND")
        } else {
            res.writeHead(200, {'Content-type': content_type})
            res.end(fs.readFileSync(path))
        }
    }

    async handle_request(req: IncomingMessage, res: ServerResponse, exception_handle: Function) {
        let request = await Request.fromCommon(req);
        let response = await Response.fromCommon(res);
        let ctx = Context.from(request, response);

        let res_handle;
        try {
            res_handle = await this.runCommon(ctx);
        } catch (e) {
            if (exception_handle) {
                res_handle = exception_handle(e, ctx);
            } else {
                throw new Error(e);
            }
        }

        if (typeof (res_handle) == "object") {
            res.writeHead(200, {
                "Content-Type": "application/json;charset=utf8"
            });
            res_handle = JSON.stringify(res_handle);
        } else {
            res.writeHead(200, {
                "Content-Type": "text/html;charset=utf8"
            });
        }

        res.end(res_handle);
    }

    async runCommon(ctx: Context) {

        //获取要执行的方法
        let handle = Route.getInstance().getHandle(ctx.request);

        //执行
        ctx = await Hook.getInstance().before(ctx);
        let res_handle = await handle(ctx);
        res_handle = await Hook.getInstance().after(ctx, res_handle);

        //释放数据库连接,释放
        ctx.releaseConn();

        return res_handle;
    }
}