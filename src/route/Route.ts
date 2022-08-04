import Context from "../Context";
import Request from "../request/Request";
import RouteItem from "./RouteItem";

export default class Route {
    static post: string = "POST";
    static get: string = "GET";
    static any: string = "ANY";

    routes = [] as RouteItem[];

    protected static instance: Route;

    static getInstance = function (): Route {
        if (Route.instance) {
            return Route.instance;
        } else {
            Route.instance = new Route();
            return Route.instance;
        }
    }

    push(method: string, path: string, call: Function) {
        let routeItem = new RouteItem(method, path, call);
        this.routes.push(routeItem);
    }

    isRouteMatch(route_method: string, req: Request): boolean {
        if (route_method == 'ANY') return true;
        if (route_method == req.method) return true;
        return false;
    }

    isPathMatch(route_path: string, req: Request): boolean {
        if (route_path.indexOf("{") == -1) {
            return route_path == req.path;
        } else {
            let pre = route_path.replace(/{/g, "(?<").replace(/}/g, ">\\w+)");

            let matches = req.path.match(pre);
            if (null == matches) return false;
            if (matches[0] != matches.input) return false;

            for (let k in matches.groups) {
                let v = matches.groups[k];
                req.addParam(k, v);
            }

            return true;
        }
    }

    getHandle(request: Request): Function {
        let handle: Function = (ctx: Context) => "NOT FOUND";

        for (let i = 0; i < this.routes.length; i++) {
            let route = this.routes[i];

            if (this.isRouteMatch(route.method, request) && this.isPathMatch(route.path, request)) {
                handle = route.call;
                break;
            }
        }
        return handle;
    }

}
