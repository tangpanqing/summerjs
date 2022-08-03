"use strict";
exports.__esModule = true;
var ShowObj_1 = require("../model/ShowObj");
var ShowHelper = /** @class */ (function () {
    function ShowHelper() {
    }
    ShowHelper.success = function (msg, data) {
        return new ShowObj_1["default"](200, msg, data);
    };
    ShowHelper.fail = function (msg) {
        return new ShowObj_1["default"](400, msg, null);
    };
    ShowHelper.info = function (code, msg, data) {
        return new ShowObj_1["default"](code, msg, data);
    };
    return ShowHelper;
}());
exports["default"] = ShowHelper;
