import {MysqlError, PoolConnection} from "mysql";

export default class DbTrans {

    static async beginTransaction(conn: PoolConnection): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.beginTransaction((error: MysqlError) => DbTrans.transCall(error, resolved, rejected));
            });
        }

        return await handle(conn);
    }

    static async commit(conn: PoolConnection): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.commit((error: MysqlError) => DbTrans.transCall(error, resolved, rejected));
            });
        }

        return await handle(conn);
    }

    static async rollback(conn: PoolConnection): Promise<boolean> {
        let handle = (conn: PoolConnection): Promise<boolean> => {
            return new Promise((resolved, rejected) => {
                conn.rollback((error: MysqlError) => DbTrans.transCall(error, resolved, rejected));
            });
        }

        return await handle(conn);
    }

    protected static transCall(error: MysqlError, resolved:Function, rejected:Function) {
        if (error) {
            rejected(false);
        } else {
            resolved(true);
        }
    }

}