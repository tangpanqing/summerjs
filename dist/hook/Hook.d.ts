import Context from "../Context";
import HookItem from "./HookItem";
export default class Hook {
    static beforeFlag: string;
    static afterFlag: string;
    hooks: HookItem[];
    protected static instance: Hook;
    static getInstance: () => Hook;
    push(hook_type: string, hook_fun: Function): void;
    before(ctx: Context): Promise<Context>;
    after(ctx: Context, res_handle: object): Promise<object>;
}
//# sourceMappingURL=Hook.d.ts.map