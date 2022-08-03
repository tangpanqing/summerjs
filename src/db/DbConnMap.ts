import {PoolConnection} from "mysql";

export default class DbConnMap {
    [index:string]: PoolConnection
}