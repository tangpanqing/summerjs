import ShowObj from "../model/ShowObj";
export default class ShowHelper {
    static success<T>(msg: string, data: T): ShowObj<T>;
    static fail(msg: string): ShowObj<null>;
    static info<T>(code: number, msg: string, data: T): ShowObj<T>;
}
//# sourceMappingURL=ShowHelper.d.ts.map