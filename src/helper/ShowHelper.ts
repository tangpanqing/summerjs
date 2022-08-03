import ShowObj from "../model/ShowObj";

export default class ShowHelper {

    static success<T>(msg: string, data: T): ShowObj<T> {
        return new ShowObj<T>(200, msg, data);
    }

    static fail(msg: string): ShowObj<null> {
        return new ShowObj(400, msg, null);
    }

    static info<T>(code: number, msg: string, data: T): ShowObj<T> {
        return new ShowObj<T>(code, msg, data);
    }
}