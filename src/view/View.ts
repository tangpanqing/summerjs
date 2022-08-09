import * as Handlebars from "handlebars";
import {readFileSync} from "fs";
import * as path from "path";

export default class View {

    static renderFile(filePath: string, param: any = null) {
        let content = View.getFileContent(filePath);

        let str = content.toString();
        let include_list = str.match(/\<include\>[A-Za-z0-9\/_]+\<\/include\>/g);
        if (include_list) {
            for (let i = 0; i < include_list.length; i++) {
                let v = include_list[i];
                let o = v.replace("<include>", "");
                o = o.replace("</include>", "");
                let o_content = View.getFileContent(o);
                str = str.replace(v, o_content.toString());
            }
        }

        const template = Handlebars.compile(str);
        return template(param);
    }

    protected static getFileContent(filePath: string) {
        let file = path.join(process.cwd(), 'view/' + filePath + '.html');

        let content = readFileSync(file, 'utf8');

        return content;
    }

}