const {App} = require("../dist");

App.any("/", async (ctx) => {
    return "hello world";
});

App.run();