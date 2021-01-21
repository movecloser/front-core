import { injectable } from 'inversify'

import { FoundResource, ConnectorMiddleware } from '@/contracts/connector.ts'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { TemporaryUnavailableError } from '@/exceptions/errors'
import { IEventbus } from '@/contracts/eventbus'

@injectable()
export class EventbusMiddleware implements  ConnectorMiddleware {
  constructor (protected eventbus: IEventbus) {}

  /**
   * Method to be called after call execution.
   * It handles side effects.
   * @param response
   */
  public afterCall (response: IResponse): void {
    if (response.status === 503) {
      this.eventbus.emit('maintenance')

      // @ts-ignore // TODO: Option to handle different api.
      throw new TemporaryUnavailableError(response.errors.message)
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

export const eventbusMiddleware: symbol = Symbol.for('EventbusMiddleware')
