// Copyright (c) 2021 Move Closer

import { WindowService } from '../window'
import { ILocalStorage, LocalStorageConfig } from '../../contracts'
import { Injectable } from '../../container'

interface LocalStorageActionPayload {
  method: 'set' | 'get' | 'remove'
  key: string
  value?: string
}

@Injectable()
export class CrossDomainLocalStorageProvider implements ILocalStorage {
  // private readonly allowedOrigins: string[]
  private readonly domain: string
  private readonly iframeId: string = 'xs-iframe'
  private readonly iframeUrl: string

  private iframe: HTMLIFrameElement | null = null

  constructor (config?: LocalStorageConfig) {
    if (!config) {
      throw new Error('[CrossDomainLocalStorageProvider] Missing config!')
    }

    if (!('iframePath' in config && 'domain' in config)) {
      throw new Error('[CrossDomainLocalStorageProvider] Invalid config!')
    }

    this.iframeId = config.iframeId ?? 'xs-iframe'
    this.domain = config.domain
    this.iframeUrl = `${this.domain}${config.iframePath}`
    // this.allowedOrigins = config.allowedOrigins
  }

  get (key: string): Promise<string | null> | string | null {
    if (!WindowService.isDefined) {
      return null
    }

    if (this.isMaster) {
      return window.localStorage.getItem(key)
    }

    return new Promise((resolve, reject) => {
      this.runInIframe({ method: 'get', key }, function (e) {
        this.close()

        if (!e.data || e.data.key !== key) {
          reject(`[CrossDomainLocalStorageProvider] did not receive value for key ${key}`)
        }

        resolve(e.data.value)
      })
    })
  }

  isSet (key: string): boolean {
    return this.get(key) !== null
  }

  remove (key: string): void  {
    if (!WindowService.isDefined) {
      return
    }

    if (this.isMaster) {
      return window.localStorage.removeItem(key)
    }

    this.runInIframe({ method: 'remove', key })
  }

  set (key: string, value: string): void {
    if (!WindowService.isDefined) {
      return
    }

    if (this.isMaster) {
      return window.localStorage.setItem(key, value)
    }

    this.runInIframe({ method: 'set', key, value })
  }

  protected async runInIframe (payload: LocalStorageActionPayload, callback?: MessagePort['onmessage']): Promise<void> {
    if (!this.iframe) {
      await this.createCrossSiteIframe()
    }
    this.sendRequest(payload, callback)
  }

  protected createCrossSiteIframe (): Promise<void> {
    return new Promise((resolve) => {
      this.iframe = document.querySelector(`iframe#${this.iframeId}`)

      if (this.iframe) {
        resolve()
        return
      }

      this.iframe = document.createElement('iframe')
      this.iframe.id = this.iframeId
      this.iframe.src = this.iframeUrl
      this.iframe.sandbox.add('allow-storage-access-by-user-activation');
      this.iframe.sandbox.add('allow-scripts');
      this.iframe.sandbox.add('allow-same-origin');
      this.iframe.style.display = 'none'
      this.iframe.onload = async () => {
        if (!this.iframe || !this.iframe.contentWindow) {
          return
        }

        await this.injectIframeScript()
        resolve()
      }
      document.body.appendChild(this.iframe)
    })
  }

  protected async injectIframeScript (): Promise<void> {
    if (!this.iframe || !this.iframe.contentWindow) {
      return
    }

    const script = `
      window.onmessage = (e) => {
        // iframe has to have a global variable allowedOrigins: string[]
        if (!allowedOrigins.includes(e.origin)) {
          console.error('[CrossDomainLocalStorageProvider] Origin ' + e.origin + ' not allowed!')
          return
        }
        switch (e.data.method) {
          case 'set':
            localStorage.setItem(e.data.key, e.data.value)
            break
          case 'get':
            e.ports[0].postMessage({
                key: e.data.key,
                value: localStorage.getItem(e.data.key)
            })
            break
          case 'remove':
            localStorage.removeItem(e.data.key)
            break
          default:
            console.log('Unknown method', e.data.method)
        }
    }
    
    function doThingsWithCookies() {
        console.info('Cookie!')
        document.cookie = "foo=bar"; // set a cookie
    }

    async function handleCookieAccess() {
        if (!document.hasStorageAccess) {
            // This browser doesn't support the Storage Access API
            // so let's just hope we have access!
            doThingsWithCookies();
        } else {
            const hasAccess = await document.hasStorageAccess();
            if (hasAccess) {
                // We have access to unpartitioned cookies, so let's go
                doThingsWithCookies();
            } else {
                // Check whether unpartitioned cookie access has been granted
                // to another same-site embed
                try {
                    const permission = await navigator.permissions.query({
                        name: "storage-access",
                    });

                    if (permission.state === "granted") {
                        // If so, you can just call requestStorageAccess() without a user interaction,
                        // and it will resolve automatically.
                        await document.requestStorageAccess();
                        doThingsWithCookies();
                    } else if (permission.state === "prompt") {
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
                        console.error('Error obtaining storage access: $ {err}. Please sign in.');
                    } else if (permission.state === "denied") {
                        // User has denied unpartitioned cookie access, so we'll
                        // need to do something else
                        console.error('Storage access denied');
                    }
                } catch (error) {
                    console.log('Could not access permission state. Error: $ {error}');
                    doThingsWithCookies(); // Again, we'll have to hope we have access!
                }
            }
        }
    }

    handleCookieAccess()
    `

    const channel = new MessageChannel()

    this.iframe.contentWindow.postMessage({
      method: 'init',
      config: {
        script
      }
    }, this.domain, [channel.port2])

    return new Promise((resolve, reject) => {
      channel.port1.onmessage = (e) => {
        if (e.data === 'ok') {
          resolve()
        } else {
          reject()
        }
      }
    })
  }

  protected sendRequest (payload: LocalStorageActionPayload, callback?: MessagePort['onmessage']) {
    if (!this.iframe || !this.iframe.contentWindow) {
      return null
    }
    const channel = new MessageChannel()

    if (callback && typeof callback === 'function') {
      channel.port1.onmessage = callback
    }
    this.iframe.contentWindow.postMessage(payload, this.domain, [channel.port2])
  }

  private get isMaster (): boolean {
    return window.location.origin === this.domain
  }
}
