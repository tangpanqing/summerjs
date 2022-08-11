/// <reference types="node" />
import Request from "../request/Request";
import DbConnMap from "../db/DbConnMap";
import Db from "../db/Db";
export default class Context {
    db_conn_map: DbConnMap;
    request: Request;
    err_list: string[];
    response_cookie?: string;
    static from(request: Request): Context;
    getString(key: string, def?: string, verify_list?: string[], key_name?: string): string;
    getNumber(key: string, def?: number, verify_list?: string[], key_name?: string): number;
    verify(key: string, val: any, verify_list: string[] | undefined, key_name: string): void;
    getFile(key: string): any;
    setCookie(value: string): void;
    clearCookie(): void;
    table(table_name: any, db_type?: string): Db;
    query(sql: string, bind: any[], db_type?: string): Promise<any>;
    beginTransaction(db_type?: string): Promise<boolean>;
    commit(db_type?: string): Promise<boolean>;
    rollback(db_type?: string): Promise<boolean>;
    releaseConn(): void;
    runCommon(exception_handle: Function, content_type_map: any): Promise<any>;
    handle_static(content_type_map: any): Buffer | "NOT FOUND";
    handle_request(exception_handle: Function): Promise<any>;
}
//# sourceMappingURL=Context.d.ts.map