import Request from "./request/Request";
import DbConnMap from "./db/DbConnMap";
import Response from "./response/Response";
import Db from "./db/Db";
export default class Context {
    db_conn_map: DbConnMap;
    request: Request;
    response: Response;
    err_list: string[];
    static from(request: Request, response: Response): Context;
    getString(key: string, def?: string, verify_list?: string[], key_name?: string): string;
    getNumber(key: string, def?: number, verify_list?: string[], key_name?: string): number;
    verify(key: string, val: any, verify_list: string[] | undefined, key_name: string): void;
    getFile(key: string): any;
    setCookie(value: string): void;
    clearCookie(): void;
    table(table_name: string, db_type?: string): Db;
    query(sql: string, bind: any[], db_type?: string): Promise<any>;
    beginTransaction(db_type?: string): Promise<boolean>;
    commit(db_type?: string): Promise<boolean>;
    rollback(db_type?: string): Promise<boolean>;
    releaseConn(): void;
}
//# sourceMappingURL=Context.d.ts.map