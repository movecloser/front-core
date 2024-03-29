// Copyright (c) 2021 Move Closer

import { IDateTime, IToken, Token } from '../../contracts'
import { AbstractToken } from './token'

/**
 * Double Token Driver Class
 */
export class DoubleToken extends AbstractToken implements IToken {
  constructor (token: Token, date: IDateTime) {
    super(token, date)

    this.checkRequiredProperties(['accessToken', 'refreshToken'])
  }

  /**
   * Returns string representing key used as access token.
   */
  public get accessToken (): string {
    return this._token['accessToken']
  }

  /**
   * Returns string representing key used to refresh token
   */
  public get refreshToken (): string {
    return this._token['refreshToken'] as string
  }
}
