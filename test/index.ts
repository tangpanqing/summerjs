import * as Assert from "assert";
import {App, Context, Verify as v, TimeHelper, ShowHelper, RandHelper} from "../src";

App.any("/", async (ctx: Context) => {
    //let email = ctx.getString("email", "", [v.email], "邮箱地址");
    //let user_name = ctx.getString("user_name", "", [v.lengthBetween(10, 20)], "用户名称");
    let user_type = ctx.getNumber("user_type", 0, [v.in(1, 2, 3, 4)]);
    Assert(ctx.err_list.length == 0, ctx.err_list.join("|"));

    // let user_no = TimeHelper.time() + "01" + RandHelper.rand(1000, 9999);
    // await ctx.beginTransaction();
    // let id = await ctx.table("d_user").insert({user_no});
    // Assert(null != id, "保存失败");
    // await ctx.commit();

    return "hello world";
});

App.exception((e: Error, ctx: Context) => ShowHelper.fail(e.message));

App.run();