/// <reference types="node" />
import { ServerResponse } from "http";
export default class Response {
    res: ServerResponse;
    static fromCommon(res: ServerResponse): Promise<Response>;
    setCookie(value: string): void;
    clearCookie(): void;
}
//# sourceMappingURL=Response.d.ts.map