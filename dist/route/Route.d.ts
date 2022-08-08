import Request from "../request/Request";
import RouteItem from "./RouteItem";
export default class Route {
    static post: string;
    static get: string;
    static put: string;
    static delete: string;
    static any: string;
    protected routes: RouteItem[];
    protected static instance: Route;
    static getInstance: () => Route;
    push(method: string, path: string, call: Function): void;
    isRouteMatch(route_method: string, req: Request): boolean;
    isPathMatch(route_path: string, req: Request): boolean;
    getHandle(request: Request): Function;
}
//# sourceMappingURL=Route.d.ts.map