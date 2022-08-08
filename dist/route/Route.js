"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteItem_1 = require("./RouteItem");
var Route = /** @class */ (function () {
    function Route() {
        this.routes = [];
    }
    Route.prototype.push = function (method, path, call) {
        var routeItem = new RouteItem_1.default(method, path, call);
        this.routes.push(routeItem);
    };
    Route.prototype.isRouteMatch = function (route_method, req) {
        if (route_method == 'ANY')
            return true;
        if (route_method == req.method)
            return true;
        return false;
    };
    Route.prototype.isPathMatch = function (route_path, req) {
        if (route_path.indexOf("{") == -1) {
            return route_path == req.path;
        }
        else {
            var pre = route_path.replace(/{/g, "(?<").replace(/}/g, ">\\w+)");
            var matches = req.path.match(pre);
            if (null == matches)
                return false;
            if (matches[0] != matches.input)
                return false;
            for (var k in matches.groups) {
                var v = matches.groups[k];
                req.addParam(k, v);
            }
            return true;
        }
    };
    Route.prototype.getHandle = function (request) {
        var handle = function (ctx) { return "NOT FOUND"; };
        for (var i = 0; i < this.routes.length; i++) {
            var route = this.routes[i];
            if (this.isRouteMatch(route.method, request) && this.isPathMatch(route.path, request)) {
                handle = route.call;
                break;
            }
        }
        return handle;
    };
    Route.post = "POST";
    Route.get = "GET";
    Route.put = "PUT";
    Route.delete = "DELETE";
    Route.any = "ANY";
    Route.getInstance = function () {
        if (Route.instance) {
            return Route.instance;
        }
        else {
            Route.instance = new Route();
            return Route.instance;
        }
    };
    return Route;
}());
exports.default = Route;
