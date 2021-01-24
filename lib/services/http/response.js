"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
/**
 * Response class is responsible for delivering response from http request.
 *
 * @author Łukasz sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
var Response = /** @class */ (function () {
    function Response(status, data, headers, errors) {
        if (headers === void 0) { headers = {}; }
        if (errors === void 0) { errors = null; }
        this.status = status;
        this.data = data;
        this.errors = errors;
        this.headers = headers;
    }
    /**
     * Determine if response has any errors.
     */
    Response.prototype.hasErrors = function () {
        if (this.errors === null) {
            return false;
        }
        return (Array.isArray(this.errors) && this.errors.length > 0) ||
            (typeof this.errors === 'object' && Object.values(this.errors).length > 0);
    };
    /**
     * Determine if response is successful.
     */
    Response.prototype.isSuccessful = function () {
        return this.status >= 200 && this.status < 300;
    };
    return Response;
}());
exports.Response = Response;
