import Request from "../request/Request";
import DbConnMap from "../db/DbConnMap";
import Response from "../response/Response";
import Db from "../db/Db";
import Verify from "../verify/Verify";

export default class Context {
    db_conn_map!: DbConnMap;
    request!: Request;
    response!: Response;
    err_list: string[] = [];

    static from(request: Request, response: Response) {
        let ctx = new Context();
        ctx.request = request;
        ctx.response = response;
        return ctx;
    }

    //请求相关
    getString(key: string, def: string = "", verify_list: string[] = [], key_name: string = ""): string {
        let val = this.request.getString(key, def);
        this.verify(key, val, verify_list, key_name);
        return val;
    }

    getNumber(key: string, def: number = 0, verify_list: string[] = [], key_name: string = ""): number {
        let val = this.request.getNumber(key, def);
        this.verify(key, val, verify_list, key_name);
        return val;
    }

    verify(key: string, val: any, verify_list: string[] = [], key_name: string) {
        if (verify_list.length > 0) {
            for (let i = 0; i < verify_list.length; i++) {
                let rule = verify_list[i];
                for (let j = 0; j < Verify.tag_all.length; j++) {
                    let item = Verify.tag_all[j];
                    item = item.slice(0, 1).toUpperCase() + item.slice(1);
                    // @ts-ignore
                    if (Verify["match" + item](rule) && !Verify["is" + item](val, rule)) this.err_list.push(Verify["err" + item](key_name != "" ? key_name : key, rule));
                }
            }
        }
    }

    getFile(key: string) {
        return this.request.getFile(key);
    }

    //响应相关
    setCookie(value: string) {
        this.response.setCookie(value);
    }

    clearCookie() {
        this.response.clearCookie();
    }

    //数据库相关
    table(table_name: string, db_type: string = "primary"): Db {
        return new Db().setContext(this).setDbType(db_type).table(table_name);
    }

    async query(sql: string, bind: any[], db_type: string = "primary"): Promise<any> {
        return await new Db().setContext(this).setDbType(db_type).query(sql, bind);
    }

    async beginTransaction(db_type: string = "primary"): Promise<boolean> {
        return await new Db().setContext(this).setDbType(db_type).beginTransaction();
    }

    async commit(db_type: string = "primary"): Promise<boolean> {
        return await new Db().setContext(this).setDbType(db_type).commit();
    }

    async rollback(db_type: string = "primary"): Promise<boolean> {
        return await new Db().setContext(this).setDbType(db_type).rollback();
    }

    releaseConn() {
        if (this.db_conn_map) Db.releaseConn(this.db_conn_map);
    }
}
