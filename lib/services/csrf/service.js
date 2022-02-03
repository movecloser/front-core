"use strict";
// Copyright (c) 2022 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSRFService = void 0;
const container_1 = require("../../container");
/**
 * CSRF service is responsible for appending a CSRF token to requests.
 *
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
let CSRFService = class CSRFService {
    constructor(_config, _http) {
        this._config = _config;
        this._http = _http;
    }
    /**
     * @inheritDoc
     */
    getConfig() {
        return this._config;
    }
    /**
     * @inheritDoc
     */
    async getToken(resource, headers, body) {
        const payload = this.composePayload(resource, headers, body);
        let response;
        if (typeof this._config.source === 'string') {
            response = await this._http.post(this._config.source, payload);
        }
        else {
            const { connection, method, url } = this._config.source;
            response = await this._http.destination(connection)[method](url, payload);
        }
        return this.retrieveTokenFromResponse(response.data);
    }
};
CSRFService = __decorate([
    (0, container_1.Injectable)()
], CSRFService);
exports.CSRFService = CSRFService;
