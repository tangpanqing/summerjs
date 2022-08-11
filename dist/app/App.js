"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Hook_1 = require("../hook/Hook");
var Route_1 = require("../route/Route");
var Cron_1 = require("../cron/Cron");
var DbPool_1 = require("../db/DbPool");
var Env_1 = require("../env/Env");
var Context_1 = require("../context/Context");
var Request_1 = require("../request/Request");
var http = require("http");
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
     * handle request if the request method is PUT
     * @param path request path {string}
     * @param call handle function {Function}
     */
    App.put = function (path, call) {
        Route_1.default.getInstance().push(Route_1.default.put, path, call);
    };
    /**
     * handle request if the request method is DELETE
     * @param path request path {string}
     * @param call handle function {Function}
     */
    App.delete = function (path, call) {
        Route_1.default.getInstance().push(Route_1.default.delete, path, call);
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
        return App.content_type_map;
    };
    /**
     * add new content type for application
     * @param suffix file suffix {string}
     * @param content_type content type {string}
     */
    App.addContentType = function (suffix, content_type) {
        App.content_type_map[suffix] = content_type;
    };
    /**
     * before run the application
     */
    App.runBefore = function () {
        Env_1.default.getInstance().load();
        DbPool_1.default.getInstance().run();
        Cron_1.default.getInstance().run(App.exception_handle);
    };
    App.runCommon = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ctx.runCommon(App.exception_handle, App.content_type_map)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * run the application
     */
    App.run = function (port) {
        var _this = this;
        if (port === void 0) { port = 5000; }
        App.runBefore();
        var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var request, ctx, res_handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request_1.default.fromCommon(req)];
                    case 1:
                        request = _a.sent();
                        ctx = Context_1.default.from(request);
                        return [4 /*yield*/, ctx.runCommon(App.exception_handle, App.content_type_map)];
                    case 2:
                        res_handle = _a.sent();
                        if (ctx.response_cookie) {
                            res.setHeader('Set-Cookie', ctx.response_cookie);
                        }
                        if (typeof (res_handle) == "object") {
                            res.writeHead(200, {
                                "Content-Type": "application/json;charset=utf8"
                            });
                            res_handle = JSON.stringify(res_handle);
                        }
                        else {
                            res.writeHead(200, {
                                "Content-Type": "text/html;charset=utf8"
                            });
                        }
                        res.end(res_handle);
                        return [2 /*return*/];
                }
            });
        }); });
        server.listen(port, '0.0.0.0', function () {
            console.log("server is running at " + port.toString());
        });
    };
    App.content_type_map = {
        "ico": "image/x-icon",
        "jpg": "image/jpg",
        "png": "image/png",
        "css": "text/css;charset=utf8",
        "js": "application/javascript;charset=utf8",
        "htm": "text/html;charset=utf8",
        "html": "text/html;charset=utf8"
    };
    return App;
}());
exports.default = App;
