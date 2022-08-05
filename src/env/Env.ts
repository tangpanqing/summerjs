import * as fs from "fs";

export default class Env {
    protected param_map: any = {};

    protected static instance: Env;

    static getInstance = function (): Env {
        if (Env.instance) {
            return Env.instance;
        } else {
            Env.instance = new Env();
            return Env.instance;
        }
    }

    load() {
        let env_file = ".env";
        if (fs.existsSync(env_file)) {
            let env = Env.getInstance();
            let content = fs.readFileSync(env_file).toString();
            let sep = this.getSep();
            let content_arr = content.split(sep);
            for (let key in content_arr) {
                let s = content_arr[key];
                let content_item = s.replace(" ", "");
                if ("" != content_item) {
                    let content_item_arr = content_item.split("=");
                    env.param_map[content_item_arr[0]] = content_item_arr[1]
                }
            }
        }
    }

    protected getSep(){
        let sep = "\n";
        if (process.platform == "win32") sep = "\r\n";
        if (process.platform == "darwin") sep = "\r";
        return sep;
    }

    getParamMap(){
        return this.param_map;
    }

    getParam(key:string){
        return this.param_map[key];
    }
}