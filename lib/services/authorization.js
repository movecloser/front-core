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
const single_1 = require("./token/single");
const driver_map_1 = require("./token/driver-map");
const window_1 = require("./window");
let AuthService = class AuthService {
    constructor(_config, _window) {
        this._config = _config;
        this._window = _window;
        this._token = null;
        this._user = null;
        this._auth$ = new rxjs_1.BehaviorSubject({
            type: authentication_1.AuthEventType.Booting
        });
        this.setDriver(_config.tokenDriver);
        this.retrieveToken();
        this.registerStorageListener();
        if (window_1.WindowService.isDefined) {
            this._window.onFocus(() => {
                if (this._token && this._token.calculateTokenLifetime() <= this._config.refreshThreshold) {
                    this._auth$.next({
                        type: authentication_1.AuthEventType.Refresh,
                        token: this._token
                    });
                }
            });
        }
    }
    /**
     * Returns if user is logged-in.
     */
    check() {
        if (!this._token) {
            return false;
        }
        if (!this._token.isRefreshable()) {
            return this._token !== null && !!this._token.accessToken;
        }
        return this._token !== null &&
            this._token.calculateTokenLifetime() > this._config.validThreshold;
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
        return this._token ? this._token.token : null;
    }
    /**
     * Sets Token Driver to be used by Auth Service.
     * @param driver
     */
    setDriver(driver) {
        const driversMap = driver_map_1.tokenDriversMap;
        if (driver && driversMap[driver]) {
            this._driver = driversMap[driver];
            return this;
        }
        this._driver = single_1.SingleToken;
        return this;
    }
    /**
     * Sets Token to state.
     * @param token
     * @param isPersistent (optional)
     */
    setToken(token, isPersistent = true) {
        if (!this._driver) {
            throw new Error('Token Driven not set.');
        }
        const newToken = new this._driver(token);
        if (newToken.isRefreshable()) {
            const tokenLifeTime = (newToken.calculateTokenLifetime());
            /* istanbul ignore else */
            if (this.isTokenValid(tokenLifeTime)) {
                this.setupRefreshment(tokenLifeTime, newToken);
            }
        }
        this._token = newToken;
        this._auth$.next({
            type: authentication_1.AuthEventType.Authenticated
        });
        /* istanbul ignore else */
        if (window_1.WindowService.isDefined && isPersistent) {
            local_storage_1.LocalStorage.set(this._config.tokenName, JSON.stringify(this.token));
        }
    }
    /**
     * Forces token refresh
     */
    refreshToken() {
        if (!this._driver) {
            throw new Error('Token Driver not set.');
        }
        if (!this._token) {
            return;
        }
        if (this._window.isActive) {
            this._auth$.next({
                type: authentication_1.AuthEventType.Refresh,
                token: this._token
            });
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
     * Listens to storage change.
     * When new Token appears in other browser tab.
     */
    registerStorageListener() {
        if (window_1.WindowService.isDefined) {
            window.addEventListener('storage', () => {
                if (!this._token || !this._driver) {
                    return;
                }
                const newToken = new this._driver(this._driver.recreateFromStorage(this._config.tokenName));
                if (newToken && newToken.calculateTokenLifetime() > this._token.calculateTokenLifetime()) {
                    this.setToken(newToken.token);
                }
            });
        }
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
            if (!this._driver) {
                throw new Error('Token Driver not set.');
            }
            try {
                const token = this._driver.recreateFromStorage(this._config.tokenName);
                if (token === null) {
                    this.deleteToken();
                }
                payload.type = authentication_1.AuthEventType.BootedWithToken;
                payload.token = new this._driver(token);
                /* istanbul ignore next */
            }
            catch (error) {
                this.deleteToken();
            }
            this._auth$.next(payload);
        }
    }
    /**
     * Sets refresh behaviour for token.
     * @param tokenLifeTime
     * @param token
     * @private
     */
    setupRefreshment(tokenLifeTime, token) {
        /* istanbul ignore else */
        if (tokenLifeTime < this._config.refreshThreshold &&
            tokenLifeTime > this._config.validThreshold) {
            this.compareWithStorage(token);
        }
        else if (tokenLifeTime > this._config.refreshThreshold) {
            /* istanbul ignore next */
            setTimeout(() => {
                this.compareWithStorage(token);
            }, (tokenLifeTime - this._config.refreshThreshold) * 1000);
        }
    }
    /**
     * Decides whether to use new token or existing one.
     * Fires only if tab is active.
     */
    compareWithStorage(token) {
        if (!this._driver) {
            throw new Error('Token Driver not set.');
        }
        const storageToken = new this._driver(this._driver.recreateFromStorage(this._config.tokenName));
        const storageTokenLifetime = storageToken.calculateTokenLifetime();
        const tokenLifeTime = token.calculateTokenLifetime();
        if (storageToken && storageTokenLifetime > tokenLifeTime) {
            this.setToken(storageToken.token);
        }
        else {
            if (this._window.isActive) {
                this._auth$.next({
                    type: authentication_1.AuthEventType.Refresh,
                    token: token
                });
            }
        }
    }
};
AuthService = __decorate([
    container_1.Injectable()
], AuthService);
exports.AuthService = AuthService;
