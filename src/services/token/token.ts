import { IDateTime, Token } from '../../contracts'
import { MissingParameter } from '../../exceptions/errors'
import { DateTime } from '../datetime'
import { LocalStorage } from '../../support/local-storage'

export abstract class AbstractToken {
  protected _token!: Token
  protected _date!: IDateTime

  protected constructor (token: Token) {
    this._date = new DateTime()
    this._token = token
  }

  /**
   * Check if token is equipped with all necessary properties.
   * @protected
   */
  protected checkRequiredProperties (properties: string[]) {
    properties.forEach((key) =>  {
      // @ts-ignore
      if (!this._token.hasOwnProperty(key) || !this._token[key]) {
        throw new MissingParameter(`Property [${key}] is missing from Authorization Token.`)
      }
    })
  }

  /**
   * Retrieve token from storage.
   */
  public static recreateFromStorage (tokenName: string): Token | null {
    const token: any = JSON.parse(LocalStorage.get(tokenName) as string)

    for (const key of ['accessToken', 'tokenType']) {
      if (!token || !token.hasOwnProperty(key) || token[key] === null) {
        return null
      }
    }

    return token
  }

  /**
   * Returns raw Token data.
   */
  public get token (): Token {
    return this._token
  }

  /**
   * Check if token is refreshable.
   */
  public isRefreshable (): boolean {
    return this._token.hasOwnProperty('expiresAt') && this._token.expiresAt !== null
  }

  /**
   * Calculates for how long token will be still valid.
   */
  public calculateTokenLifetime (): number {
    return this._date.difference(this._token.expiresAt as string)
  }
}
