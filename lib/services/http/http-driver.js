"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpDriver = void 0;
const response_1 = require("./response");
class HttpDriver {
    constructor(debug) {
        this._debug = !!debug;
    }
    /**
     * Perform delete http request.
     */
    delete(target, data = {}, headers = {}, options = null) {
        return this._call('delete', target, data, headers, options);
    }
    /**
     * Perform get http request.
     */
    get(target, params = {}, headers = {}, options = null) {
        return this._call('get', target, params, headers, options);
    }
    /**
     * Perform post http request.
     */
    post(target, data = {}, headers = {}, options = null) {
        return this._call('post', target, data, headers, options);
    }
    /**
     * Perform put http request.
     */
    put(target, data, headers = {}, options = null) {
        return this._call('put', target, data, headers, options);
    }
    _logResponse(target, method, status, request, response) {
        if (this._debug) {
            let toLog = {
                target, method, status, request, response
            };
            /* eslint no-console: off */
            console.log(toLog);
        }
    }
    composeSuccessResponse(status, data, headers) {
        return new response_1.Response(status, data, headers);
    }
    composeFailResponse(status, data, headers, errors) {
        return new response_1.Response(status, data, headers, errors);
    }
}
exports.HttpDriver = HttpDriver;
