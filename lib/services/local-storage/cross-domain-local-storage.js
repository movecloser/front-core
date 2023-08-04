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
let CrossDomainLocalStorageProvider = class CrossDomainLocalStorageProvider {
    constructor(config) {
        var _a;
        this.iframeId = 'xs-iframe';
        this.iframe = null;
        if (!config) {
            throw new Error('[CrossDomainLocalStorageProvider] Missing config!');
        }
        if (!('iframePath' in config && 'domain' in config)) {
            throw new Error('[CrossDomainLocalStorageProvider] Invalid config!');
        }
        this.iframeId = (_a = config.iframeId) !== null && _a !== void 0 ? _a : 'xs-iframe';
        this.domain = config.domain;
        this.iframeUrl = `${this.domain}${config.iframePath}`;
        // this.allowedOrigins = config.allowedOrigins
    }
    get(key) {
        if (!window_1.WindowService.isDefined) {
            return null;
        }
        if (this.isMaster) {
            return window.localStorage.getItem(key);
        }
        return new Promise((resolve, reject) => {
            this.runInIframe({ method: 'get', key }, function (e) {
                this.close();
                if (!e.data || e.data.key !== key) {
                    reject(`[CrossDomainLocalStorageProvider] did not receive value for key ${key}`);
                }
                resolve(e.data.value);
            });
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
            return window.localStorage.removeItem(key);
        }
        this.runInIframe({ method: 'remove', key });
    }
    set(key, value) {
        if (!window_1.WindowService.isDefined) {
            return;
        }
        if (this.isMaster) {
            return window.localStorage.setItem(key, value);
        }
        this.runInIframe({ method: 'set', key, value });
    }
    async runInIframe(payload, callback) {
        if (!this.iframe) {
            await this.createCrossSiteIframe();
        }
        this.sendRequest(payload, callback);
    }
    createCrossSiteIframe() {
        return new Promise((resolve) => {
            this.iframe = document.querySelector(`iframe#${this.iframeId}`);
            if (this.iframe) {
                resolve();
                return;
            }
            this.iframe = document.createElement('iframe');
            this.iframe.id = this.iframeId;
            this.iframe.src = this.iframeUrl;
            this.iframe.sandbox.add('allow-storage-access-by-user-activation');
            this.iframe.sandbox.add('allow-scripts');
            this.iframe.sandbox.add('allow-same-origin');
            this.iframe.style.display = 'none';
            this.iframe.onload = async () => {
                if (!this.iframe || !this.iframe.contentWindow) {
                    return;
                }
                await this.injectIframeScript();
                resolve();
            };
            document.body.appendChild(this.iframe);
        });
    }
    async injectIframeScript() {
        if (!this.iframe || !this.iframe.contentWindow) {
            return;
        }
        const script = `
(async function initCrossSiteLocalStorage (allowedOrigins, crossSiteIframePort) {
  try {
    await getCookieAccess()

    window.onmessage = (e) => {
      // iframe has to have a global variable allowedOrigins: string[]
      if (!allowedOrigins.includes(e.origin)) {
        console.error('[CrossDomainLocalStorageProvider] Origin ' + e.origin + ' not allowed!')
        return
      }
      console.info(e.data)
      switch (e.data.method) {
        case 'set':
          setItem(e.data.key, e.data.value)
          break
        case 'get':
          e.ports[0].postMessage({
            key: e.data.key,
            value: getItem(e.data.key)
          })
          break
        case 'remove':
          removeItem(e.data.key)
          break
        default:
          console.log('Unknown method', e.data.method)
      }
    }

    function getStorage () {
      const lsCookie = document.cookie.split(';')
        .find(item => item.trim().startsWith('localStorage='))

      if (!lsCookie) {
        return null
      }

      try {
        return JSON.parse(lsCookie.replace('localStorage=', ''))
      } catch (e) {
        return null
      }
    }

    function getItem (key) {
      const ls = getStorage()

      if (!ls) {
        return null
      }

      return ls[key]
    }

    function setItem (key, value) {
      const ls = getStorage() ?? {}

      ls[key] = value

      const date = new Date()
      date.setTime(date.getTime() + (30*24*60*60*1000))
      const expires = "; expires=" + date.toUTCString()

      document.cookie = 'localStorage=' + JSON.stringify(ls) + expires +  '; path=/'
    }

    function removeItem (key) {
      const ls = getStorage() ?? {}

      delete ls[key]

      document.cookie = 'localStorage=' + JSON.stringify(ls) + '; path=/'
    }

    crossSiteIframePort.postMessage('ok')
  } catch (err) {
    crossSiteIframePort.postMessage(err)
  }

  async function getCookieAccess () {
    return new Promise(async (resolve, reject) => {
      if (!document.hasStorageAccess) {
        // This browser doesn't support the Storage Access API
        // so let's just hope we have access!
        resolve()
      } else {
        const hasAccess = await document.hasStorageAccess()
        if (hasAccess) {
          // We have access to unpartitioned cookies, so let's go
          resolve()
        } else {
          // Check whether unpartitioned cookie access has been granted
          // to another same-site embed
          try {
            const permission = await navigator.permissions.query({
              name: 'storage-access'
            })

            if (permission.state === 'granted') {
              // If so, you can just call requestStorageAccess() without a user interaction,
              // and it will resolve automatically.
              await document.requestStorageAccess()
              resolve()
            } else if (permission.state === 'prompt') {
              // Need to call requestStorageAccess() after a user interaction
              /*btn.addEventListener("click", async () => {
                  try {
                      await document.requestStorageAccess();
                      doThingsWithCookies();
                  } catch (err) {
                      // If there is an error obtaining storage access.
                      console.error('Error obtaining storage access: $ {err}. Please sign in.');
                  }
              });*/
              console.error('Error obtaining storage access: $ {err}. Please sign in.')
              reject()
            } else if (permission.state === 'denied') {
              // User has denied unpartitioned cookie access, so we'll
              // need to do something else
              console.error('Storage access denied')
              reject()
            }
          } catch (error) {
            console.log('Could not access permission state. Error: $ {error}')
            resolve() // Again, we'll have to hope we have access!
          }
        }
      }
    })
  }
})(allowedOrigins, crossSiteIframePort)
    `;
        const channel = new MessageChannel();
        this.iframe.contentWindow.postMessage({
            method: 'init',
            config: {
                script
            }
        }, this.domain, [channel.port2]);
        return new Promise((resolve, reject) => {
            channel.port1.onmessage = (e) => {
                if (e.data === 'ok') {
                    resolve();
                }
                else {
                    reject();
                }
            };
        });
    }
    sendRequest(payload, callback) {
        if (!this.iframe || !this.iframe.contentWindow) {
            return null;
        }
        const channel = new MessageChannel();
        if (callback && typeof callback === 'function') {
            channel.port1.onmessage = callback;
        }
        this.iframe.contentWindow.postMessage(payload, this.domain, [channel.port2]);
    }
    get isMaster() {
        return window.location.origin === this.domain;
    }
};
CrossDomainLocalStorageProvider = __decorate([
    (0, container_1.Injectable)()
], CrossDomainLocalStorageProvider);
exports.CrossDomainLocalStorageProvider = CrossDomainLocalStorageProvider;
