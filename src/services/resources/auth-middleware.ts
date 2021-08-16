import { AuthProvider } from '../../contracts/authentication'
import { FoundResource, ConnectorMiddleware } from '../../contracts/connector'
import { Headers, Payload } from '../../contracts/http'

import { Injectable } from '../../container'

@Injectable()
export class AuthMiddleware implements ConnectorMiddleware {
  constructor (protected authProvider: AuthProvider) {
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
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    if (resource.auth && this.authProvider.check()) {
      headers = {
        ...headers,
        ...this.authProvider.getAuthorizationHeader()
      }
    }

    return { headers, body }
  }
}
