"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteItem = /** @class */ (function () {
    function RouteItem(method, path, call) {
        this.method = method;
        this.path = path;
        this.call = call;
    }
    return RouteItem;
}());
exports.default = RouteItem;
