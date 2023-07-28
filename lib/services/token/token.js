"use strict";
// Copyright (c) 2021 Move Closer
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractToken = void 0;
const errors_1 = require("../../exceptions/errors");
const datetime_1 = require("../datetime");
const local_storage_1 = require("../local-storage");
class AbstractToken {
    constructor(token) {
        this._date = new datetime_1.DateTime();
        this._token = token;
    }
    /**
     * Check if token is equipped with all necessary properties.
     * @protected
     */
    checkRequiredProperties(properties) {
        properties.forEach((key) => {
            if (!this._token.hasOwnProperty(key) || !this._token[key]) {
                throw new errors_1.MissingParameter(`Property [${key}] is missing from Authorization Token.`);
            }
        });
    }
    /**
     * Retrieve token from storage.
     */
    static async recreateFromStorage(tokenName, localStorageProvider) {
        const localStorage = localStorageProvider ? localStorageProvider : new local_storage_1.NativeLocalStorageProvider();
        const token = JSON.parse(await localStorage.get(tokenName));
        for (const key of ['accessToken', 'tokenType']) {
            if (!token || !token.hasOwnProperty(key) || token[key] === null) {
                return null;
            }
        }
        return token;
    }
    /**
     * Returns raw Token data.
     */
    get token() {
        return this._token;
    }
    /**
     * Check if token is refreshable.
     */
    isRefreshable() {
        return this._token.hasOwnProperty('expiresAt') && this._token.expiresAt !== null;
    }
    /**
     * Calculates for how long token will be still valid.
     */
    calculateTokenLifetime() {
        return this._date.difference(this._token.expiresAt);
    }
}
exports.AbstractToken = AbstractToken;
