import { BehaviorSubject } from 'rxjs'

import { Injectable } from '../container'

import {
  AuthConfig,
  Authentication,
  AuthEvent,
  AuthEventType,
  AuthHeader,
  IUser,
  Token
} from '../contracts/authentication'
import { IDateTime } from '../contracts/services'
import { LocalStorage } from '../support/local-storage'
import { WindowService } from './window'

@Injectable()
export class AuthService<U extends IUser> implements Authentication <U> {
  private _auth$!: BehaviorSubject<AuthEvent>
  private _token: Token | null = null
  private _user: U | null = null

  constructor (private _config: AuthConfig, private _date: IDateTime) {
    this._auth$ = new BehaviorSubject<AuthEvent>({
      type: AuthEventType.Booting
    })

    this.retrieveToken()
  }

  /**
   * Returns if user is logged-in.
   */
  public check (): boolean {
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
    /* istanbul ignore else */
    if (WindowService.isDefined) {
      LocalStorage.set(
        this._config.tokenName,
        JSON.stringify(this.token)
      )
    }
    const tokenLifeTime = this.calculateTokenLifetime(token)

    if (this.isTokenValid(tokenLifeTime)) {
      this.setupRefreshment(tokenLifeTime, token)

      this._token = token
    }
  }

  /**
   * Sets user in state.
   * @param user
   */
  public setUser (user: U) {
    this._user = user
  }

  /**
   * Returns user from state.
   */
  public get user (): U | null {
    return this._user
  }

  /**
   * Calculates for how long token will be still valid.
   * @private
   */
  private calculateTokenLifetime (token: Token): number {
    return this._date.difference(token.expiresAt)
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
      let token: any

      try {
        token = JSON.parse(
          LocalStorage.get(this._config.tokenName) as string
        )
      } catch (error) {
        token = null
      }

      for (const key of ['accessToken', 'expiresAt', 'tokenType']) {
        if (token && (key in token || token[key] !== null)) {
          continue
        }

        return
      }

      const tokenLifeTime = this.calculateTokenLifetime(token)

      if (this.isTokenValid(tokenLifeTime)) {
        this.setupRefreshment(tokenLifeTime, token)

        this._token = token
      }

      this._auth$.next({
        type: AuthEventType.Booted
      })
    }
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
    } else if (tokenLifeTime > this._config.refreshThreshold) {
      setTimeout(() => {
        this._auth$.next({
          type: AuthEventType.Refresh,
          token: token
        })
      }, tokenLifeTime - this._config.refreshThreshold * 1000)
    }
  }
}
