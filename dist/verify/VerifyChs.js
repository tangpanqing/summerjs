"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VerifyChs = /** @class */ (function () {
    function VerifyChs() {
    }
    VerifyChs.errEmail = function (key_name) { return key_name + "必须是邮箱格式"; };
    VerifyChs.errGt = function (key_name, num) { return key_name + "必须大于" + num.toString(); };
    VerifyChs.errLt = function (key_name, num) { return key_name + "必须小于" + num.toString(); };
    VerifyChs.errGte = function (key_name, num) { return key_name + "必须大于等于" + num.toString(); };
    VerifyChs.errLte = function (key_name, num) { return key_name + "必须小于等于" + num.toString(); };
    VerifyChs.errIn = function (key_name, str) { return key_name + "必须在" + str + "之中"; };
    VerifyChs.errBetween = function (key_name, min, max) { return key_name + "必须大于等于" + min.toString() + "，并且小于等于" + max.toString(); };
    VerifyChs.errLengthGt = function (key_name, num) { return key_name + "的长度必须大于" + num.toString(); };
    VerifyChs.errLengthLt = function (key_name, num) { return key_name + "的长度必须小于" + num.toString(); };
    VerifyChs.errLengthGte = function (key_name, num) { return key_name + "的长度必须大于等于" + num.toString(); };
    VerifyChs.errLengthLte = function (key_name, num) { return key_name + "的长度必须小于等于" + num.toString(); };
    VerifyChs.errLengthIn = function (key_name, str) { return key_name + "的长度必须在" + str + "之中"; };
    VerifyChs.errLengthBetween = function (key_name, min, max) { return key_name + "的长度必须大于等于" + min.toString() + "，并且小于等于" + max.toString(); };
    return VerifyChs;
}());
exports.default = VerifyChs;
