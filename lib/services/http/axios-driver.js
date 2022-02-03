"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosDriver = void 0;
const axios_1 = require("axios");
const errors_1 = require("../../exceptions/errors");
const http_driver_1 = require("./http-driver");
/**
 * Provides axios instance for http calls.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
class AxiosDriver extends http_driver_1.HttpDriver {
    constructor(axiosConfig, debug) {
        super(debug);
        this.instance = axios_1.default.create(axiosConfig);
    }
    /**
     * Performs http request using axios.
     */
    async _call(method, target, data, headers, options) {
        return await this.instance.request(Object.assign(Object.assign({ method: method, url: target }, AxiosDriver.composePayload(data, method)), { headers: headers, responseType: options && options.responseType ? options.responseType : 'json' }))
            .then((response) => {
            this._logResponse(target, method, response.status, response.request, response.data);
            return this.composeSuccessResponse(response.status, response.data, response.headers);
        })
            .catch((error) => {
            if (error.hasOwnProperty('response') && typeof error.response !== 'undefined') {
                this._logResponse(target, method, error.response.status, error.response.request, error.response.data);
                return this.composeFailResponse(error.response.status, error.response.data, error.response.headers, error.response.data);
            }
            throw new errors_1.ConnectionError('Cannot perform request.');
        });
    }
    /**
     * Constructing payload based on axios requirements.
     */
    static composePayload(data, method) {
        return method === 'get' ? { params: data } : { data: data };
    }
}
exports.AxiosDriver = AxiosDriver;
