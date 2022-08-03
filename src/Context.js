"use strict";
exports.__esModule = true;
var Context = /** @class */ (function () {
    function Context() {
    }
    Context.prototype.getString = function (key, def) {
        if (def === void 0) { def = ""; }
        return this.request.getString(key, def);
    };
    Context.prototype.getFile = function (key) {
        if (this.request.files[key])
            return this.request.files[key];
        return null;
    };
    Context.prototype.setCookie = function (value) {
        this.response.setCookie(value);
    };
    return Context;
}());
exports["default"] = Context;
