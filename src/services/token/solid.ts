// Copyright (c) 2021 Move Closer

import { IDateTime, IToken, Token } from '../../contracts'
import { AbstractToken } from './token'

/**
 * Solid Token Driver Class
 */
export class SolidToken extends AbstractToken implements IToken {
  constructor (token: Token, date: IDateTime) {
    super(token, date)

    this.checkRequiredProperties(['accessToken'])
  }

  /**
   * Returns string representing key used as access token.
   */
  public get accessToken (): string {
    return this._token['accessToken']
  }

  /**
   * Returns string representing key used to refresh token.
   */
  public get refreshToken (): string {
    return ''
  }

  /**
   * Check if token is refreshable (overridden).
   */
  public isRefreshable (): boolean {
    return false
  }
}
