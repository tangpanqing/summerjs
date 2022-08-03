import {MysqlError, PoolConnection} from "mysql";
import DbPoolMap from "./DbPoolMap";
import DbConnMap from "./DbConnMap";
import DbTrans from "./DbTrans";
import DbConn from "./DbConn";
import DbWhereItem from "./DbWhereItem";

export default class Db {
    conn!: PoolConnection;
    table_name!: string;
    field_name: string = "*";
    where_list: DbWhereItem[] = [];

    static getDbPoolMap(): DbPoolMap {
        return DbConn.getDbPoolMap();
    }

    static async getDbConnMap(db_pool_map: DbPoolMap): Promise<DbConnMap> {
        return await DbConn.getDbConnMap(db_pool_map);
    }

    static releaseConn(db: DbConnMap) {
        DbConn.releaseConn(db)
    };

    static async beginTransaction(conn: PoolConnection): Promise<boolean> {
        return await DbTrans.beginTransaction(conn);
    }

    static async commit(conn: PoolConnection): Promise<boolean> {
        return await DbTrans.commit(conn);
    }

    static async rollback(conn: PoolConnection): Promise<boolean> {
        return await DbTrans.rollback(conn);
    }

    static table(conn: PoolConnection, table_name: string) {
        let db = new Db();
        db.conn = conn;
        db.table_name = table_name;
        return db;
    }

    field(f: string) {
        this.field_name = f;
        return this;
    }

    where(obj: object) {
        return this.whereEq(obj);
    }

    whereEq(obj: any) {
        this.whereCommon(obj, (k: string, obj: any) => this.where_list.push(new DbWhereItem(k, '=', obj[k])));
        return this;
    }

    // whereNotEq(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '!=', obj[k])));
    //     return this;
    // }
    //
    // whereIn(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'IN', obj[k])));
    //     return this;
    // }
    //
    // whereNotIn(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT IN', obj[k])));
    //     return this;
    // }
    //
    // whereBetween(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'BETWEEN', obj[k])));
    //     return this;
    // }
    //
    // whereNotBetween(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT BETWEEN', obj[k])));
    //     return this;
    // }
    //
    // whereLike(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'LIKE', obj[k])));
    //     return this;
    // }
    //
    // whereNotLike(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, 'NOT LIKE', obj[k])));
    //     return this;
    // }
    //
    // whereLt(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '<', obj[k])));
    //     return this;
    // }
    //
    // whereLte(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '<=', obj[k])));
    //     return this;
    // }
    //
    // whereGt(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '>', obj[k])));
    //     return this;
    // }
    //
    // whereGte(obj: object) {
    //     this.whereCommon(obj, (k: string, obj: object) => this.where_list.push(new DbWhereItem(k, '>=', obj[k])));
    //     return this;
    // }

    protected whereCommon(obj: any, call: Function) {
        for (let k in obj) {
            if (typeof (obj[k]) != "undefined" && typeof (obj[k]) != "function") {
                call(k, obj);
            }
        }
    }

    protected handleWhere(bind: any[]) {
        if (this.where_list.length == 0) return "";

        let join = [];
        for (let k in this.where_list) {
            let v = this.where_list[k];

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
        return this.field_name;
    }

    protected handleGroup() {
        return "";
    }

    protected handleOrder() {
        return "";
    }

    protected handleLimit() {
        return "";
    }

    query(sql: string, bind: any[]): Promise<any | null> {
        return new Promise((resolved, rejected) => {
            this.conn.query(sql, bind, function (error: MysqlError | null, results: object) {
                if (error) {
                    console.log("发生异常:" + error.sqlMessage);
                    resolved(null);
                } else {
                    resolved(results);
                }
            });
        });
    }

    async insert(obj: any): Promise<number | null> {
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

        let sql = "INSERT INTO " + this.table_name + " (" + key.join(",") + ") VALUES (" + val.join(",") + ")";
        let res = await this.query(sql, bind);
        if (null === res) return null;

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
        let sql = "SELECT " + this.handleField() + " FROM " + this.table_name + this.handleWhere(bind) + this.handleGroup() + this.handleOrder() + this.handleLimit();

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

        let sql = "UPDATE " + this.table_name + " SET " + key.join(',') + this.handleWhere(bind);
        let res = await this.query(sql, bind);
        if (null === res) return null;

        return res.affectedRows;
    }

    async delete(): Promise<number | null> {
        if (this.where_list.length == 0) throw new Error("删除条件不能为空");

        let bind = [] as any[];
        let sql = "DELETE FROM " + this.table_name + this.handleWhere(bind);

        console.log(sql);
        console.log(bind);

        let res = await this.query(sql, bind);
        if (null === res) return null;

        return res.affectedRows;
    }
}