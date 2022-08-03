"use strict";
exports.__esModule = true;
var RandHelper = /** @class */ (function () {
    function RandHelper() {
    }
    RandHelper.rand = function (min, max) {
        return min + Math.floor(Math.random() * (max - min));
    };
    return RandHelper;
}());
exports["default"] = RandHelper;
