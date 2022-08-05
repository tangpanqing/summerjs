import DbPoolMap from "./DbPoolMap";
export default class DbPool {
    protected db_pool_map: DbPoolMap;
    protected static instance: DbPool;
    static getInstance: () => DbPool;
    setPoolMap(db_pool_map: DbPoolMap): void;
    getPoolMap(): DbPoolMap;
    run(): void;
}
//# sourceMappingURL=DbPool.d.ts.map