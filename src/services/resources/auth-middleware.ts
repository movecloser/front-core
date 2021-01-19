import { injectable } from 'inversify'

import { Authorization, FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'

@injectable()
export class AuthMiddleware implements IResourcesMiddleware {
  constructor (protected authService: Authorization) {}

  /**
   * Method to be called after call execution.
   * It handles side effects.
   * @param response
   */
  public afterCall (response: IResponse): void {}

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   * @param resource
   * @param headers
   * @param body
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

export const authMiddleare: symbol = Symbol.for('AuthMiddleware')
