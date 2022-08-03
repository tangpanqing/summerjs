"use strict";
exports.__esModule = true;
var TimeHelper = /** @class */ (function () {
    function TimeHelper() {
    }
    TimeHelper.time = function () {
        var timestamp = new Date().getTime();
        return Math.floor(timestamp / 1000);
    };
    return TimeHelper;
}());
exports["default"] = TimeHelper;
