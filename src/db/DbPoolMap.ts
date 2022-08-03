import {Pool} from "mysql";

export default class DbPoolMap {
    [index:string]: Pool
}