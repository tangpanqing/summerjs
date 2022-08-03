import Context from "../Context";
import HookItem from "./HookItem";

export default class Hook {

    static beforeFlag: string = "BEFORE";
    static afterFlag: string = "AFTER";

    hooks = [] as HookItem[];

    static instance: Hook;

    static getInstance = function (): Hook {
        if (Hook.instance) {
            return Hook.instance;
        } else {
            Hook.instance = new Hook();
            return Hook.instance;
        }
    }

    push(hook_type: string, hook_fun: Function) {
        let hookItem = new HookItem(hook_type, hook_fun);
        this.hooks.push(hookItem);
    }

    async before(ctx: Context) {
        for (let i = 0; i < this.hooks.length; i++) {
            let this_hook = this.hooks[i];
            if (this_hook.type == Hook.beforeFlag) {
                ctx = await this_hook.call(ctx);
            }
        }

        return ctx;
    }

    async after(ctx: Context, res_handle: object) {
        for (let i = 0; i < this.hooks.length; i++) {
            let this_hook = this.hooks[i];
            if (this_hook.type == Hook.afterFlag) {
                res_handle = await this_hook.call(ctx, res_handle);
            }
        }

        return res_handle;
    }
}