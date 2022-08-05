"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var Env = /** @class */ (function () {
    function Env() {
        this.param_map = {
            port: "5000"
        };
    }
    Env.prototype.load = function () {
        var env_file = ".env";
        if (fs.existsSync(env_file)) {
            var env = Env.getInstance();
            var content = fs.readFileSync(env_file).toString();
            var sep = this.getSep();
            var content_arr = content.split(sep);
            for (var key in content_arr) {
                var s = content_arr[key];
                var content_item = s.replace(" ", "");
                if ("" != content_item) {
                    var content_item_arr = content_item.split("=");
                    env.param_map[content_item_arr[0]] = content_item_arr[1];
                }
            }
        }
    };
    Env.prototype.getSep = function () {
        var sep = "\n";
        if (process.platform == "win32")
            sep = "\r\n";
        if (process.platform == "darwin")
            sep = "\r";
        return sep;
    };
    Env.prototype.getParamMap = function () {
        return this.param_map;
    };
    Env.prototype.getParam = function (key) {
        return this.param_map[key];
    };
    Env.getInstance = function () {
        if (Env.instance) {
            return Env.instance;
        }
        else {
            Env.instance = new Env();
            return Env.instance;
        }
    };
    return Env;
}());
exports.default = Env;
