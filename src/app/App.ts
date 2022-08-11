import Hook from "../hook/Hook";
import Route from "../route/Route";
import Cron from "../cron/Cron";
import DbPool from "../db/DbPool";
import Env from "../env/Env";
import Context from "../context/Context";
import Request from "../request/Request";
import * as http from "http";

export default class App {

    protected static content_type_map: any = {
        "ico": "image/x-icon",
        "jpg": "image/jpg",
        "png": "image/png",
        "css": "text/css;charset=utf8",
        "js": "application/javascript;charset=utf8",
        "htm": "text/html;charset=utf8",
        "html": "text/html;charset=utf8"
    }

    /**
     * global exception handle function
     */
    static exception_handle: Function;

    /**
     * hook before request main function
     * @param call handle function {Function}
     */
    static before(call: Function) {
        Hook.getInstance().push(Hook.beforeFlag, call);
    }

    /**
     * hook after request main function
     * @param call handle function {Function}
     */
    static after(call: Function) {
        Hook.getInstance().push(Hook.afterFlag, call);
    }

    /**
     * handle request if the request method is POST
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static post(path: string, call: Function) {
        Route.getInstance().push(Route.post, path, call);
    }

    /**
     * handle request if the request method is GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static get(path: string, call: Function) {
        Route.getInstance().push(Route.get, path, call);
    }

    /**
     * handle request if the request method is PUT
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static put(path: string, call: Function) {
        Route.getInstance().push(Route.put, path, call);
    }

    /**
     * handle request if the request method is DELETE
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static delete(path: string, call: Function) {
        Route.getInstance().push(Route.delete, path, call);
    }

    /**
     * handle request if the request method is POST|GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static any(path: string, call: Function) {
        Route.getInstance().push(Route.any, path, call);
    }

    /**
     * schedule task
     * @param period time period {string}
     * @param param param {any}
     * @param call handle function {Function}
     */
    static cron(period: string, param: any, call: Function) {
        Cron.getInstance().push(period, param, call);
    }

    /**
     * set global exception handle function
     * @param call handle function {Function}
     */
    static exception(call: Function) {
        App.exception_handle = call;
    }

    /**
     * get all content type that application can support
     */
    static getContentType() {
        return App.content_type_map;
    }

    /**
     * add new content type for application
     * @param suffix file suffix {string}
     * @param content_type content type {string}
     */
    static addContentType(suffix: string, content_type: string) {
        App.content_type_map[suffix] = content_type;
    }

    /**
     * before run the application
     */
    static runBefore() {
        Env.getInstance().load();

        DbPool.getInstance().run();

        Cron.getInstance().run(App.exception_handle);
    }

    static async runCommon(ctx: Context) {
        return await ctx.runCommon(App.exception_handle, App.content_type_map);
    }

    /**
     * run the application
     */
    static run(port: number = 5000) {
        App.runBefore();

        const server = http.createServer(async (req, res) => {
            let request = await Request.fromCommon(req);

            let ctx = Context.from(request);
            let res_handle = await ctx.runCommon(App.exception_handle, App.content_type_map);

            if (ctx.response_cookie) {
                res.setHeader('Set-Cookie', ctx.response_cookie);
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
        });

        server.listen(port, '0.0.0.0', () => {
            console.log("server is running at " + port.toString())
        });
    }
}