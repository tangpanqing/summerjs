import * as http from "http";
import * as fs from "fs";
import Db from "./db/Db";
import Context from "./Context";
import Request from "./request/Request";
import Response from "./response/Response";
import DbPoolMap from "./db/DbPoolMap";
import Hook from "./hook/Hook";
import Route from "./route/Route";
import Cron from "./cron/Cron";

export default class App {

    static before(hook_fun: Function) {
        Hook.getInstance().push(Hook.beforeFlag, hook_fun);
    }

    static after(hook_fun: Function) {
        Hook.getInstance().push(Hook.afterFlag, hook_fun);
    }

    static post(path: string, call: Function) {
        Route.getInstance().push(Route.post, path, call);
    }

    static get(path: string, call: Function) {
        Route.getInstance().push(Route.get, path, call);
    }

    static any(path: string, call: Function) {
        Route.getInstance().push(Route.any, path, call);
    }

    static cron(period: string, call: Function) {
        Cron.getInstance().push(period, call);
    }

    static run() {

        let db_pool_map = Db.getDbPoolMap();

        Cron.getInstance().run(db_pool_map);

        const server = http.createServer(async (req, res) => {
            if (req.url?.indexOf(".") != -1) {
                let arr = req.url?.split(".") || [];
                let si = arr[  arr.length -1 ];
                let content_type = "";
                if(si == "ico") content_type = "image/x-icon";
                if(si == "jpg") content_type = "image/jpg";
                if(si == "png") content_type = "image/png";
                if(si == "css") content_type = "text/css;charset=utf8";
                if(si == "js")  content_type = "application/javascript;charset=utf8";
                if(si == "htm") content_type = "text/html;charset=utf8";
                if(si == "html") content_type = "text/html;charset=utf8";

                fs.readFile('./public' + req.url, (err, data) => {
                    if(err){
                        res.writeHead(400, {'Content-type': "text/html;charset=utf8"})
                        res.end("NOT FOUND")
                    }else{
                        res.writeHead(200, {'Content-type': content_type})
                        res.end(data)
                    }
                })
            } else {
                let request = await Request.fromCommon(req);
                let response = await Response.fromCommon(res);
                let res_handle = await App.runCommon(db_pool_map, request, response);

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
        });

        let port: number = Number(process.env.PORT) || 5000;

        server.listen(port, '0.0.0.0', () => {
            console.log("server is running at " + port.toString())
        });
    }

    static async runCommon(db_pool_map: DbPoolMap, request: Request, response: Response) {

        //获取要执行的方法
        let handle = Route.getInstance().getHandle(request);

        //构造上下文
        let ctx = new Context();
        ctx.request = request;
        ctx.response = response;
        ctx.db = await Db.getDbConnMap(db_pool_map);

        //执行
        ctx = await Hook.getInstance().before(ctx);
        let res_handle = await handle(ctx);
        res_handle = await Hook.getInstance().after(ctx, res_handle);

        //释放数据库连接,释放
        Db.releaseConn(ctx.db);

        return res_handle;
    }
}