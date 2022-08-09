"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Handlebars = require("handlebars");
var fs_1 = require("fs");
var path = require("path");
var View = /** @class */ (function () {
    function View() {
    }
    View.renderFile = function (filePath, param) {
        if (param === void 0) { param = null; }
        var content = View.getFileContent(filePath);
        var str = content.toString();
        var include_list = str.match(/\<include\>[A-Za-z0-9\/_]+\<\/include\>/g);
        if (include_list) {
            for (var i = 0; i < include_list.length; i++) {
                var v = include_list[i];
                var o = v.replace("<include>", "");
                o = o.replace("</include>", "");
                var o_content = View.getFileContent(o);
                str = str.replace(v, o_content.toString());
            }
        }
        var template = Handlebars.compile(str);
        return template(param);
    };
    View.getFileContent = function (filePath) {
        var file = path.join(process.cwd(), 'view/' + filePath + '.html');
        var content = (0, fs_1.readFileSync)(file, 'utf8');
        return content;
    };
    return View;
}());
exports.default = View;
