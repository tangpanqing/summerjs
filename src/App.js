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
exports.__esModule = true;
var http = require("http");
var fs = require("fs");
var Db_1 = require("./db/Db");
var Context_1 = require("./Context");
var Request_1 = require("./request/Request");
var Response_1 = require("./response/Response");
var Hook_1 = require("./hook/Hook");
var Route_1 = require("./route/Route");
var Cron_1 = require("./cron/Cron");
var App = /** @class */ (function () {
    function App() {
    }
    App.before = function (hook_fun) {
        Hook_1["default"].getInstance().push(Hook_1["default"].beforeFlag, hook_fun);
    };
    App.after = function (hook_fun) {
        Hook_1["default"].getInstance().push(Hook_1["default"].afterFlag, hook_fun);
    };
    App.post = function (path, call) {
        Route_1["default"].getInstance().push(Route_1["default"].post, path, call);
    };
    App.get = function (path, call) {
        Route_1["default"].getInstance().push(Route_1["default"].get, path, call);
    };
    App.any = function (path, call) {
        Route_1["default"].getInstance().push(Route_1["default"].any, path, call);
    };
    App.cron = function (period, call) {
        Cron_1["default"].getInstance().push(period, call);
    };
    App.run = function () {
        var _this = this;
        var db_pool_map = Db_1["default"].getDbPoolMap();
        Cron_1["default"].getInstance().run(db_pool_map);
        var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var arr, si, content_type_1, request, response, res_handle;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(((_a = req.url) === null || _a === void 0 ? void 0 : _a.indexOf(".")) != -1)) return [3 /*break*/, 1];
                        arr = ((_b = req.url) === null || _b === void 0 ? void 0 : _b.split(".")) || [];
                        si = arr[arr.length - 1];
                        content_type_1 = "";
                        if (si == "ico")
                            content_type_1 = "image/x-icon";
                        if (si == "jpg")
                            content_type_1 = "image/jpg";
                        if (si == "png")
                            content_type_1 = "image/png";
                        if (si == "css")
                            content_type_1 = "text/css;charset=utf8";
                        if (si == "js")
                            content_type_1 = "application/javascript;charset=utf8";
                        if (si == "htm")
                            content_type_1 = "text/html;charset=utf8";
                        if (si == "html")
                            content_type_1 = "text/html;charset=utf8";
                        fs.readFile('./public' + req.url, function (err, data) {
                            if (err) {
                                res.writeHead(400, { 'Content-type': "text/html;charset=utf8" });
                                res.end("NOT FOUND");
                            }
                            else {
                                res.writeHead(200, { 'Content-type': content_type_1 });
                                res.end(data);
                            }
                        });
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, Request_1["default"].fromCommon(req)];
                    case 2:
                        request = _c.sent();
                        return [4 /*yield*/, Response_1["default"].fromCommon(res)];
                    case 3:
                        response = _c.sent();
                        return [4 /*yield*/, App.runCommon(db_pool_map, request, response)];
                    case 4:
                        res_handle = _c.sent();
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
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        var port = Number(process.env.PORT) || 5000;
        server.listen(port, '0.0.0.0', function () {
            console.log("server is running at " + port.toString());
        });
    };
    App.runCommon = function (db_pool_map, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var handle, ctx, _a, res_handle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handle = Route_1["default"].getInstance().getHandle(request);
                        ctx = new Context_1["default"]();
                        ctx.request = request;
                        ctx.response = response;
                        _a = ctx;
                        return [4 /*yield*/, Db_1["default"].getDbConnMap(db_pool_map)];
                    case 1:
                        _a.db = _b.sent();
                        return [4 /*yield*/, Hook_1["default"].getInstance().before(ctx)];
                    case 2:
                        //执行
                        ctx = _b.sent();
                        return [4 /*yield*/, handle(ctx)];
                    case 3:
                        res_handle = _b.sent();
                        return [4 /*yield*/, Hook_1["default"].getInstance().after(ctx, res_handle)];
                    case 4:
                        res_handle = _b.sent();
                        //释放数据库连接,释放
                        Db_1["default"].releaseConn(ctx.db);
                        return [2 /*return*/, res_handle];
                }
            });
        });
    };
    return App;
}());
exports["default"] = App;
