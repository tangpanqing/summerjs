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
var DbPoolMap_1 = require("./DbPoolMap");
var StringObj_1 = require("../model/StringObj");
var fs = require("fs");
var mysql = require("mysql");
var DbConnMap_1 = require("./DbConnMap");
var DbConn = /** @class */ (function () {
    function DbConn() {
    }
    DbConn.getDbPoolMap = function () {
        var db_source_list = [];
        var env_file = ".env";
        var env = new StringObj_1["default"]();
        var content = fs.readFileSync(env_file).toString();
        var sep = "\n";
        if (process.platform == "win32")
            sep = "\r\n";
        if (process.platform == "darwin")
            sep = "\r";
        var content_arr = content.split(sep);
        for (var key in content_arr) {
            var s = content_arr[key];
            var content_item = s.replace(" ", "");
            if ("" != content_item) {
                var content_item_arr = content_item.split("=");
                env[content_item_arr[0]] = content_item_arr[1];
                var results = content_item_arr[0].match(/db\.(\w+)/);
                if (results)
                    db_source_list.push(results[1]);
            }
        }
        db_source_list = Array.from(new Set(db_source_list));
        var db_pool_map = new DbPoolMap_1["default"]();
        for (var i = 0; i < db_source_list.length; i++) {
            var db_type = db_source_list[i];
            db_pool_map[db_type] = mysql.createPool({
                connectionLimit: 5,
                host: env["db." + db_type + ".host"],
                user: env["db." + db_type + ".username"],
                password: env["db." + db_type + ".password"],
                database: env["db." + db_type + ".database"]
            });
        }
        return db_pool_map;
    };
    DbConn.getDbConnMap = function (db_pool_map) {
        return __awaiter(this, void 0, void 0, function () {
            var dbConnMap, _a, _b, _i, db_type, pool, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        dbConnMap = new DbConnMap_1["default"];
                        _a = [];
                        for (_b in db_pool_map)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        db_type = _a[_i];
                        pool = db_pool_map[db_type];
                        _c = dbConnMap;
                        _d = db_type;
                        return [4 /*yield*/, DbConn.getConn(pool)];
                    case 2:
                        _c[_d] = _e.sent();
                        _e.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, dbConnMap];
                }
            });
        });
    };
    DbConn.getConn = function (pool) {
        return new Promise(function (resolved, rejected) {
            pool.getConnection(function (err, conn) {
                if (err) {
                    console.log("数据库连接出现异常:" + err.message);
                    rejected(null);
                }
                else {
                    resolved(conn);
                }
            });
        });
    };
    DbConn.releaseConn = function (db) {
        for (var db_type in db) {
            db[db_type].release();
        }
    };
    return DbConn;
}());
exports["default"] = DbConn;
