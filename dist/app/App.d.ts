import Context from "../context/Context";
export default class App {
    protected static content_type_map: any;
    /**
     * global exception handle function
     */
    static exception_handle: Function;
    /**
     * hook before request main function
     * @param call handle function {Function}
     */
    static before(call: Function): void;
    /**
     * hook after request main function
     * @param call handle function {Function}
     */
    static after(call: Function): void;
    /**
     * handle request if the request method is POST
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static post(path: string, call: Function): void;
    /**
     * handle request if the request method is GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static get(path: string, call: Function): void;
    /**
     * handle request if the request method is PUT
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static put(path: string, call: Function): void;
    /**
     * handle request if the request method is DELETE
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static delete(path: string, call: Function): void;
    /**
     * handle request if the request method is POST|GET
     * @param path request path {string}
     * @param call handle function {Function}
     */
    static any(path: string, call: Function): void;
    /**
     * schedule task
     * @param period time period {string}
     * @param param param {any}
     * @param call handle function {Function}
     */
    static cron(period: string, param: any, call: Function): void;
    /**
     * set global exception handle function
     * @param call handle function {Function}
     */
    static exception(call: Function): void;
    /**
     * get all content type that application can support
     */
    static getContentType(): any;
    /**
     * add new content type for application
     * @param suffix file suffix {string}
     * @param content_type content type {string}
     */
    static addContentType(suffix: string, content_type: string): void;
    /**
     * before run the application
     */
    static runBefore(): void;
    static runCommon(ctx: Context): Promise<any>;
    /**
     * run the application
     */
    static run(port?: number): void;
}
//# sourceMappingURL=App.d.ts.map