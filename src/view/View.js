"use strict";
exports.__esModule = true;
var Handlebars = require("handlebars");
var fs = require("fs");
var View = /** @class */ (function () {
    function View() {
    }
    View.renderFile = function (path, param) {
        if (param === void 0) { param = null; }
        var content = fs.readFileSync("./view/" + path + ".html");
        var str = content.toString();
        var include_list = str.match(/\<include\>[A-Za-z0-9\/_]+\<\/include\>/g);
        if (include_list) {
            for (var i = 0; i < include_list.length; i++) {
                var v = include_list[i];
                var o = v.replace("<include>", "");
                o = o.replace("</include>", "");
                var o_content = fs.readFileSync("./view/" + o + ".html");
                str = str.replace(v, o_content.toString());
            }
        }
        var template = Handlebars.compile(str);
        return template(param);
    };
    return View;
}());
exports["default"] = View;
