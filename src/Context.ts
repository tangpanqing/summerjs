import Request from "./request/Request";
import DbConnMap from "./db/DbConnMap";
import Response from "./response/Response";

export default class Context {
    db!: DbConnMap;
    request!: Request;
    response!: Response;

    getString(key: string, def: string = ""): string {
        return this.request.getString(key, def);
    }

    getFile(key: string) {
        if (this.request.files[key]) return this.request.files[key];
        return null;
    }

    setCookie(value: string) {
        this.response.setCookie(value);
    }
}
