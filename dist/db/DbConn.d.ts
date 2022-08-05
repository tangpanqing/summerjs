import DbPoolMap from "./DbPoolMap";
import DbConnMap from "./DbConnMap";
import { Pool, PoolConnection } from "mysql";
export default class DbConn {
    static getDbConnMap(db_pool_map: DbPoolMap): Promise<DbConnMap>;
    protected static getConn(pool: Pool): Promise<PoolConnection>;
    static releaseConn(db: DbConnMap): void;
}
//# sourceMappingURL=DbConn.d.ts.map