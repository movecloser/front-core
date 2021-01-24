"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpDriver = void 0;
var response_1 = require("./response");
var HttpDriver = /** @class */ (function () {
    function HttpDriver(debug) {
        this._debug = !!debug;
    }
    /**
     * Perform delete http request.
     */
    HttpDriver.prototype.delete = function (target, data, headers, options) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this._call('delete', target, data, headers, options);
    };
    /**
     * Perform get http request.
     */
    HttpDriver.prototype.get = function (target, params, headers, options) {
        if (params === void 0) { params = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this._call('get', target, params, headers, options);
    };
    /**
     * Perform post http request.
     */
    HttpDriver.prototype.post = function (target, data, headers, options) {
        if (data === void 0) { data = {}; }
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this._call('post', target, data, headers, options);
    };
    /**
     * Perform put http request.
     */
    HttpDriver.prototype.put = function (target, data, headers, options) {
        if (headers === void 0) { headers = {}; }
        if (options === void 0) { options = null; }
        return this._call('put', target, data, headers, options);
    };
    HttpDriver.prototype._logResponse = function (target, method, status, request, response) {
        if (this._debug) {
            var toLog = {
                target: target, method: method, status: status, request: request, response: response
            };
            /* eslint no-console: off */
            console.log(toLog);
        }
    };
    HttpDriver.prototype.composeSuccessResponse = function (status, data, headers) {
        return new response_1.Response(status, data, headers);
    };
    HttpDriver.prototype.composeFailResponse = function (status, data, headers, errors) {
        return new response_1.Response(status, data, headers, errors);
    };
    return HttpDriver;
}());
exports.HttpDriver = HttpDriver;
