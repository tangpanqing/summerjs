"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TimeHelper = /** @class */ (function () {
    function TimeHelper() {
    }
    TimeHelper.time = function () {
        var timestamp = new Date().getTime();
        return Math.floor(timestamp / 1000);
    };
    return TimeHelper;
}());
exports.default = TimeHelper;
