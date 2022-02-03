// Copyright (c) 2021 Move Closer

import { BehaviorSubject, Subscription } from 'rxjs'

import { Injectable } from '../container'

import {
  AuthConfig,
  Authentication,
  AuthEvent,
  AuthEventCallback,
  AuthEventType,
  AuthHeader,
  IToken,
  ITokenConstructor,
  IUser,
  Token,
  TokenDriver
} from '../contracts/authentication'
import { IWindow } from '../contracts/services'
import { LocalStorage } from '../support/local-storage'
import { SingleToken } from './token/single'
import { tokenDriversMap } from './token/driver-map'
import { WindowService } from './window'

@Injectable()
export class AuthService implements Authentication <IUser> {
  private _auth$!: BehaviorSubject<AuthEvent>
  private _driver!: ITokenConstructor | null
  private _token: IToken | null = null
  private _user: IUser | null = null

  constructor (private _config: AuthConfig, private _window: IWindow) {
    this._auth$ = new BehaviorSubject<AuthEvent>({
      type: AuthEventType.Booting
    })

    this.setDriver(_config.tokenDriver)
    this.retrieveToken()
    this.registerStorageListener()
    if (WindowService.isDefined) {
      this._window.onFocus(
        () => {
          if (this._token && this._token.calculateTokenLifetime() <= this._config.refreshThreshold) {
            this._auth$.next({
              type: AuthEventType.Refresh,
              token: this._token
            })
          }
        }
      )
    }
  }

  /**
   * Returns if user is logged-in.
   */
  public check (): boolean {
    if (!this._token) {
      return false
    }

    if (!this._token.isRefreshable()) {
      return this._token !== null && !!this._token.accessToken
    }

    return this._token !== null &&
      this._token.calculateTokenLifetime() > this._config.validThreshold
  }

  /**
   * Clears Token and sets logged-out state.
   */
  public deleteToken (): void {
    /* istanbul ignore else */
    if (WindowService.isDefined) {
      LocalStorage.remove(this._config.tokenName)
    }

    this._token = null
    this._user = null

    this._auth$.next({
      type: AuthEventType.Invalidated
    })
  }

  /**
   * Returns Auth Headers based on token type.
   */
  public getAuthorizationHeader (): AuthHeader {
    let tokenHeader: string = ''

    const tokenData = this.token

    if (!tokenData || !tokenData.accessToken) {
      return { Authorization: '' }
    }

    if ('tokenType' in tokenData && tokenData.tokenType) {
      tokenHeader += `${tokenData.tokenType} `
    }

    tokenHeader += tokenData.accessToken

    return { Authorization: tokenHeader }
  }

  /**
   * Register new event listener.
   */
  public listen (callback: AuthEventCallback): Subscription {
    return this._auth$.subscribe((event: AuthEvent) => {
      callback(event)
    })
  }

  /**
   * Returns Token object from state.
   */
  public get token (): Token | null {
    return this._token ? this._token.token : null
  }

  /**
   * Sets Token Driver to be used by Auth Service.
   * @param driver
   */
  public setDriver (driver: TokenDriver): this {
    const driversMap = tokenDriversMap

    if (driver && driversMap[driver]) {
      this._driver = driversMap[driver]
      return this
    }

    this._driver = SingleToken

    return this
  }

  /**
   * Sets Token to state.
   * @param token
   * @param isPersistent (optional)
   */
  public setToken (token: Token, isPersistent = true) {
    if (!this._driver) {
      throw new Error('Token Driven not set.')
    }

    const newToken: IToken = new this._driver(token)

    if (newToken.isRefreshable()) {
      const tokenLifeTime = (newToken.calculateTokenLifetime())

      /* istanbul ignore else */
      if (this.isTokenValid(tokenLifeTime)) {
        this.setupRefreshment(tokenLifeTime, newToken)
      }
    }

    this._token = newToken

    this._auth$.next({
      type: AuthEventType.Authenticated
    })

    /* istanbul ignore else */
    if (WindowService.isDefined && isPersistent) {
      LocalStorage.set(
        this._config.tokenName,
        JSON.stringify(this.token)
      )
    }
  }

  /**
   * Forces token refresh
   */
  public refreshToken () {
    if (!this._driver) {
      throw new Error('Token Driver not set.')
    }

    if (!this._token) {
      return
    }

    if (this._window.isActive) {
      this._auth$.next({
        type: AuthEventType.Refresh,
        token: this._token
      })
    }
  }

  /**
   * Sets user in state.
   * @param user
   */
  public setUser<U extends IUser> (user: U) {
    this._user = user
  }

  /**
   * Returns user from state.
   */
  public get user (): IUser | null {
    return this._user
  }

  /**
   * Return id of currently set user.
   */
  public getUserId (): string | number | null {
    return this._user && this._user.hasOwnProperty('id') && this._user.id
      ? this._user['id'] : null
  }

  /**
   * Checks if token is valid and emits event if not.
   * @param tokenLifeTime
   * @private
   */
  protected isTokenValid (tokenLifeTime: number): boolean {
    if (tokenLifeTime < this._config.validThreshold || tokenLifeTime < 0) {
      this._auth$.next({
        type: AuthEventType.Invalidated
      })

      return false
    }

    return true
  }

  /**
   * Tries to parse value stored in local storage under this._config.tokenName key
   */
  protected parseLocalStorageValue (): Token {
    const localStorageValue = this._driver?.recreateFromStorage(this._config.tokenName)

    if (!localStorageValue) {
      throw new Error('Incorrect value in local storage')
    }

    return localStorageValue
  }

  /**
   * Listens to storage change.
   * When new Token appears in other browser tab.
   */
  protected registerStorageListener () {
    if (WindowService.isDefined) {
      window.addEventListener('storage', () => {
        if (!this._token || !this._driver) {
          return
        }

        try {
          const localStorageValue = this.parseLocalStorageValue()
          const newToken = new this._driver(localStorageValue)

          if (newToken && newToken!.calculateTokenLifetime() > this._token.calculateTokenLifetime()) {
            this.setToken(newToken.token)
          }
        } catch (error) {
          this.deleteToken()
        }
      })
    }
  }

  /**
   * Sets token retrieved from device localstorage.
   */
  protected retrieveToken (): void {
    /* istanbul ignore else */
    if (WindowService.isDefined) {
      const payload: AuthEvent = {
        type: AuthEventType.Booted
      }

      if (!this._driver) {
        throw new Error('Token Driver not set.')
      }

      try {
        const localStorageValue = this.parseLocalStorageValue()

        payload.type = AuthEventType.BootedWithToken
        payload.token = new this._driver(localStorageValue)
        /* istanbul ignore next */
      } catch (error) {
        this.deleteToken()
      }

      this._auth$.next(payload)
    }
  }

  /**
   * Sets refresh behaviour for token.
   * @param tokenLifeTime
   * @param token
   * @private
   */
  protected setupRefreshment (tokenLifeTime: number, token: IToken): void {
    /* istanbul ignore else */
    if (
      tokenLifeTime < this._config.refreshThreshold &&
      tokenLifeTime > this._config.validThreshold
    ) {
      this.compareWithStorage(token)

    } else if (tokenLifeTime > this._config.refreshThreshold) {
      /* istanbul ignore next */
      setTimeout(() => {
        this.compareWithStorage(token)

      }, (tokenLifeTime - this._config.refreshThreshold) * 1000)
    }
  }

  /**
   * Decides whether to use new token or existing one.
   * Fires only if tab is active.
   */
  private compareWithStorage (token: IToken) {
    if (!this._driver) {
      throw new Error('Token Driver not set.')
    }

    try {
      const localStorageValue = this.parseLocalStorageValue()
      const storageToken = new this._driver(localStorageValue)
      const storageTokenLifetime = storageToken.calculateTokenLifetime()
      const tokenLifeTime = token.calculateTokenLifetime()

      if (storageToken && storageTokenLifetime > tokenLifeTime) {
        this.setToken(storageToken.token)
      } else {
        if (this._window.isActive) {
          this._auth$.next({
            type: AuthEventType.Refresh,
            token: token
          })
        }
      }
    } catch (error) {
      this.deleteToken()
    }
  }
}
