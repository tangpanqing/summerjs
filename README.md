# summerjs
a backend framework for js/ts developer

## how to use
you can use npm command like this to install summerjs
```
npm i summerjs
```
then create js file, like index.js, type some code
```
const {App} = require("summerjs")

App.any("/", async (ctx) => "hello world");

App.run();
```
then run index.js in your terminal
```
node index.js
```
then you will get some info like this
```
server is running at 5000
```
that ok, open your browser, visit http://localhost:5000, you will see
```
hello world
```
yes, it is. enjoy.