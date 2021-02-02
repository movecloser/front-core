"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const rxjs_1 = require("rxjs");
const container_1 = require("../container");
const authentication_1 = require("../contracts/authentication");
const local_storage_1 = require("../support/local-storage");
const window_1 = require("./window");
let AuthService = class AuthService {
    constructor(_config, _date) {
        this._config = _config;
        this._date = _date;
        this._token = null;
        this._user = null;
        this._auth$ = new rxjs_1.BehaviorSubject({
            type: authentication_1.AuthEventType.Booting
        });
        this.retrieveToken();
    }
    /**
     * Returns if user is logged-in.
     */
    check() {
        if (!this._token) {
            return false;
        }
        if (!this.isRefreshable(this._token)) {
            return this._token !== null && !!this._token.accessToken;
        }
        return this._token !== null &&
            this.calculateTokenLifetime(this._token) > this._config.validThreshold;
    }
    /**
     * Clears Token and sets logged-out state.
     */
    deleteToken() {
        /* istanbul ignore else */
        if (window_1.WindowService.isDefined) {
            local_storage_1.LocalStorage.remove(this._config.tokenName);
        }
        this._token = null;
        this._user = null;
        this._auth$.next({
            type: authentication_1.AuthEventType.Invalidated
        });
    }
    /**
     * Returns Auth Headers based on token type.
     */
    getAuthorizationHeader() {
        let tokenHeader = '';
        const tokenData = this.token;
        if (!tokenData || !tokenData.accessToken) {
            return { Authorization: '' };
        }
        if ('tokenType' in tokenData && tokenData.tokenType) {
            tokenHeader += `${tokenData.tokenType} `;
        }
        tokenHeader += tokenData.accessToken;
        return { Authorization: tokenHeader };
    }
    /**
     * Register new event listener.
     */
    listen(callback) {
        return this._auth$.subscribe((event) => {
            callback(event);
        });
    }
    /**
     * Returns Token object from state.
     */
    get token() {
        return this._token;
    }
    /**
     * Sets Token to state.
     * @param token
     */
    setToken(token) {
        if (this.isRefreshable(token)) {
            const tokenLifeTime = this.calculateTokenLifetime(token);
            /* istanbul ignore else */
            if (this.isTokenValid(tokenLifeTime)) {
                this.setupRefreshment(tokenLifeTime, token);
            }
        }
        this._token = token;
        this._auth$.next({
            type: authentication_1.AuthEventType.Authenticated
        });
        /* istanbul ignore else */
        if (window_1.WindowService.isDefined) {
            local_storage_1.LocalStorage.set(this._config.tokenName, JSON.stringify(this.token));
        }
    }
    /**
     * Sets user in state.
     * @param user
     */
    setUser(user) {
        this._user = user;
    }
    /**
     * Returns user from state.
     */
    get user() {
        return this._user;
    }
    /**
     * Calculates for how long token will be still valid.
     * @private
     */
    calculateTokenLifetime(token) {
        return this._date.difference(token.expiresAt);
    }
    /**
     * Return id of currently set user.
     */
    getUserId() {
        return this._user && this._user.hasOwnProperty('id') && this._user.id
            ? this._user['id'] : null;
    }
    /**
     * Checks if token is valid and emits event if not.
     * @param tokenLifeTime
     * @private
     */
    isTokenValid(tokenLifeTime) {
        if (tokenLifeTime < this._config.validThreshold || tokenLifeTime < 0) {
            this._auth$.next({
                type: authentication_1.AuthEventType.Invalidated
            });
            return false;
        }
        return true;
    }
    /**
     * Sets token retrieved from device localstorage.
     */
    retrieveToken() {
        /* istanbul ignore else */
        if (window_1.WindowService.isDefined) {
            const payload = {
                type: authentication_1.AuthEventType.Booted
            };
            try {
                const token = JSON.parse(local_storage_1.LocalStorage.get(this._config.tokenName));
                for (const key of ['accessToken', 'tokenType']) {
                    if (!token || !token.hasOwnProperty(key) || token[key] === null) {
                        break;
                    }
                    payload.type = authentication_1.AuthEventType.BootedWithToken;
                    payload.token = token;
                }
                /* istanbul ignore next */
            }
            catch (error) { }
            this._auth$.next(payload);
        }
    }
    isRefreshable(token) {
        return token.hasOwnProperty('expiresAt') && token.expiresAt !== null;
    }
    /**
     * Sets refresh behaviour for token.
     * @param tokenLifeTime
     * @param token
     * @private
     */
    setupRefreshment(tokenLifeTime, token) {
        if (tokenLifeTime < this._config.refreshThreshold &&
            tokenLifeTime > this._config.validThreshold) {
            this._auth$.next({
                type: authentication_1.AuthEventType.Refresh,
                token: token
            });
            /* istanbul ignore else */
        }
        else if (tokenLifeTime > this._config.refreshThreshold) {
            /* istanbul ignore next */
            setTimeout(() => {
                this._auth$.next({
                    type: authentication_1.AuthEventType.Refresh,
                    token: token
                });
            }, tokenLifeTime - this._config.refreshThreshold * 1000);
        }
    }
};
AuthService = __decorate([
    container_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
