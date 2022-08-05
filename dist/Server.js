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
var http = require("http");
var fs = require("fs");
var Request_1 = require("./request/Request");
var Response_1 = require("./response/Response");
var Route_1 = require("./route/Route");
var Context_1 = require("./Context");
var Hook_1 = require("./hook/Hook");
var Env_1 = require("./Env");
var Server = /** @class */ (function () {
    function Server() {
        this.content_type_map = {
            "ico": "image/x-icon",
            "jpg": "image/jpg",
            "png": "image/png",
            "css": "text/css;charset=utf8",
            "js": "application/javascript;charset=utf8",
            "htm": "text/html;charset=utf8",
            "html": "text/html;charset=utf8"
        };
    }
    Server.prototype.http = function (exception_handle) {
        var _this = this;
        var server = http.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(((_a = req.url) === null || _a === void 0 ? void 0 : _a.indexOf(".")) != -1)) return [3 /*break*/, 1];
                        this.handle_static(req, res);
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.handle_request(req, res, exception_handle)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        var port = Number(process.env.PORT) || Number(Env_1.default.getInstance().getParam("port"));
        server.listen(port, '0.0.0.0', function () {
            console.log("server is running at " + port.toString());
        });
    };
    Server.prototype.getContentType = function () {
        return this.content_type_map;
    };
    Server.prototype.addContentType = function (suffix, content_type) {
        this.content_type_map[suffix] = content_type;
    };
    Server.prototype.handle_static = function (req, res) {
        var _a;
        var arr = ((_a = req.url) === null || _a === void 0 ? void 0 : _a.split(".")) || [];
        var suffix = arr[arr.length - 1];
        var content_type = "";
        if (this.content_type_map[suffix])
            content_type = this.content_type_map[suffix];
        var path = './public' + req.url;
        if (!fs.existsSync(path)) {
            res.writeHead(400, { 'Content-type': "text/html;charset=utf8" });
            res.end("NOT FOUND");
        }
        else {
            res.writeHead(200, { 'Content-type': content_type });
            res.end(fs.readFileSync(path));
        }
    };
    Server.prototype.handle_request = function (req, res, exception_handle) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response, ctx, res_handle, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Request_1.default.fromCommon(req)];
                    case 1:
                        request = _a.sent();
                        return [4 /*yield*/, Response_1.default.fromCommon(res)];
                    case 2:
                        response = _a.sent();
                        ctx = Context_1.default.from(request, response);
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.runCommon(ctx)];
                    case 4:
                        res_handle = _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        if (exception_handle) {
                            res_handle = exception_handle(e_1, ctx);
                        }
                        else {
                            throw new Error(e_1);
                        }
                        return [3 /*break*/, 6];
                    case 6:
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
        });
    };
    Server.prototype.runCommon = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var handle, res_handle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        handle = Route_1.default.getInstance().getHandle(ctx.request);
                        return [4 /*yield*/, Hook_1.default.getInstance().before(ctx)];
                    case 1:
                        //执行
                        ctx = _a.sent();
                        return [4 /*yield*/, handle(ctx)];
                    case 2:
                        res_handle = _a.sent();
                        return [4 /*yield*/, Hook_1.default.getInstance().after(ctx, res_handle)];
                    case 3:
                        res_handle = _a.sent();
                        //释放数据库连接,释放
                        ctx.releaseConn();
                        return [2 /*return*/, res_handle];
                }
            });
        });
    };
    Server.getInstance = function () {
        if (Server.instance) {
            return Server.instance;
        }
        else {
            Server.instance = new Server();
            return Server.instance;
        }
    };
    return Server;
}());
exports.default = Server;
