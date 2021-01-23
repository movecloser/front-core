import { Observable } from 'rxjs'

import { IStreamBus, StreamFactory, StreamList, StreamRegistry } from '@/contracts/services'

import { IncorrectValueError } from '@/exceptions/errors'
import { Injectable } from '@/container'

/**
 * Provides access to stream based bus channels.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class StreamBus implements IStreamBus {
  private _registry: StreamRegistry = {}

  constructor (streams: StreamList) {
    for (const [n, f] of Object.entries(streams)) {
      this.register(n, f)
    }
  }

  public get (stream: string): Observable<any> {
    if (!this._registry.hasOwnProperty(stream)) {
      throw new IncorrectValueError(`Stream [${stream}] does not exist.`)
    }

    return this._registry[stream]
  }

  public register (stream: string, factory: StreamFactory, force: boolean = false): boolean {
    if (this._registry.hasOwnProperty(stream) && !force) {
      throw new IncorrectValueError(`Stream [${stream}] already exists.`)
    }

    this._registry[stream] = factory()
    return true
  }

  public unregister (stream: string): boolean {
    if (!this._registry.hasOwnProperty(stream)) {
      return false
    }

    return delete this._registry[stream]
  }
}
