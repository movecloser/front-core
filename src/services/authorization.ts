import { ReplaySubject, Subscription } from 'rxjs'

import { Injectable } from '../container'

import {
  AuthConfig,
  Authentication,
  AuthEvent,
  AuthEventCallback,
  AuthEventType,
  AuthHeader,
  IUser,
  Token
} from '../contracts/authentication'
import { IDateTime } from '../contracts/services'
import { LocalStorage } from '../support/local-storage'
import { WindowService } from './window'

@Injectable()
export class AuthService implements Authentication <IUser> {
  private _auth$!: ReplaySubject<AuthEvent>
  private _token: Token | null = null
  private _user: IUser | null = null

  constructor (private _config: AuthConfig, private _date: IDateTime) {
    this._auth$ = new ReplaySubject<AuthEvent>(2)
    this._auth$.next({
      type: AuthEventType.Booting
    })

    this.retrieveToken()
  }

  /**
   * Returns if user is logged-in.
   */
  public check (): boolean {
    if (!this._token) {
      return false
    }

    if (!this.isRefreshable(this._token as Token)) {
      return this._token !== null && !!this._token.accessToken
    }

    return this._token !== null &&
      this.calculateTokenLifetime(this._token) > this._config.validThreshold
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
    return this._token
  }

  /**
   * Sets Token to state.
   * @param token
   */
  public setToken (token: Token) {
    if (this.isRefreshable(token)) {
      const tokenLifeTime = this.calculateTokenLifetime(token)

      /* istanbul ignore else */
      if (this.isTokenValid(tokenLifeTime)) {
        this.setupRefreshment(tokenLifeTime, token)
      }
    }

    this._token = token

    this._auth$.next({
      type: AuthEventType.Authenticated
    })

    /* istanbul ignore else */
    if (WindowService.isDefined) {
      LocalStorage.set(
        this._config.tokenName,
        JSON.stringify(this.token)
      )
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
   * Calculates for how long token will be still valid.
   * @private
   */
  private calculateTokenLifetime (token: Token): number {
    return this._date.difference(token.expiresAt as string)
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
   * Sets token retrieved from device localstorage.
   */
  protected retrieveToken (): void {
    /* istanbul ignore else */
    if (WindowService.isDefined) {
      const payload: AuthEvent = {
        type: AuthEventType.Booted
      }

      try {
        const token: any = JSON.parse(
          LocalStorage.get(this._config.tokenName) as string
        )

        for (const key of ['accessToken', 'tokenType']) {
          if (!token || !token.hasOwnProperty(key) || token[key] === null) {
            break
          }

          payload.type = AuthEventType.BootedWithToken
          payload.token = token
        }
      /* istanbul ignore next */
      } catch (error) {}

      this._auth$.next(payload)
    }
  }

  protected isRefreshable (token: Token): boolean {
    return token.hasOwnProperty('expiresAt') && token.expiresAt !== null
  }

  /**
   * Sets refresh behaviour for token.
   * @param tokenLifeTime
   * @param token
   * @private
   */
  protected setupRefreshment (tokenLifeTime: number, token: Token): void {
    if (
      tokenLifeTime < this._config.refreshThreshold &&
      tokenLifeTime > this._config.validThreshold
    ) {
      this._auth$.next({
        type: AuthEventType.Refresh,
        token: token
      })
      /* istanbul ignore else */
    } else if (tokenLifeTime > this._config.refreshThreshold) {
      /* istanbul ignore next */
      setTimeout(() => {
        this._auth$.next({
          type: AuthEventType.Refresh,
          token: token
        })
      }, tokenLifeTime - this._config.refreshThreshold * 1000)
    }
  }
}
