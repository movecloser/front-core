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
  private readonly allowedOrigins: string[]
  private readonly domain: string
  private readonly iframeId: string = 'xs-iframe'
  private readonly iframeUrl: string

  private iframe: HTMLIFrameElement | null = null

  constructor (config?: LocalStorageConfig) {
    if (!config) {
      throw new Error('[CrossDomainLocalStorageProvider] Missing config!')
    }

    if (!('iframePath' in config && 'domain' in config && 'allowedOrigins' in config)) {
      throw new Error('[CrossDomainLocalStorageProvider] Invalid config!')
    }

    this.iframeId = config.iframeId ?? 'xs-iframe'
    this.domain = config.domain
    this.iframeUrl = `${this.domain}${config.iframePath}`
    this.allowedOrigins = config.allowedOrigins
  }

  get (key: string): Promise<string | null> | string | null {
    if (!WindowService.isDefined) {
      return null
    }

    if (this.isMaster) {
      return window.localStorage.get(key)
    }

    return new Promise((resolve) => {
      const listener = (e: MessageEvent) => {
        if (e.origin !== this.domain || !e.data || e.data.key !== key) {
          return
        }

        resolve(e.data.value)

        window.removeEventListener('message', listener)
      }
      window.addEventListener('message', listener)

      this.runInIframe({ method: 'get', key })
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
      return window.localStorage.remove(key)
    }

    this.runInIframe({ method: 'remove', key })
  }

  set (key: string, value: string): void {
    if (!WindowService.isDefined) {
      return
    }

    if (this.isMaster) {
      return window.localStorage.set(key, value)
    }

    this.runInIframe({ method: 'set', key, value })
  }

  protected runInIframe (payload: LocalStorageActionPayload): void {
    if (this.iframe) {
      this.iframeCallback(payload)
    } else {
      this.createCrossSiteIframe(payload)
    }
  }

  protected createCrossSiteIframe (payload: LocalStorageActionPayload) {
    this.iframe = document.querySelector(`iframe#${this.iframeId}`)

    if (this.iframe) {
      return
    }

    this.iframe = document.createElement('iframe')
    this.iframe.id = this.iframeId
    this.iframe.src = this.iframeUrl
    this.iframe.style.display = 'none'
    this.iframe.onload = () => {
      if (!this.iframe || !this.iframe.contentWindow) {
        return
      }

      this.injectIframeScript()
      this.iframeCallback(payload)
    }
    document.body.appendChild(this.iframe)
  }

  protected injectIframeScript () {
    if (!this.iframe || !this.iframe.contentWindow) {
      return
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
    }`

    this.iframe.contentWindow.postMessage({
      method: 'init',
      config: {
        script
      }
    }, this.domain)
  }

  protected iframeCallback (payload: LocalStorageActionPayload) {
    if (!this.iframe) {
      return null
    }

    const receiver = this.iframe.contentWindow
    if (!receiver) {
      return null
    }

    receiver.postMessage(payload, this.domain)
  }

  private get isMaster (): boolean {
    return window.location.origin === this.domain
  }
}
