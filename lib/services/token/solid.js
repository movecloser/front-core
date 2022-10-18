"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolidToken = void 0;
const token_1 = require("./token");
/**
 * Solid Token Driver Class
 */
class SolidToken extends token_1.AbstractToken {
    constructor(token, date) {
        super(token, date);
        this.checkRequiredProperties(['accessToken']);
    }
    /**
     * Returns string representing key used as access token.
     */
    get accessToken() {
        return this._token['accessToken'];
    }
    /**
     * Returns string representing key used to refresh token.
     */
    get refreshToken() {
        return '';
    }
    /**
     * Check if token is refreshable (overridden).
     */
    isRefreshable() {
        return false;
    }
}
exports.SolidToken = SolidToken;
