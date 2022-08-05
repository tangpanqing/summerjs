"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbPoolMap_1 = require("./DbPoolMap");
var mysql = require("mysql");
var Env_1 = require("../env/Env");
var DbPool = /** @class */ (function () {
    function DbPool() {
    }
    DbPool.prototype.setPoolMap = function (db_pool_map) {
        this.db_pool_map = db_pool_map;
    };
    DbPool.prototype.getPoolMap = function () {
        return this.db_pool_map;
    };
    DbPool.prototype.run = function () {
        var db_source_list = [];
        var env = Env_1.default.getInstance().getParamMap();
        for (var k in env) {
            var results = k.match(/db\.(\w+)/);
            if (results)
                db_source_list.push(results[1]);
        }
        db_source_list = Array.from(new Set(db_source_list));
        var db_pool_map = new DbPoolMap_1.default();
        for (var i = 0; i < db_source_list.length; i++) {
            var db_type = db_source_list[i];
            db_pool_map[db_type] = mysql.createPool({
                connectionLimit: 5,
                host: env["db." + db_type + ".host"],
                user: env["db." + db_type + ".username"],
                password: env["db." + db_type + ".password"],
                database: env["db." + db_type + ".database"],
            });
        }
        DbPool.getInstance().setPoolMap(db_pool_map);
    };
    DbPool.getInstance = function () {
        if (DbPool.instance) {
            return DbPool.instance;
        }
        else {
            DbPool.instance = new DbPool();
            return DbPool.instance;
        }
    };
    return DbPool;
}());
exports.default = DbPool;
