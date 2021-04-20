import { IToken, Token } from '../../contracts'
import { AbstractToken } from './token'

/**
 * Double Token Driver Class
 */
export class DoubleToken  extends AbstractToken implements IToken {
  constructor (token: Token) {
    super(token)

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
