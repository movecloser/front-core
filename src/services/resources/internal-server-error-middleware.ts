import { injectable } from 'inversify'

import { FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { InternalServerError } from '@/exceptions/errors'

@injectable()
export class InternalServerErrorMiddleware implements IResourcesMiddleware {
  constructor () {}

  /**
   * Method to be called after call execution.
   * It handles side effects.
   * @param response
   */
  public afterCall (response: IResponse): void {
    if (response.status === 500) {
      // @ts-ignore
      throw new InternalServerError(response.errors.message)
    }
  }

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   * @param resource
   * @param headers
   * @param body
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    return { headers, body }
  }
}

export const internalServerMiddleware: symbol = Symbol.for('InternalServerErrorMiddleware')
