"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Verify = /** @class */ (function () {
    function Verify() {
    }
    Verify.separator = "|";
    Verify.tag_email = "email";
    Verify.tag_gt = "gt";
    Verify.tag_lt = "lt";
    Verify.tag_gte = "gte";
    Verify.tag_lte = "lte";
    Verify.tag_in = "in";
    Verify.tag_between = "between";
    Verify.tag_lengthEq = "lengthEq";
    Verify.tag_lengthGt = "lengthGt";
    Verify.tag_lengthLt = "lengthLt";
    Verify.tag_lengthGte = "lengthGte";
    Verify.tag_lengthLte = "lengthLte";
    Verify.tag_lengthIn = "lengthIn";
    Verify.tag_lengthBetween = "lengthBetween";
    Verify.tag_all = [
        Verify.tag_email,
        Verify.tag_gt,
        Verify.tag_lt,
        Verify.tag_gte,
        Verify.tag_lte,
        Verify.tag_in,
        Verify.tag_between,
        Verify.tag_lengthEq,
        Verify.tag_lengthGt,
        Verify.tag_lengthLt,
        Verify.tag_lengthGte,
        Verify.tag_lengthLte,
        Verify.tag_lengthIn,
        Verify.tag_lengthBetween,
    ];
    Verify.email = Verify.tag_email;
    Verify.matchEmail = function (rule) { return rule == Verify.email; };
    Verify.isEmail = function (val, rule) { return val.toString().indexOf("@") != -1; };
    Verify.errEmail = function (key_name, rule) { return key_name + "必须是邮箱格式"; };
    Verify.gt = function (count) { return Verify.tag_gt + Verify.separator + count.toString(); };
    Verify.matchGt = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_gt; };
    Verify.isGt = function (val, rule) { return Number(val) > Number(rule.split(Verify.separator)[1]); };
    Verify.errGt = function (key_name, rule) { return key_name + "必须大于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lt = function (count) { return Verify.tag_lt + Verify.separator + count.toString(); };
    Verify.matchLt = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lt; };
    Verify.isLt = function (val, rule) { return Number(val) < Number(rule.split(Verify.separator)[1]); };
    Verify.errLt = function (key_name, rule) { return key_name + "必须小于" + Number(rule.split(Verify.separator)[1]); };
    Verify.gte = function (count) { return Verify.tag_gte + Verify.separator + count.toString(); };
    Verify.matchGte = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_gte; };
    Verify.isGte = function (val, rule) { return Number(val) >= Number(rule.split(Verify.separator)[1]); };
    Verify.errGte = function (key_name, rule) { return key_name + "必须大于等于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lte = function (count) { return Verify.tag_lte + Verify.separator + count.toString(); };
    Verify.matchLte = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lte; };
    Verify.isLte = function (val, rule) { return Number(val) <= Number(rule.split(Verify.separator)[1]); };
    Verify.errLte = function (key_name, rule) { return key_name + "必须小于等于" + Number(rule.split(Verify.separator)[1]); };
    Verify.in = function () {
        var nums = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nums[_i] = arguments[_i];
        }
        return Verify.tag_in + Verify.separator + nums.join(Verify.separator);
    };
    Verify.matchIn = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_in; };
    Verify.isIn = function (val, rule) {
        var arr = rule.split(Verify.separator);
        arr.shift();
        return arr.indexOf(val.toString()) != -1;
    };
    Verify.errIn = function (key_name, rule) {
        var arr = rule.split(Verify.separator);
        arr.shift();
        return key_name + "必须在" + arr.join(",") + "之中";
    };
    Verify.between = function (min, max) { return Verify.tag_between + Verify.separator + min.toString() + Verify.separator + max.toString(); };
    Verify.matchBetween = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_between; };
    Verify.isBetween = function (val, rule) { return Number(val) >= Number(rule.split(Verify.separator)[1]) && val <= Number(rule.split(Verify.separator)[2]); };
    Verify.errBetween = function (key_name, rule) { return key_name + "必须大于等于" + Number(rule.split(Verify.separator)[1]) + "，并且小于等于" + Number(rule.split(Verify.separator)[2]); };
    Verify.lengthEq = function (count) { return Verify.tag_lengthEq + Verify.separator + count.toString(); };
    Verify.matchLengthEq = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthEq; };
    Verify.isLengthEq = function (val, rule) { return val.toString().length == Number(rule.split(Verify.separator)[1]); };
    Verify.errLengthEq = function (key_name, rule) { return key_name + "的长度必须等于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lengthGt = function (count) { return Verify.tag_lengthGt + Verify.separator + count.toString(); };
    Verify.matchLengthGt = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthGt; };
    Verify.isLengthGt = function (val, rule) { return val.toString().length > Number(rule.split(Verify.separator)[1]); };
    Verify.errLengthGt = function (key_name, rule) { return key_name + "的长度必须大于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lengthLt = function (count) { return Verify.tag_lengthLt + Verify.separator + count.toString(); };
    Verify.matchLengthLt = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthLt; };
    Verify.isLengthLt = function (val, rule) { return val.toString().length < Number(rule.split(Verify.separator)[1]); };
    Verify.errLengthLt = function (key_name, rule) { return key_name + "的长度必须小于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lengthGte = function (count) { return Verify.tag_lengthGte + Verify.separator + count.toString(); };
    Verify.matchLengthGte = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthGte; };
    Verify.isLengthGte = function (val, rule) { return val.toString().length >= Number(rule.split(Verify.separator)[1]); };
    Verify.errLengthGte = function (key_name, rule) { return key_name + "的长度必须大于等于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lengthLte = function (count) { return Verify.tag_lengthLte + Verify.separator + count.toString(); };
    Verify.matchLengthLte = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthLte; };
    Verify.isLengthLte = function (val, rule) { return val.toString().length <= Number(rule.split(Verify.separator)[1]); };
    Verify.errLengthLte = function (key_name, rule) { return key_name + "的长度必须小于等于" + Number(rule.split(Verify.separator)[1]); };
    Verify.lengthIn = function () {
        var nums = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            nums[_i] = arguments[_i];
        }
        return Verify.tag_lengthIn + Verify.separator + nums.join(Verify.separator);
    };
    Verify.matchLengthIn = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthIn; };
    Verify.isLengthIn = function (val, rule) {
        var arr = rule.split(Verify.separator);
        arr.shift();
        return arr.indexOf(val.length) != -1;
    };
    Verify.errLengthIn = function (key_name, rule) {
        var arr = rule.split(Verify.separator);
        arr.shift();
        return key_name + "的长度必须在" + arr.join(",") + "之中";
    };
    Verify.lengthBetween = function (min, max) { return Verify.tag_lengthBetween + Verify.separator + min.toString() + Verify.separator + max.toString(); };
    Verify.matchLengthBetween = function (rule) { return rule.split(Verify.separator)[0] == Verify.tag_lengthBetween; };
    Verify.isLengthBetween = function (val, rule) { return val.toString().length >= Number(rule.split(Verify.separator)[1]) && val.length <= Number(rule.split(Verify.separator)[2]); };
    Verify.errLengthBetween = function (key_name, rule) { return key_name + "的长度必须大于等于" + Number(rule.split(Verify.separator)[1]) + "，并且小于等于" + Number(rule.split(Verify.separator)[2]); };
    return Verify;
}());
exports.default = Verify;
