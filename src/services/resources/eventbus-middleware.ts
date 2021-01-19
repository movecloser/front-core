import { FoundResource, IResourcesMiddleware } from '@/contracts/resources'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { TemporaryUnavailableError } from '@/exceptions/errors'
import { IEventbus } from '@/contracts/eventbus'

export class EventbusMiddleware implements  IResourcesMiddleware {
  constructor (protected eventbus: IEventbus) {}

  public afterCall (response: IResponse): void {
    if (response.status === 503) {
      this.eventbus.emit('maintenance')

      // @ts-ignore // TODO: Option to handle different api.
      throw new TemporaryUnavailableError(response.errors.message)
    }
  }

  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    return { headers, body }
  }
}
