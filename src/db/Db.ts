import {MysqlError, PoolConnection} from "mysql";
import DbPoolMap from "./DbPoolMap";
import DbConnMap from "./DbConnMap";
import DbConn from "./DbConn";
import DbWhereItem from "./DbWhereItem";
import DbPool from "./DbPool";
import Context from "../context/Context";
import * as Assert from "assert";

export default class Db {
    ctx!: Context;
    db_type!: string;
    condition: any = {
        table_name: "",
        field_name: "",
        order_by: "",
        where_list: []
    };

    setContext(ctx: Context) {
        this.ctx = ctx;
        return this;
    }

    setDbType(db_type: string) {
        this.db_type = db_type;
        return this;
    }

    async beginTransaction(): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.beginTransaction((error: MysqlError) => this.transCall(error, resolved, rejected));
            });
        }

        return await handle(await this.getConn());
    }

    async commit(): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.commit((error: MysqlError) => this.transCall(error, resolved, rejected));
            });
        }

        return await handle(await this.getConn());
    }

    async rollback(): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.rollback((error: MysqlError) => this.transCall(error, resolved, rejected));
            });
        }

        return await handle(await this.getConn());
    }

    async getConn() {
        if (typeof this.ctx.db_conn_map == "undefined") {
            let db_pool_map = DbPool.getInstance().getPoolMap();
            this.ctx.db_conn_map = await Db.getDbConnMap(db_pool_map);
        }

        return this.ctx.db_conn_map[this.db_type];
    }

    transCall(error: MysqlError, resolved: Function, rejected: Function) {
        if (error) {
            rejected(false);
        } else {
            resolved(true);
        }
    }

    table(table_name: string) {
        this.condition.table_name = table_name;
        return this;
    }

    static async getDbConnMap(db_pool_map: DbPoolMap): Promise<DbConnMap> {
        return await DbConn.getDbConnMap(db_pool_map);
    }

    static releaseConn(db: DbConnMap) {
        DbConn.releaseConn(db)
    };

    field(f: string) {
        this.condition.field_name = f;
        return this;
    }

    where(obj: object) {
        return this.whereEq(obj);
    }

    whereEq(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '=', obj[k])));
        return this;
    }

    whereNotEq(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '!=', obj[k])));
        return this;
    }

    whereIn(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'IN', obj[k])));
        return this;
    }

    whereNotIn(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'NOT IN', obj[k])));
        return this;
    }

    whereBetween(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'BETWEEN', obj[k])));
        return this;
    }

    whereNotBetween(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'NOT BETWEEN', obj[k])));
        return this;
    }

    whereLike(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'LIKE', obj[k])));
        return this;
    }

    whereNotLike(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, 'NOT LIKE', obj[k])));
        return this;
    }

    whereLt(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '<', obj[k])));
        return this;
    }

    whereLte(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '<=', obj[k])));
        return this;
    }

    whereGt(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '>', obj[k])));
        return this;
    }

    whereGte(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.condition.where_list.push(new DbWhereItem(k, '>=', obj[k])));
        return this;
    }

    orderBy(order_by: string) {
        this.condition.order_by = order_by;
        return this;
    }

    protected whereCommon(obj: any, call: Function) {
        for (let k in obj) {
            if (typeof (obj[k]) != "undefined" && typeof (obj[k]) != "function") {
                call(k, obj);
            }
        }
    }

    protected handleWhere(bind: any[]) {
        if (this.condition.where_list.length == 0) return "";

        let join = [];
        for (let k in this.condition.where_list) {
            let v = this.condition.where_list[k];

            if (v.opt == "IN" || v.opt == "NOT IN") {
                let f = [];
                for (let i = 0; i < v.val.length; i++) {
                    f.push("?");
                }

                join.push(v.key + " " + v.opt + " " + '(' + f.join(',') + ')');

                for (let kk in v.val) {
                    bind.push(v.val[kk]);
                }

                break;
            }

            if (v.opt == "BETWEEN" || v.opt == "NOT BETWEEN") {
                let f = [];
                for (let i = 0; i < v.val.length; i++) {
                    f.push("?");
                }

                join.push(v.key + " " + v.opt + " " + f.join(' AND '));

                for (let kk in v.val) {
                    bind.push(v.val[kk]);
                }

                break;
            }

            // if (v.opt == "LIKE" || v.opt == "NOT LIKE") {
            //     $val = str_replace("%", "", $v->val);
            //     $val_str = str_replace($val, "?", $v->val);
            //     $val_arr = str_split($val_str);
            //     foreach ($val_arr as &$n) if ($n == "%") $n = "'" . $n . "'";
            //
            //     $join[] = $v->key . " " . $v->opt . " " . "CONCAT(" . join(",", $val_arr) . ")";
            //     $bind[] = $val;
            //     break;
            // }

            join.push(v.key + v.opt + '?');
            bind.push(v.val);
        }

        return " WHERE " + join.join(" AND ");
    }

    protected handleField() {
        return this.condition.field_name;
    }

    protected handleGroup() {
        return "";
    }

    protected handleOrder() {
        if (this.condition.order_by == "") return "";
        return " ORDER BY " + this.condition.order_by;
    }

    protected handleLimit() {
        return "";
    }

    query(sql: string, bind: any[]): Promise<any | null> {
        return new Promise(async (resolved, rejected) => {
            let conn = await this.getConn();
            conn.query(sql, bind, function (error: MysqlError | null, results: object) {
                if (error) {
                    console.log("发生异常:" + error.sqlMessage);
                    resolved(null);
                } else {
                    resolved(results);
                }
            });
        });
    }

    async insert(obj: any): Promise<number> {
        let key = [];
        let val = [];
        let bind = [] as any[];

        for (let k in obj) {
            let v = obj[k];
            if (typeof (v) !== "undefined" && typeof (v) !== "function") {
                key.push(k);
                val.push("?");
                bind.push(v);
            }
        }

        let sql = "INSERT INTO " + this.condition.table_name + " (" + key.join(",") + ") VALUES (" + val.join(",") + ")";
        let res = await this.query(sql, bind);
        Assert(null !== res, "插入失败");

        return res.insertId;
    }

    async findOne<T>(type: (new () => T)): Promise<T | null> {
        let res_list = await this.findCommon();
        if (res_list === null) return null;
        if (res_list.length == 0) return null;

        let res = res_list[0];

        let o = new type();
        for (let k in o) {
            if (typeof (res[k]) != "undefined") {
                o[k] = res[k];
            }
        }

        return o;
    }

    async findAll<T>(type: (new () => T)): Promise<T[] | null> {
        let res_list = await this.findCommon();
        if (res_list === null) return null;

        let o_list = [];
        for (let k in res_list) {
            let res = res_list[k];

            let o = new type();
            for (let k in o) {
                if (typeof (res[k]) != "undefined") {
                    o[k] = res[k];
                }
            }
            o_list.push(o);
        }

        return o_list;
    }

    async count(field_name: string = "*"): Promise<number | null> {
        field_name = "count(" + field_name + ")";
        this.field(field_name);
        let res_list = await this.findCommon();
        if (res_list === null) return null;

        return res_list[0][field_name];
    }

    async findCommon(): Promise<any | null> {
        let bind = [] as any[];
        let sql = "SELECT " + this.handleField() + " FROM " + this.condition.table_name + this.handleWhere(bind) + this.handleGroup() + this.handleOrder() + this.handleLimit();

        let list = await this.query(sql, bind);
        if (null === list) return null;

        return list;
    }

    async update(obj: any): Promise<number | null> {
        let key = [];
        let bind = [] as any[];
        for (let k in obj) {
            let v = obj[k];
            if (typeof (v) != "undefined" && typeof (v) != "function") {
                key.push(k + "=?");
                bind.push(v);
            }
        }

        let sql = "UPDATE " + this.condition.table_name + " SET " + key.join(',') + this.handleWhere(bind);
        let res = await this.query(sql, bind);
        if (null === res) return null;

        return res.affectedRows;
    }

    async delete(): Promise<number | null> {
        if (this.condition.where_list.length == 0) throw new Error("删除条件不能为空");

        let bind = [] as any[];
        let sql = "DELETE FROM " + this.condition.table_name + this.handleWhere(bind);

        let res = await this.query(sql, bind);
        if (null === res) return null;

        return res.affectedRows;
    }
}