"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApiConnector_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConnector = void 0;
const connector_1 = require("../contracts/connector");
const container_1 = require("../container");
/**
 * ApiConnector is a service class that provides unified access to the REST API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
let ApiConnector = ApiConnector_1 = class ApiConnector {
    constructor(list, httpConnector, middlewares) {
        this._list = list;
        this._http = httpConnector;
        this._middlewares = middlewares;
    }
    /**
     * Call to resource.
     */
    async call(resource, action, params = {}, body = {}, headers = {}, responseType = connector_1.ResponseType.Json) {
        const res = this.findResource(resource, action, params);
        for (const middleware of this._middlewares) {
            const afterBefore = middleware.beforeCall(res, headers, body);
            headers = afterBefore.headers;
            body = afterBefore.body;
        }
        const response = await this._http.destination(res.connection)[res.method](res.url, body, headers, { responseType });
        for (const middleware of this._middlewares) {
            middleware.afterCall(response);
        }
        return response;
    }
    /**
     * Return resource address.
     */
    findResource(resource, action, params = {}) {
        this.checkIfActionOfResourceExists(resource, action);
        const endpoint = this._list[resource].methods[action];
        const connection = this._list[resource].connection;
        const url = ApiConnector_1.buildUrl(this._list[resource].prefix, endpoint, params);
        return {
            connection: typeof connection !== 'undefined' ? connection : this._http.defaultDestination(),
            method: endpoint.method,
            url: url,
            shorthand: ('shorthand' in endpoint && typeof endpoint.shorthand !== 'undefined')
                ? endpoint.shorthand : ApiConnector_1.resolveShorthand(resource, action),
            auth: ('auth' in endpoint && typeof endpoint.auth !== 'undefined') ? endpoint.auth : false,
            meta: 'meta' in endpoint && typeof endpoint.meta === 'object' && endpoint.meta !== null
                ? endpoint.meta : {}
        };
    }
    /**
     * Merge given list with existing middlewares.
     */
    useMiddlewares(list) {
        this._middlewares = Object.assign(Object.assign({}, this._middlewares), list);
    }
    /**
     * Merge given list with existing registry..
     */
    useResources(list) {
        this._list = Object.assign(Object.assign({}, this._list), list);
    }
    /**
     * Build full url based on resource from routing list.
     */
    static buildUrl(prefix, endpoint, params) {
        let url = endpoint.url;
        if (endpoint.hasOwnProperty('params') && typeof endpoint.params !== 'undefined') {
            ApiConnector_1.checkIfAllParamsProvided(endpoint.params, params);
            for (const [key, value] of Object.entries(params)) {
                url = url.replace(`{${key}}`, value);
            }
        }
        if (typeof prefix === 'string' && prefix.length) {
            url = prefix + '/' + url;
        }
        return url;
    }
    /**
     * Checks if given resource exists.
     */
    checkIfActionOfResourceExists(resource, action) {
        if (!this._list[resource]) {
            throw new Error('There is no such resource in resources [list].');
        }
        /* istanbul ignore else */
        if (!this._list[resource].methods[action]) {
            throw new Error('There is no such action in actions [list].');
        }
    }
    /**
     * Compares endpoint parameters with given parameters.
     */
    static checkIfAllParamsProvided(endpointParams, givenParams) {
        const givenKeys = Object.keys(givenParams);
        for (const param of endpointParams) {
            if (!givenKeys.includes(param)) {
                throw new Error(`Missing required parameter: ${param}.`);
            }
        }
    }
    /**
     * Resolve form name by resource & action.
     */
    static resolveShorthand(resource, action) {
        const first = resource.substr(0, 1);
        return `${action}${first.toUpperCase()}${resource.substr(1, resource.length)}`;
    }
};
ApiConnector = ApiConnector_1 = __decorate([
    container_1.Injectable()
], ApiConnector);
exports.ApiConnector = ApiConnector;
