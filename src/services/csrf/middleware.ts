// Copyright (c) 2022 Move Closer

import { ConnectorMiddleware, CSRFConfig, FoundResource, Headers, ICSRFService, Payload } from '../../contracts'

import { Injectable } from '../../container'

/**
 * @author Agnieszka Zawadzka <agnieszka.zawadzka@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 */
@Injectable()
export class CSRFMiddleware implements ConnectorMiddleware {
  private _config: CSRFConfig

  constructor (private _csrfService: ICSRFService) {
    this._config = this._csrfService.getConfig()
  }

  /**
   * Method to be called after call execution.
   * It handles side effects.
   */
  public afterCall (): void {}

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   */
  public async beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    if (resource.meta?.csrf) {
      const csrf = await this._csrfService.getToken(resource, headers, body)

      if (this._config.sendAsBody) {
        body = { ...body, [this._config.paramName]: csrf }
      } else {
        headers = { ...headers, [this._config.paramName]: csrf }
      }
    }

    return { headers, body }
  }
}
