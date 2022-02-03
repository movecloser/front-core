// Copyright (c) 2022 Move Closer

import { CSRFConfig, FoundResource, Headers, ICSRFService, IHttpConnector, Payload } from '../../contracts'
import { Injectable } from '../../container'

/**
 * CSRF service is responsible for appending a CSRF token to requests.
 *
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
@Injectable()
export abstract class CSRFService implements ICSRFService {
  constructor (protected _config: CSRFConfig, protected _http: IHttpConnector) {}

  /**
   * @inheritDoc
   */
  public getConfig (): CSRFConfig {
    return this._config
  }

  /**
   * @inheritDoc
   */
  public async getToken (resource: FoundResource, headers: Headers, body: Payload): Promise<string> {
    const payload = this.composePayload(resource, headers, body)

    let response
    if (typeof this._config.source === 'string') {
      response = await this._http.post(this._config.source, payload)
    } else {
      const { connection, method, url } = this._config.source
      response = await this._http.destination(connection)[method](url, payload)
    }

    return this.retrieveTokenFromResponse(response.data)
  }

  /**
   * Compose payload that will be send.
   */
  protected abstract composePayload (resource: FoundResource, headers: Headers, body: Payload): Payload

  /**
   * Retrieve token from response.
   */
  protected abstract retrieveTokenFromResponse (data: Payload): string
}
