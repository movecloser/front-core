"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiConnector = void 0;
var connector_1 = require("../contracts/connector");
var container_1 = require("../container");
/**
 * ApiConnector is a service class that provides unified access to the REST API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
var ApiConnector = /** @class */ (function () {
    function ApiConnector(list, httpConnector, middlewares) {
        this._list = list;
        this._http = httpConnector;
        this._middlewares = middlewares;
    }
    ApiConnector_1 = ApiConnector;
    /**
     * Call to resource.
     */
    ApiConnector.prototype.call = function (resource, action, params, body, headers, responseType) {
        if (params === void 0) { params = {}; }
        if (body === void 0) { body = {}; }
        if (headers === void 0) { headers = {}; }
        if (responseType === void 0) { responseType = connector_1.ResponseType.Json; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _i, _a, middleware, afterBefore, response, _b, _c, middleware;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        res = this.findResource(resource, action, params);
                        for (_i = 0, _a = this._middlewares; _i < _a.length; _i++) {
                            middleware = _a[_i];
                            afterBefore = middleware.beforeCall(res, headers, body);
                            headers = afterBefore.headers;
                            body = afterBefore.body;
                        }
                        return [4 /*yield*/, this._http.destination(res.connection)[res.method](res.url, body, headers, { responseType: responseType })];
                    case 1:
                        response = _d.sent();
                        for (_b = 0, _c = this._middlewares; _b < _c.length; _b++) {
                            middleware = _c[_b];
                            middleware.afterCall(response);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Return resource address.
     */
    ApiConnector.prototype.findResource = function (resource, action, params) {
        if (params === void 0) { params = {}; }
        this.checkIfActionOfResourceExists(resource, action);
        var endpoint = this._list[resource].methods[action];
        var connection = this._list[resource].connection;
        var url = ApiConnector_1.buildUrl(this._list[resource].prefix, endpoint, params);
        return {
            connection: typeof connection !== 'undefined' ? connection : this._http.defaultDestination(),
            method: endpoint.method,
            url: url,
            shorthand: ('shorthand' in endpoint && typeof endpoint.shorthand !== 'undefined')
                ? endpoint.shorthand : ApiConnector_1.resolveShorthand(resource, action),
            auth: ('auth' in endpoint && typeof endpoint.auth !== 'undefined')
                ? endpoint.auth : false
        };
    };
    /**
     * Merge given list with existing middlewares.
     */
    ApiConnector.prototype.useMiddlewares = function (list) {
        this._middlewares = __assign(__assign({}, this._middlewares), list);
    };
    /**
     * Merge given list with existing registry..
     */
    ApiConnector.prototype.useResources = function (list) {
        this._list = __assign(__assign({}, this._list), list);
    };
    /**
     * Build full url based on resource from routing list.
     */
    ApiConnector.buildUrl = function (prefix, endpoint, params) {
        var url = endpoint.url;
        if (endpoint.hasOwnProperty('params') && typeof endpoint.params !== 'undefined') {
            ApiConnector_1.checkIfAllParamsProvided(endpoint.params, params);
            for (var _i = 0, _a = Object.entries(params); _i < _a.length; _i++) {
                var _b = _a[_i], key = _b[0], value = _b[1];
                url = url.replace("{" + key + "}", value);
            }
        }
        if (typeof prefix === 'string' && prefix.length) {
            url = prefix + '/' + url;
        }
        return url;
    };
    /**
     * Checks if given resource exists.
     */
    ApiConnector.prototype.checkIfActionOfResourceExists = function (resource, action) {
        if (!this._list[resource]) {
            throw new Error('There is no such resource in resources [list].');
        }
        if (!this._list[resource].methods[action]) {
            throw new Error('There is no such action in actions [list].');
        }
    };
    /**
     * Compares endpoint parameters with given parameters.
     */
    ApiConnector.checkIfAllParamsProvided = function (endpointParams, givenParams) {
        var givenKeys = Object.keys(givenParams);
        for (var _i = 0, endpointParams_1 = endpointParams; _i < endpointParams_1.length; _i++) {
            var param = endpointParams_1[_i];
            if (!givenKeys.includes(param)) {
                throw new Error("Missing required parameter: " + param + ".");
            }
        }
    };
    /**
     * Resolve form name by resource & action.
     */
    ApiConnector.resolveShorthand = function (resource, action) {
        var first = resource.substr(0, 1);
        return "" + action + first.toUpperCase() + resource.substr(1, resource.length);
    };
    var ApiConnector_1;
    ApiConnector = ApiConnector_1 = __decorate([
        container_1.Injectable()
    ], ApiConnector);
    return ApiConnector;
}());
exports.ApiConnector = ApiConnector;
