import DbPoolMap from "./DbPoolMap";
import DbConnMap from "./DbConnMap";
import {MysqlError, Pool, PoolConnection} from "mysql";

export default class DbConn {

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