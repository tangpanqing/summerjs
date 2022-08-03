import DbPoolMap from "./DbPoolMap";
import StringObj from "../model/StringObj";
import * as fs from "fs";
import * as mysql from "mysql";
import DbConnMap from "./DbConnMap";
import {MysqlError, Pool, PoolConnection} from "mysql";

export default class DbConn {

    static getDbPoolMap(): DbPoolMap {
        let db_source_list = [];

        let env_file = ".env";
        let env = new StringObj();
        let content = fs.readFileSync(env_file).toString();

        let sep = "\n";
        if(process.platform == "win32") sep = "\r\n";
        if(process.platform == "darwin") sep = "\r";

        let content_arr = content.split(sep);
        for (let key in content_arr) {
            let s = content_arr[key];
            let content_item = s.replace(" ", "");
            if ("" != content_item) {
                let content_item_arr = content_item.split("=");
                env[content_item_arr[0]] = content_item_arr[1]

                let results = content_item_arr[0].match(/db\.(\w+)/);
                if (results) db_source_list.push(results[1]);
            }
        }

        db_source_list = Array.from(new Set(db_source_list));

        let db_pool_map = new DbPoolMap();
        for (let i = 0; i < db_source_list.length; i++) {
            let db_type = db_source_list[i];
            db_pool_map[db_type] = mysql.createPool({
                connectionLimit: 5,
                host: env["db." + db_type + ".host"],
                user: env["db." + db_type + ".username"],
                password: env["db." + db_type + ".password"],
                database: env["db." + db_type + ".database"],
            });
        }

        return db_pool_map;
    }

    static async getDbConnMap(db_pool_map: DbPoolMap): Promise<DbConnMap> {
        let dbConnMap = new DbConnMap;
        for (let db_type in db_pool_map) {
            let pool = db_pool_map[db_type];
            dbConnMap[db_type] = await DbConn.getConn(pool);
        }

        return dbConnMap;
    }

    protected static getConn(pool: Pool): Promise<PoolConnection> {
        return new Promise((resolved, rejected) => {
            pool.getConnection(function (err: MysqlError | null, conn: PoolConnection) {
                if (err) {
                    console.log("数据库连接出现异常:"+err.message);
                    rejected(null);
                } else {
                    resolved(conn);
                }
            });
        });
    }

    static releaseConn(db: DbConnMap) {
        for (let db_type in db) {
            db[db_type].release();
        }
    }

}