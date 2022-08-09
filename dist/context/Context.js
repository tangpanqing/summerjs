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
var Db_1 = require("../db/Db");
var Verify_1 = require("../verify/Verify");
var fs = require("fs");
var Route_1 = require("../route/Route");
var Hook_1 = require("../hook/Hook");
var Context = /** @class */ (function () {
    function Context() {
        this.err_list = [];
    }
    Context.from = function (request) {
        var ctx = new Context();
        ctx.request = request;
        //ctx.response = response;
        return ctx;
    };
    //请求相关
    Context.prototype.getString = function (key, def, verify_list, key_name) {
        if (def === void 0) { def = ""; }
        if (verify_list === void 0) { verify_list = []; }
        if (key_name === void 0) { key_name = ""; }
        var val = this.request.getString(key, def);
        this.verify(key, val, verify_list, key_name);
        return val;
    };
    Context.prototype.getNumber = function (key, def, verify_list, key_name) {
        if (def === void 0) { def = 0; }
        if (verify_list === void 0) { verify_list = []; }
        if (key_name === void 0) { key_name = ""; }
        var val = this.request.getNumber(key, def);
        this.verify(key, val, verify_list, key_name);
        return val;
    };
    Context.prototype.verify = function (key, val, verify_list, key_name) {
        if (verify_list === void 0) { verify_list = []; }
        if (verify_list.length > 0) {
            for (var i = 0; i < verify_list.length; i++) {
                var rule = verify_list[i];
                for (var j = 0; j < Verify_1.default.tag_all.length; j++) {
                    var item = Verify_1.default.tag_all[j];
                    item = item.slice(0, 1).toUpperCase() + item.slice(1);
                    // @ts-ignore
                    if (Verify_1.default["match" + item](rule) && !Verify_1.default["is" + item](val, rule))
                        this.err_list.push(Verify_1.default["err" + item](key_name != "" ? key_name : key, rule));
                }
            }
        }
    };
    Context.prototype.getFile = function (key) {
        return this.request.getFile(key);
    };
    //响应相关
    Context.prototype.setCookie = function (value) {
        this.response.setCookie(value);
    };
    Context.prototype.clearCookie = function () {
        this.response.clearCookie();
    };
    //数据库相关
    Context.prototype.table = function (table_name, db_type) {
        if (db_type === void 0) { db_type = "primary"; }
        return new Db_1.default().setContext(this).setDbType(db_type).table(table_name);
    };
    Context.prototype.query = function (sql, bind, db_type) {
        if (db_type === void 0) { db_type = "primary"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Db_1.default().setContext(this).setDbType(db_type).query(sql, bind)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Context.prototype.beginTransaction = function (db_type) {
        if (db_type === void 0) { db_type = "primary"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Db_1.default().setContext(this).setDbType(db_type).beginTransaction()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Context.prototype.commit = function (db_type) {
        if (db_type === void 0) { db_type = "primary"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Db_1.default().setContext(this).setDbType(db_type).commit()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Context.prototype.rollback = function (db_type) {
        if (db_type === void 0) { db_type = "primary"; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Db_1.default().setContext(this).setDbType(db_type).rollback()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Context.prototype.releaseConn = function () {
        if (this.db_conn_map)
            Db_1.default.releaseConn(this.db_conn_map);
    };
    Context.prototype.runCommon = function (exception_handle, content_type_map) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(((_a = this.request.path) === null || _a === void 0 ? void 0 : _a.indexOf(".")) != -1)) return [3 /*break*/, 1];
                        return [2 /*return*/, this.handle_static(content_type_map)];
                    case 1: return [4 /*yield*/, this.handle_request(exception_handle)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Context.prototype.handle_static = function (content_type_map) {
        var _a;
        var arr = ((_a = this.request.path) === null || _a === void 0 ? void 0 : _a.split(".")) || [];
        var suffix = arr[arr.length - 1];
        var content_type = "";
        if (content_type_map[suffix])
            content_type = content_type_map[suffix];
        var path = './public' + this.request.path;
        if (!fs.existsSync(path)) {
            this.writeHead(400, { 'Content-type': "text/html;charset=utf8" });
            return "NOT FOUND";
        }
        else {
            this.writeHead(200, { 'Content-type': content_type });
            return fs.readFileSync(path);
        }
    };
    Context.prototype.handle_request = function (exception_handle) {
        return __awaiter(this, void 0, void 0, function () {
            var res_handle, handle, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        handle = Route_1.default.getInstance().getHandle(this.request);
                        //执行
                        return [4 /*yield*/, Hook_1.default.getInstance().before(this)];
                    case 1:
                        //执行
                        _a.sent();
                        return [4 /*yield*/, handle(this)];
                    case 2:
                        res_handle = _a.sent();
                        return [4 /*yield*/, Hook_1.default.getInstance().after(this, res_handle)];
                    case 3:
                        res_handle = _a.sent();
                        //释放数据库连接,释放
                        this.releaseConn();
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        if (exception_handle) {
                            res_handle = exception_handle(e_1, this);
                        }
                        else {
                            throw new Error(e_1);
                        }
                        return [3 /*break*/, 5];
                    case 5:
                        if (typeof (res_handle) == "object") {
                            this.writeHead(200, {
                                "Content-Type": "application/json;charset=utf8"
                            });
                            res_handle = JSON.stringify(res_handle);
                        }
                        else {
                            this.writeHead(200, {
                                "Content-Type": "text/html;charset=utf8"
                            });
                        }
                        return [2 /*return*/, res_handle];
                }
            });
        });
    };
    Context.prototype.writeHead = function (code, header) {
        this.response_code = code;
        this.response_header = header;
    };
    return Context;
}());
exports.default = Context;
