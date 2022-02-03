"use strict";
// Copyright (c) 2022 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRFMiddleware = void 0;
const container_1 = require("../../container");
/**
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
let CSRFMiddleware = class CSRFMiddleware {
    constructor(_csrfService) {
        this._csrfService = _csrfService;
        this._config = this._csrfService.getConfig();
    }
    /**
     * Method to be called after call execution.
     * It handles side effects.
     */
    afterCall() { }
    /**
     * Method to be called before call execution.
     * It can transform headers and body for a given resource.
     */
    async beforeCall(resource, headers, body) {
        var _a;
        if ((_a = resource.meta) === null || _a === void 0 ? void 0 : _a.csrf) {
            const csrf = await this._csrfService.getToken(resource, headers, body);
            if (this._config.sendAsBody) {
                body = Object.assign(Object.assign({}, body), { [this._config.paramName]: csrf });
            }
            else {
                headers = Object.assign(Object.assign({}, headers), { [this._config.paramName]: csrf });
            }
        }
        return { headers, body };
    }
};
CSRFMiddleware = __decorate([
    (0, container_1.Injectable)()
], CSRFMiddleware);
exports.CSRFMiddleware = CSRFMiddleware;
