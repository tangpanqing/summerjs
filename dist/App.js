"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Hook_1 = require("./hook/Hook");
var Route_1 = require("./route/Route");
var Cron_1 = require("./cron/Cron");
var DbPool_1 = require("./db/DbPool");
var Server_1 = require("./Server");
var Env_1 = require("./Env");
var App = /** @class */ (function () {
    function App() {
    }
    /**
     * hook before request main function
     * @param call handle function {Function}
     */
    App.before = function (call) {
        Hook_1.default.getInstance().push(Hook_1.default.beforeFlag, call);
    };
    /**
     * hook after request main function
     * @param call handle function {Function}
     */
    App.after = function (call) {
        Hook_1.default.getInstance().push(Hook_1.default.afterFlag, call);
    };
    /**
     * handle request if the request method is POST
     * @param path request path {string}
     * @param call handle function {Function}
     */
    App.post = function (path, call) {
        Route_1.default.getInstance().push(Route_1.default.post, path, call);
    };
    /**
     * handle request if the request method is GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    App.get = function (path, call) {
        Route_1.default.getInstance().push(Route_1.default.get, path, call);
    };
    /**
     * handle request if the request method is POST|GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    App.any = function (path, call) {
        Route_1.default.getInstance().push(Route_1.default.any, path, call);
    };
    /**
     * schedule task
     * @param period time period {string}
     * @param param param {any}
     * @param call handle function {Function}
     */
    App.cron = function (period, param, call) {
        Cron_1.default.getInstance().push(period, param, call);
    };
    /**
     * set global exception handle function
     * @param call handle function {Function}
     */
    App.exception = function (call) {
        App.exception_handle = call;
    };
    /**
     * get all content type that application can support
     */
    App.getContentType = function () {
        return Server_1.default.getInstance().getContentType();
    };
    /**
     * add new content type for application
     * @param suffix file suffix {string}
     * @param content_type content type {string}
     */
    App.addContentType = function (suffix, content_type) {
        Server_1.default.getInstance().addContentType(suffix, content_type);
    };
    /**
     * run the application
     */
    App.run = function () {
        Env_1.default.getInstance().load();
        DbPool_1.default.getInstance().run();
        Cron_1.default.getInstance().run(App.exception_handle);
        Server_1.default.getInstance().http(App.exception_handle);
    };
    return App;
}());
exports.default = App;
