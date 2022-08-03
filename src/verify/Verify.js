"use strict";
exports.__esModule = true;
var Verify = /** @class */ (function () {
    function Verify() {
    }
    Verify.max = function (count) {
        return "max:" + count.toString();
    };
    Verify.required = "required";
    Verify.email = "email";
    return Verify;
}());
exports["default"] = Verify;
