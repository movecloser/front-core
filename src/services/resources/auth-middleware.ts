import { Authorization, FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'

  // @injectable
export class AuthMiddleware implements IResourcesMiddleware {
  constructor (protected authService: Authorization) {}

  //
  public afterCall (response: IResponse): void {}

  //
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
