export default class DbWhereItem {
    key: string;
    opt: string;
    val: any;

    constructor(key: string, opt: string, val: any) {
        this.key = key;
        this.opt = opt;
        this.val = val;
    }
}