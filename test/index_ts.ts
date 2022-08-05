import {App, Context} from "../src";

App.any("/", async (ctx: Context) => {
    return "hello world";
});

App.run();