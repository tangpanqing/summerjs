"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringHelper = /** @class */ (function () {
    function StringHelper() {
    }
    StringHelper.toHump = function (name) {
        return name.replace(/\_(\w)/g, function (all, letter) {
            return letter.toUpperCase();
        });
    };
    StringHelper.toLine = function (name) {
        var str = name.replace(/([A-Z])/g, "_$1").toLowerCase();
        if (str.slice(0, 1) == "_")
            str = str.slice(1);
        return str;
    };
    return StringHelper;
}());
exports.default = StringHelper;
