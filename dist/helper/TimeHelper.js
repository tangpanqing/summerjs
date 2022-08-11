"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeHelper = /** @class */ (function () {
    function TimeHelper() {
    }
    TimeHelper.time = function () {
        var timestamp = new Date().getTime();
        return Math.floor(timestamp / 1000);
    };
    TimeHelper.milliTime = function () {
        var timestamp = new Date().getTime();
        return timestamp;
    };
    return TimeHelper;
}());
exports.default = TimeHelper;
