import * as Handlebars from "handlebars";
import * as fs from "fs";

export default class View {

    static renderFile(path: string, param: any = null) {
        let content = fs.readFileSync("./view/" + path + ".html");
        let str = content.toString();
        let include_list = str.match(/\<include\>[A-Za-z0-9\/_]+\<\/include\>/g);
        if (include_list) {
            for (let i = 0; i < include_list.length; i++) {
                let v = include_list[i];
                let o = v.replace("<include>", "");
                o = o.replace("</include>", "");
                let o_content = fs.readFileSync("./view/" + o + ".html");
                str = str.replace(v, o_content.toString());
            }
        }

        const template = Handlebars.compile(str);
        return template(param);
    }

}