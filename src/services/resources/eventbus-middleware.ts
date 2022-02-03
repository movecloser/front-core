// Copyright (c) 2021 Move Closer

import { ConnectorMiddleware, FoundResource } from '../../contracts/connector'
import { Headers, IResponse, Payload } from '../../contracts/http'
import { IEventbus } from '../../contracts/eventbus'

import { Injectable } from '../../container'
import { TemporaryUnavailableError } from '../../exceptions/errors'

@Injectable()
export class EventbusMiddleware implements ConnectorMiddleware {
  constructor (protected eventbus: IEventbus) {
  }

  /**
   * Method to be called after call execution.
   * It handles side effects.
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
   */
  public beforeCall (resource: FoundResource, headers: Headers, body: Payload) {
    return { headers, body }
  }
}
