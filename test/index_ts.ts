// import {App, Context} from "../src";
//
// App.any("/", async (ctx: Context) => {
//     return "hello world";
// });
//
// App.run();




import StringHelper from "../src/helper/StringHelper";

class User{}
class UserBlog{}

let user = new User();
console.log(user.constructor.name);
console.log(StringHelper.toLine(user.constructor.name));

let userBlog = new UserBlog();
console.log(userBlog.constructor.name);
console.log(StringHelper.toLine(userBlog.constructor.name));