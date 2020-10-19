import { injectable } from 'inversify'
import { Observable } from 'rxjs'

export interface IStreamBus {
  get (stream: string): Observable<any>
  register (stream: string, factory: StreamFactory, force?: boolean): boolean
  unregister (stream: string): boolean
}

export const StreamBusType = Symbol.for('IStreamBus')

export type StreamFactory = () => Observable<any>

export interface StreamList {
  [key: string]: StreamFactory
}

interface StreamRegistry {
  [key: string]: Observable<any>
}

/**
 * Provides access to stream based bus channels.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class StreamBus implements IStreamBus {
  private _registry: StreamRegistry = {}

  constructor (streams: StreamList) {
    for (const [n, f] of Object.entries(streams)) {
      this.register(n, f)
    }
  }

  public get (stream: string): Observable<any> {
    if (!this._registry.hasOwnProperty(stream)) {
      throw new Error(`Stream [${stream}] does not exist.`)
    }

    return this._registry[stream]
  }

  public register (stream: string, factory: StreamFactory, force: boolean = false): boolean {
    if (this._registry.hasOwnProperty(stream) && !force) {
      throw new Error(`Stream [${stream}] already exists.`)
    }

    this._registry[stream] = factory()
    return true
  }

  public unregister (stream: string): boolean {
    return delete this._registry[stream]
  }
}
