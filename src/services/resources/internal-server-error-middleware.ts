import { FoundResource, ConnectorMiddleware } from '@/contracts/connector.ts'
import { Headers, IResponse, Payload } from '@/contracts/http'

import { Injectable } from '@/container'
import { InternalServerError } from '@/exceptions/errors'

@Injectable()
export class InternalServerErrorMiddleware implements ConnectorMiddleware {
  constructor () {}

  /**
   * Method to be called after call execution.
   * It handles side effects.
   */
  public afterCall (response: IResponse): void {
    if (response.status === 500) {
      // @ts-ignore
      throw new InternalServerError(response.errors['message'])
    }
  }

  /**
   * Method to be called before call execution.
   * It can transform headers and body for a given resource.
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    return { headers, body }
  }
}
