import Hook from "../hook/Hook";
import Route from "../route/Route";
import Cron from "../cron/Cron";
import DbPool from "../db/DbPool";
import Server from "../server/Server";
import Env from "../env/Env";

export default class App {

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
        return Server.getInstance().getContentType();
    }

    /**
     * add new content type for application
     * @param suffix file suffix {string}
     * @param content_type content type {string}
     */
    static addContentType(suffix: string, content_type: string) {
        Server.getInstance().addContentType(suffix, content_type);
    }

    /**
     * run the application
     */
    static run(port: number = 5000) {
        Env.getInstance().load();

        DbPool.getInstance().run();

        Cron.getInstance().run(App.exception_handle);

        Server.getInstance().http(App.exception_handle, port);
    }

}