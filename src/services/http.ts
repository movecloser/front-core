import { injectable } from 'inversify'

import {
  DriverRegistry,
  Headers,
  IDriver,
  IHttp, IHttpConnector,
  IResponse,
  Payload
} from '@/contracts/http'
import { IncorrectCall } from '@/exceptions/errors'
import { HttpDriver } from '@/services/http/http-driver'

/**
 * Http Connector is service class that provides http functionality.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class HttpConnector implements IHttpConnector {
  private _defaultDestination: string|null
  private _drivers: DriverRegistry

  constructor (drivers: DriverRegistry = {}, defaultDestination: string|null = null) {
    this._defaultDestination = defaultDestination
    this._drivers = drivers
  }

  /**
   * Return instance of requested destination driver.
   * @param destination
   */
  public destination (destination: string): HttpDriver {
    if (!this._drivers.hasOwnProperty(destination)) {
      throw new IncorrectCall(`HttpConnector has no driver matching given destination [${destination}] defined.`)
    }

    return this._drivers[destination]
  }

  /**
   * Registering new destination.
   * @param name
   * @param driver
   * @param setAsDefault
   */
  public register (name: string, driver: HttpDriver, setAsDefault: boolean = false): void {
    if (this._drivers.hasOwnProperty(name)) {
      throw new IncorrectCall(`Destination with name: [${name}], has been already registered.`)
    }

    if (!driver) {
      throw new IncorrectCall(`Cannot register destination without driver specified.`)
    }

    this._drivers[name] = driver

    if (setAsDefault) {
      this.setDefaultDestination(name)
    }
  }

  /**
   * Setter for default destination field.
   * Value cannot be override during runtime.
   *
   * @param name
   */
  public setDefaultDestination (name: string): void {
    if (this._defaultDestination !== null) {
      throw new IncorrectCall('Default destination already set. Cannot override.')
    }

    if (!name) {
      throw new IncorrectCall('Cannot set default destination without name specified.')
    }

    if (!this._drivers.hasOwnProperty(name)) {
      throw new IncorrectCall(`Cannot set default destination [${name}] that hasn't been registered.`)
    }

    this._defaultDestination = name
  }

  /**
   * Perform delete http request.
   */
  public delete (target: string, data: Payload = {}, headers: Headers = {}, options = null): Promise<IResponse> {
    return this.defaultDriver.delete(target, data, headers, options)
  }

  /**
   * Perform get http request.
   */
  public get (target: string, params: Payload = {}, headers: Headers = {}, options = null): Promise<IResponse> {
    return this.defaultDriver.get( target, params, headers, options)
  }

  /**
   * Perform post http request.
   */
  public post (target: string, data: Payload = {}, headers: Headers = {}, options = null): Promise<IResponse> {
    return this.defaultDriver.post(target, data, headers, options)
  }

  /**
   * Perform put http request.
   */
  public put (target: string, data: Payload, headers: Headers = {}, options = null): Promise<IResponse> {
    return this.defaultDriver.put( target, data, headers, options)
  }

  /**
   *
   * @private
   */
  private get defaultDriver(): HttpDriver {
    return  this._drivers[this._defaultDestination as string]
  }
}
