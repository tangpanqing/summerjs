"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var qs = require("qs");
var url = require("url");
var multiparty = require("multiparty");
//const multiparty = require('multiparty');
var Request = /** @class */ (function () {
    function Request() {
        this.path = "";
        this.method = "";
        this.param = {};
        this.files = {};
    }
    Request.fromCommon = function (req) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var o, urlObj, k, parsePostData, postObj, arr, _e, _f, _g, _h, handle_call, call_res, k, k, k, cookieArr, k, arr;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        o = new Request();
                        o.method = (_a = req.method) !== null && _a !== void 0 ? _a : "";
                        o.param = {};
                        urlObj = url.parse((_b = req.url) !== null && _b !== void 0 ? _b : "", true);
                        o.path = (_c = urlObj.pathname) !== null && _c !== void 0 ? _c : "";
                        for (k in urlObj.query) {
                            o.addParam(k, urlObj.query[k]);
                        }
                        if (!(req.method === 'POST')) return [3 /*break*/, 7];
                        parsePostData = function () {
                            return new Promise(function (resolve, reject) {
                                var postData = '';
                                req.on('data', function (chunk) { return postData += chunk.toString(); });
                                req.on('end', function () { return resolve(postData); });
                            });
                        };
                        postObj = void 0;
                        if (!req.headers["content-type"]) return [3 /*break*/, 6];
                        arr = req.headers["content-type"].split(";");
                        if (!(arr[0] == "application/x-www-form-urlencoded")) return [3 /*break*/, 2];
                        _f = (_e = qs).parse;
                        return [4 /*yield*/, parsePostData()];
                    case 1:
                        postObj = _f.apply(_e, [_j.sent()]);
                        _j.label = 2;
                    case 2:
                        if (!(arr[0] == "application/json")) return [3 /*break*/, 4];
                        _h = (_g = JSON).parse;
                        return [4 /*yield*/, parsePostData()];
                    case 3:
                        postObj = _h.apply(_g, [_j.sent()]);
                        _j.label = 4;
                    case 4:
                        if (!(arr[0] == "multipart/form-data")) return [3 /*break*/, 6];
                        handle_call = function (req) {
                            return new Promise(function (resolve, reject) {
                                var form = new multiparty.Form();
                                form.parse(req, function (err, fields, files) {
                                    resolve({ fields: fields, files: files });
                                });
                            });
                        };
                        return [4 /*yield*/, handle_call(req)];
                    case 5:
                        call_res = _j.sent();
                        if (call_res.fields) {
                            for (k in call_res.fields) {
                                o.addParam(k, call_res.fields[k][0]);
                            }
                        }
                        if (call_res.files) {
                            for (k in call_res.files) {
                                o.files[k] = call_res.files[k][0];
                            }
                        }
                        _j.label = 6;
                    case 6:
                        for (k in postObj) {
                            o.addParam(k, postObj[k]);
                        }
                        _j.label = 7;
                    case 7:
                        o.cookie = (_d = req.headers.cookie) !== null && _d !== void 0 ? _d : "";
                        if (o.cookie != "") {
                            cookieArr = o.cookie.split(";");
                            for (k in cookieArr) {
                                arr = cookieArr[k].trim().split("=");
                                o.addParam(arr[0], arr[1]);
                            }
                        }
                        return [2 /*return*/, o];
                }
            });
        });
    };
    Request.prototype.addParam = function (key, val) {
        this.param[key] = val;
    };
    Request.prototype.setParam = function (val) {
        this.param = val;
    };
    Request.prototype.getParam = function (val) {
        return this.param;
    };
    Request.prototype.getString = function (key, def) {
        if (def === void 0) { def = ""; }
        if (this.param.hasOwnProperty(key)) {
            return this.param[key] + "";
        }
        return def;
    };
    Request.prototype.getCookie = function () {
        return this.cookie;
    };
    return Request;
}());
exports["default"] = Request;
