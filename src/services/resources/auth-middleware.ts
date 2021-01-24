import { Authorization, FoundResource, ConnectorMiddleware } from '../../contracts/connector'
import { Headers, IResponse, Payload } from '../../contracts/http'

import { Injectable } from '../../container'

@Injectable()
export class AuthMiddleware implements ConnectorMiddleware {
  constructor (protected authService: Authorization) {}

  /**
   * Method to be called after call execution.
   * It handles side effects.
   */
  public afterCall (response: IResponse): void {}

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    if (resource.auth || this.authService.check()) {
      headers = {
        ...headers,
        ...this.authService.getAuthorizationHeader()
      }
    }

    return { headers, body }
  }
}
