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
var DbTrans_1 = require("./DbTrans");
var DbConn_1 = require("./DbConn");
var DbWhereItem_1 = require("./DbWhereItem");
var Db = /** @class */ (function () {
    function Db() {
        this.field_name = "*";
        this.where_list = [];
    }
    Db.getDbPoolMap = function () {
        return DbConn_1["default"].getDbPoolMap();
    };
    Db.getDbConnMap = function (db_pool_map) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DbConn_1["default"].getDbConnMap(db_pool_map)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Db.releaseConn = function (db) {
        DbConn_1["default"].releaseConn(db);
    };
    ;
    Db.beginTransaction = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DbTrans_1["default"].beginTransaction(conn)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Db.commit = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DbTrans_1["default"].commit(conn)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Db.rollback = function (conn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DbTrans_1["default"].rollback(conn)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Db.table = function (conn, table_name) {
        var db = new Db();
        db.conn = conn;
        db.table_name = table_name;
        return db;
    };
    Db.prototype.field = function (f) {
        this.field_name = f;
        return this;
    };
    Db.prototype.where = function (obj) {
        return this.whereEq(obj);
    };
    Db.prototype.whereEq = function (obj) {
        var _this = this;
        this.whereCommon(obj, function (k, obj) { return _this.where_list.push(new DbWhereItem_1["default"](k, '=', obj[k])); });
        return this;
    };
    // whereNotEq(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '!=', obj[k])));
    //     return this;
    // }
    //
    // whereIn(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'IN', obj[k])));
    //     return this;
    // }
    //
    // whereNotIn(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT IN', obj[k])));
    //     return this;
    // }
    //
    // whereBetween(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'BETWEEN', obj[k])));
    //     return this;
    // }
    //
    // whereNotBetween(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT BETWEEN', obj[k])));
    //     return this;
    // }
    //
    // whereLike(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'LIKE', obj[k])));
    //     return this;
    // }
    //
    // whereNotLike(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT LIKE', obj[k])));
    //     return this;
    // }
    //
    // whereLt(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '<', obj[k])));
    //     return this;
    // }
    //
    // whereLte(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '<=', obj[k])));
    //     return this;
    // }
    //
    // whereGt(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '>', obj[k])));
    //     return this;
    // }
    //
    // whereGte(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '>=', obj[k])));
    //     return this;
    // }
    Db.prototype.whereCommon = function (obj, call) {
        for (var k in obj) {
            if (typeof (obj[k]) != "undefined" && typeof (obj[k]) != "function") {
                call(k, obj);
            }
        }
    };
    Db.prototype.handleWhere = function (bind) {
        if (this.where_list.length == 0)
            return "";
        var join = [];
        for (var k in this.where_list) {
            var v = this.where_list[k];
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
        return this.field_name;
    };
    Db.prototype.handleGroup = function () {
        return "";
    };
    Db.prototype.handleOrder = function () {
        return "";
    };
    Db.prototype.handleLimit = function () {
        return "";
    };
    Db.prototype.query = function (sql, bind) {
        var _this = this;
        return new Promise(function (resolved, rejected) {
            _this.conn.query(sql, bind, function (error, results) {
                if (error) {
                    console.log("发生异常:" + error.sqlMessage);
                    resolved(null);
                }
                else {
                    resolved(results);
                }
            });
        });
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
                        sql = "INSERT INTO " + this.table_name + " (" + key.join(",") + ") VALUES (" + val.join(",") + ")";
                        return [4 /*yield*/, this.query(sql, bind)];
                    case 1:
                        res = _a.sent();
                        if (null === res)
                            return [2 /*return*/, null];
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
                        sql = "SELECT " + this.handleField() + " FROM " + this.table_name + this.handleWhere(bind) + this.handleGroup() + this.handleOrder() + this.handleLimit();
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
                        sql = "UPDATE " + this.table_name + " SET " + key.join(',') + this.handleWhere(bind);
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
    Db.prototype["delete"] = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bind, sql, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.where_list.length == 0)
                            throw new Error("删除条件不能为空");
                        bind = [];
                        sql = "DELETE FROM " + this.table_name + this.handleWhere(bind);
                        console.log(sql);
                        console.log(bind);
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
exports["default"] = Db;
