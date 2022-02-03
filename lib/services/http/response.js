"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
/**
 * Response class is responsible for delivering response from http request.
 *
 * @author Łukasz sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
class Response {
    constructor(status, data, headers = {}, errors = null) {
        this.status = status;
        this.data = data;
        this.errors = errors;
        this.headers = headers;
    }
    /**
     * Determine if response has any errors.
     */
    hasErrors() {
        if (this.errors === null) {
            return false;
        }
        return (Array.isArray(this.errors) && this.errors.length > 0) ||
            (typeof this.errors === 'object' && Object.values(this.errors).length > 0);
    }
    /**
     * Determine if response is successful.
     */
    isSuccessful() {
        return this.status >= 200 && this.status < 300;
    }
}
exports.Response = Response;
