import DbPoolMap from "./DbPoolMap";
import * as mysql from "mysql";
import Env from "../env/Env";

export default class DbPool {

    protected db_pool_map!: DbPoolMap;

    protected static instance: DbPool;

    static getInstance = function (): DbPool {
        if (DbPool.instance) {
            return DbPool.instance;
        } else {
            DbPool.instance = new DbPool();
            return DbPool.instance;
        }
    }

    setPoolMap(db_pool_map: DbPoolMap) {
        this.db_pool_map = db_pool_map;
    }

    getPoolMap(){
        return this.db_pool_map;
    }

    run(){
        let db_source_list = [];

        let env = Env.getInstance().getParamMap();
        for(let k in env){
            let results = k.match(/db\.(\w+)/);
            if (results) db_source_list.push(results[1]);
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

        DbPool.getInstance().setPoolMap(db_pool_map);
    }

}
