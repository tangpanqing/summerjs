import Request from "../request/Request";
import DbConnMap from "../db/DbConnMap";
import Response from "../response/Response";
import Db from "../db/Db";
import Verify from "../verify/Verify";
import * as fs from "fs";
import Route from "../route/Route";
import Hook from "../hook/Hook";

export default class Context {


    db_conn_map!: DbConnMap;
    request!: Request;
    response!: Response;
    err_list: string[] = [];

    response_code!:number;
    response_header!:any;

    static from(request: Request) {
        let ctx = new Context();
        ctx.request = request;
        //ctx.response = response;
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
    table(table_name: any, db_type: string = "primary"): Db {
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

    async runCommon(exception_handle:Function, content_type_map:any) {
        if (this.request.path?.indexOf(".") != -1) {
            return this.handle_static(content_type_map);
        } else {
            return await this.handle_request(exception_handle);
        }
    }

    handle_static(content_type_map:any) {
        let arr = this.request.path?.split(".") || [];
        let suffix = arr[arr.length - 1];
        let content_type = "";
        if (content_type_map[suffix]) content_type = content_type_map[suffix];

        let path = './public' + this.request.path;
        if (!fs.existsSync(path)) {
            this.writeHead(400, {'Content-type': "text/html;charset=utf8"})
            return "NOT FOUND";
        } else {
            this.writeHead(200, {'Content-type': content_type})
            return fs.readFileSync(path);
        }
    }

    async handle_request(exception_handle: Function) {
        let res_handle;
        try {
            //获取要执行的方法
            let handle = Route.getInstance().getHandle(this.request);

            //执行
            await Hook.getInstance().before(this);
            res_handle = await handle(this);
            res_handle = await Hook.getInstance().after(this, res_handle);

            //释放数据库连接,释放
            this.releaseConn();
        } catch (e) {
            if (exception_handle) {
                res_handle = exception_handle(e, this);
            } else {
                throw new Error(e);
            }
        }

        if (typeof (res_handle) == "object") {
            this.writeHead(200, {
                "Content-Type": "application/json;charset=utf8"
            });
            res_handle = JSON.stringify(res_handle);
        } else {
            this.writeHead(200, {
                "Content-Type": "text/html;charset=utf8"
            });
        }

        return res_handle;
    }


    writeHead(code: number, header: any) {
        this.response_code = code;
        this.response_header = header;
    }
}
