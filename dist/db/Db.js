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
var DbConn_1 = require("./DbConn");
var DbWhereItem_1 = require("./DbWhereItem");
var DbPool_1 = require("./DbPool");
var Assert = require("assert");
var Db = /** @class */ (function () {
    function Db() {
        this.condition = {
            table_name: "",
            field_name: "",
            order_by: "",
            where_list: []
        };
    }
    Db.prototype.setContext = function (ctx) {
        this.ctx = ctx;
        return this;
    };
    Db.prototype.setDbType = function (db_type) {
        this.db_type = db_type;
        return this;
    };
    Db.prototype.beginTransaction = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handle, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handle = function (conn) {
                            return new Promise(function (resolved, rejected) {
                                conn.beginTransaction(function (error) { return _this.transCall(error, resolved, rejected); });
                            });
                        };
                        _a = handle;
                        return [4 /*yield*/, this.getConn()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Db.prototype.commit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handle, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handle = function (conn) {
                            return new Promise(function (resolved, rejected) {
                                conn.commit(function (error) { return _this.transCall(error, resolved, rejected); });
                            });
                        };
                        _a = handle;
                        return [4 /*yield*/, this.getConn()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Db.prototype.rollback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var handle, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        handle = function (conn) {
                            return new Promise(function (resolved, rejected) {
                                conn.rollback(function (error) { return _this.transCall(error, resolved, rejected); });
                            });
                        };
                        _a = handle;
                        return [4 /*yield*/, this.getConn()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, [_b.sent()])];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Db.prototype.getConn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db_pool_map, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(typeof this.ctx.db_conn_map == "undefined")) return [3 /*break*/, 2];
                        db_pool_map = DbPool_1.default.getInstance().getPoolMap();
                        _a = this.ctx;
                        return [4 /*yield*/, Db.getDbConnMap(db_pool_map)];
                    case 1:
                        _a.db_conn_map = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.ctx.db_conn_map[this.db_type]];
                }
            });
        });
    };
    Db.prototype.transCall = function (error, resolved, rejected) {
        if (error) {
            rejected(false);
        }
        else {
            resolved(true);
        }
    };
    Db.prototype.table = function (table_name) {
        this.condition.table_name = table_name;
        return this;
    };
    Db.getDbConnMap = function (db_pool_map) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DbConn_1.default.getDbConnMap(db_pool_map)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Db.releaseConn = function (db) {
        DbConn_1.default.releaseConn(db);
    };
    ;
    Db.prototype.field = function (f) {
        this.condition.field_name = f;
        return this;
    };
    Db.prototype.where = function (obj) {
        return this.whereEq(obj);
    };
    Db.prototype.whereEq = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '=', obj[k])); });
        return this;
    };
    Db.prototype.whereNotEq = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '!=', obj[k])); });
        return this;
    };
    Db.prototype.whereIn = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'IN', obj[k])); });
        return this;
    };
    Db.prototype.whereNotIn = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'NOT IN', obj[k])); });
        return this;
    };
    Db.prototype.whereBetween = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'BETWEEN', obj[k])); });
        return this;
    };
    Db.prototype.whereNotBetween = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'NOT BETWEEN', obj[k])); });
        return this;
    };
    Db.prototype.whereLike = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'LIKE', obj[k])); });
        return this;
    };
    Db.prototype.whereNotLike = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, 'NOT LIKE', obj[k])); });
        return this;
    };
    Db.prototype.whereLt = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '<', obj[k])); });
        return this;
    };
    Db.prototype.whereLte = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '<=', obj[k])); });
        return this;
    };
    Db.prototype.whereGt = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '>', obj[k])); });
        return this;
    };
    Db.prototype.whereGte = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.condition.where_list.push(new DbWhereItem_1.default(k, '>=', obj[k])); });
        return this;
    };
    Db.prototype.orderBy = function (order_by) {
        this.condition.order_by = order_by;
        return this;
    };
    Db.prototype.whereCommon = function (obj, call) {
        for (var k in obj) {
            if (typeof (obj[k]) != "undefined" && typeof (obj[k]) != "function") {
                call(k, obj);
            }
        }
    };
    Db.prototype.handleWhere = function (bind) {
        if (this.condition.where_list.length == 0)
            return "";
        var join = [];
        for (var k in this.condition.where_list) {
            var v = this.condition.where_list[k];
            if (v.opt == "IN" || v.opt == "NOT IN") {
                var f = [];
                for (var i = 0; i < v.val.length; i++) {
                    f.push("?");
                }
                join.push(v.key + " " + v.opt + " " + '(' + f.join(',') + ')');
                for (var kk in v.val) {
                    bind.push(v.val[kk]);
                }
                break;
            }
            if (v.opt == "BETWEEN" || v.opt == "NOT BETWEEN") {
                var f = [];
                for (var i = 0; i < v.val.length; i++) {
                    f.push("?");
                }
                join.push(v.key + " " + v.opt + " " + f.join(' AND '));
                for (var kk in v.val) {
                    bind.push(v.val[kk]);
                }
                break;
            }
            // if (v.opt == "LIKE" || v.opt == "NOT LIKE") {
            //     $val = str_replace("%", "", $v->val);
            //     $val_str = str_replace($val, "?", $v->val);
            //     $val_arr = str_split($val_str);
            //     foreach ($val_arr as &$n) if ($n == "%") $n = "'" . $n . "'";
            //
            //     $join[] = $v->key . " " . $v->opt . " " . "CONCAT(" . join(",", $val_arr) . ")";
            //     $bind[] = $val;
            //     break;
            // }
            join.push(v.key + v.opt + '?');
            bind.push(v.val);
        }
        return " WHERE " + join.join(" AND ");
    };
    Db.prototype.handleField = function () {
        return this.condition.field_name;
    };
    Db.prototype.handleGroup = function () {
        return "";
    };
    Db.prototype.handleOrder = function () {
        if (this.condition.order_by == "")
            return "";
        return " ORDER BY " + this.condition.order_by;
    };
    Db.prototype.handleLimit = function () {
        return "";
    };
    Db.prototype.query = function (sql, bind) {
        var _this = this;
        return new Promise(function (resolved, rejected) { return __awaiter(_this, void 0, void 0, function () {
            var conn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getConn()];
                    case 1:
                        conn = _a.sent();
                        conn.query(sql, bind, function (error, results) {
                            if (error) {
                                console.log("发生异常:" + error.sqlMessage);
                                resolved(null);
                            }
                            else {
                                resolved(results);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Db.prototype.insert = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var key, val, bind, k, v, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = [];
                        val = [];
                        bind = [];
                        for (k in obj) {
                            v = obj[k];
                            if (typeof (v) !== "undefined" && typeof (v) !== "function") {
                                key.push(k);
                                val.push("?");
                                bind.push(v);
                            }
                        }
                        sql = "INSERT INTO " + this.condition.table_name + " (" + key.join(",") + ") VALUES (" + val.join(",") + ")";
                        return [4 /*yield*/, this.query(sql, bind)];
                    case 1:
                        res = _a.sent();
                        Assert(null !== res, "插入失败");
                        return [2 /*return*/, res.insertId];
                }
            });
        });
    };
    Db.prototype.findOne = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var res_list, res, o, k;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findCommon()];
                    case 1:
                        res_list = _a.sent();
                        if (res_list === null)
                            return [2 /*return*/, null];
                        if (res_list.length == 0)
                            return [2 /*return*/, null];
                        res = res_list[0];
                        o = new type();
                        for (k in o) {
                            if (typeof (res[k]) != "undefined") {
                                o[k] = res[k];
                            }
                        }
                        return [2 /*return*/, o];
                }
            });
        });
    };
    Db.prototype.findAll = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var res_list, o_list, k, res, o, k_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findCommon()];
                    case 1:
                        res_list = _a.sent();
                        if (res_list === null)
                            return [2 /*return*/, null];
                        o_list = [];
                        for (k in res_list) {
                            res = res_list[k];
                            o = new type();
                            for (k_1 in o) {
                                if (typeof (res[k_1]) != "undefined") {
                                    o[k_1] = res[k_1];
                                }
                            }
                            o_list.push(o);
                        }
                        return [2 /*return*/, o_list];
                }
            });
        });
    };
    Db.prototype.count = function (field_name) {
        if (field_name === void 0) { field_name = "*"; }
        return __awaiter(this, void 0, void 0, function () {
            var res_list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        field_name = "count(" + field_name + ")";
                        this.field(field_name);
                        return [4 /*yield*/, this.findCommon()];
                    case 1:
                        res_list = _a.sent();
                        if (res_list === null)
                            return [2 /*return*/, null];
                        return [2 /*return*/, res_list[0][field_name]];
                }
            });
        });
    };
    Db.prototype.findCommon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bind, sql, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bind = [];
                        sql = "SELECT " + this.handleField() + " FROM " + this.condition.table_name + this.handleWhere(bind) + this.handleGroup() + this.handleOrder() + this.handleLimit();
                        return [4 /*yield*/, this.query(sql, bind)];
                    case 1:
                        list = _a.sent();
                        if (null === list)
                            return [2 /*return*/, null];
                        return [2 /*return*/, list];
                }
            });
        });
    };
    Db.prototype.update = function (obj) {
        return __awaiter(this, void 0, void 0, function () {
            var key, bind, k, v, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = [];
                        bind = [];
                        for (k in obj) {
                            v = obj[k];
                            if (typeof (v) != "undefined" && typeof (v) != "function") {
                                key.push(k + "=?");
                                bind.push(v);
                            }
                        }
                        sql = "UPDATE " + this.condition.table_name + " SET " + key.join(',') + this.handleWhere(bind);
                        return [4 /*yield*/, this.query(sql, bind)];
                    case 1:
                        res = _a.sent();
                        if (null === res)
                            return [2 /*return*/, null];
                        return [2 /*return*/, res.affectedRows];
                }
            });
        });
    };
    Db.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bind, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.condition.where_list.length == 0)
                            throw new Error("删除条件不能为空");
                        bind = [];
                        sql = "DELETE FROM " + this.condition.table_name + this.handleWhere(bind);
                        return [4 /*yield*/, this.query(sql, bind)];
                    case 1:
                        res = _a.sent();
                        if (null === res)
                            return [2 /*return*/, null];
                        return [2 /*return*/, res.affectedRows];
                }
            });
        });
    };
    return Db;
}());
exports.default = Db;
