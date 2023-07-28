"use strict";
// Copyright (c) 2021 Move Closer
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrossDomainLocalStorageProvider = void 0;
const window_1 = require("../window");
const container_1 = require("../../container");
const local_storage_1 = require("../../support/local-storage");
let CrossDomainLocalStorageProvider = class CrossDomainLocalStorageProvider {
    constructor(config) {
        var _a;
        this.iframeId = 'xs-iframe';
        this.iframe = null;
        if (!config) {
            throw new Error('[CrossDomainLocalStorageProvider] Missing config!');
        }
        if (!('iframePath' in config && 'domain' in config && 'allowedOrigins' in config)) {
            throw new Error('[CrossDomainLocalStorageProvider] Invalid config!');
        }
        this.iframeId = (_a = config.iframeId) !== null && _a !== void 0 ? _a : 'xs-iframe';
        this.domain = config.domain;
        this.iframeUrl = `${this.domain}${config.iframePath}`;
        this.allowedOrigins = config.allowedOrigins;
    }
    get(key) {
        if (!window_1.WindowService.isDefined) {
            return null;
        }
        if (this.isMaster) {
            return local_storage_1.default.get(key);
        }
        return new Promise((resolve) => {
            const listener = (e) => {
                if (e.origin !== this.domain || !e.data || e.data.key !== key) {
                    return;
                }
                resolve(e.data.value);
                window.removeEventListener('message', listener);
            };
            window.addEventListener('message', listener);
            this.runInIframe({ method: 'get', key });
        });
    }
    isSet(key) {
        return this.get(key) !== null;
    }
    remove(key) {
        if (!window_1.WindowService.isDefined) {
            return;
        }
        if (this.isMaster) {
            return local_storage_1.default.remove(key);
        }
        this.runInIframe({ method: 'remove', key });
    }
    set(key, value) {
        if (!window_1.WindowService.isDefined) {
            return;
        }
        if (this.isMaster) {
            return local_storage_1.default.set(key, value);
        }
        this.runInIframe({ method: 'set', key, value });
    }
    runInIframe(payload) {
        if (this.iframe) {
            this.iframeCallback(payload);
        }
        else {
            this.createCrossSiteIframe(payload);
        }
    }
    createCrossSiteIframe(payload) {
        this.iframe = document.createElement('iframe');
        this.iframe.id = this.iframeId;
        this.iframe.src = this.iframeUrl;
        this.iframe.onload = () => {
            if (!this.iframe || !this.iframe.contentWindow) {
                return;
            }
            this.injectIframeScript();
            this.iframeCallback(payload);
        };
        document.body.appendChild(this.iframe);
    }
    injectIframeScript() {
        if (!this.iframe || !this.iframe.contentWindow) {
            return;
        }
        const script = `
      window.onmessage = (e) => {
        var allowedOrigins = ${JSON.stringify(this.allowedOrigins)};
        if (!allowedOrigins.includes(e.origin)) {
          console.error('[CrossDomainLocalStorageProvider] Origin ' + e.origin + ' not allowed!')
          return
        }
        console.info(e.data)
        switch (e.data.method) {
          case 'set':
            localStorage.setItem(e.data.key, e.data.value)
            break
          case 'get':
            window.parent.postMessage({
                key: e.data.key,
                value: localStorage.getItem(e.data.key)
            }, e.origin)
            break
          case 'remove':
            localStorage.removeItem(e.data.key)
            break
          default:
            console.log('Unknown method', e.data.method)
        }
    }`;
        this.iframe.contentWindow.postMessage({
            method: 'init',
            config: {
                script
            }
        }, this.domain);
    }
    iframeCallback(payload) {
        if (!this.iframe) {
            return null;
        }
        const receiver = this.iframe.contentWindow;
        if (!receiver) {
            return null;
        }
        receiver.postMessage(payload, this.domain);
    }
    get isMaster() {
        return window.location.origin === this.domain;
    }
};
CrossDomainLocalStorageProvider = __decorate([
    (0, container_1.Injectable)()
], CrossDomainLocalStorageProvider);
exports.CrossDomainLocalStorageProvider = CrossDomainLocalStorageProvider;
