import { injectable } from 'inversify'
import {
  DriverRegistry,
  Handler,
  Headers,
  IDriver,
  IHttp,
  IResponse,
  Payload
} from '@/contracts/http'
import { IEventbus } from '@/contracts/eventbus'

/**
 * Http is service class that provides http functionality.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class Http implements IHttp {
  private _driver: IDriver|null = null
  private _chosen: string
  private _drivers: DriverRegistry = {}
  private _eventbus: IEventbus
  private _handlers: Handler[] = []

  constructor (drivers: DriverRegistry, chosen: string, handlers: Handler[], eventbus: IEventbus) {
    this._chosen = chosen
    this._drivers = drivers
    this._eventbus = eventbus
    this._handlers = handlers
  }

  by (driver: string): Http {
    this._driver = this.buildDriver(driver)
    return this
  }

  /**
   * Perform delete http request.
   */
  delete (target: string, data: Payload = {}, headers: Headers = {}): Promise<IResponse> {
    return this.call('delete', target, data, headers)
  }

  /**
   * Perform get http request.
   */
  get (target: string, params: Payload = {}, headers: Headers = {}, responseType = 'json'): Promise<IResponse> {
    return this.call('get', target, params, headers, responseType)
  }

  /**
   * Perform post http request.
   */
  post (target: string, data: Payload = {}, headers: Headers = {}):Promise<IResponse> {
    return this.call('post', target, data, headers)
  }

  /**
   * Perform put http request.
   */
  put (target: string, data: Payload, headers: Headers = {}): Promise<IResponse> {
    return this.call('put', target, data, headers)
  }

  /**
   * Build driver from existing in list.
   */
  protected buildDriver (driver: string): IDriver {
    if (!this._drivers.hasOwnProperty(driver)) {
      throw new Error(
        'Invalid http drivers configuration.'
      )
    }
    // We need to create new instance of chosen driver. To do this we use
    // a list of all available drivers from var [drivers]. This list contains
    // references to factory functions. What left to do is just call this reference
    // which gives us correct instance.
    return this._drivers[driver]()
  }

  /**
   * Call to api using driver.
   */
  protected async call (method: string, target: string, data: Payload, headers: Headers, responseType: any = 'json'): Promise<IResponse> {
    if (this._driver === null) {
      this._driver = this.buildDriver(this._chosen)
    }

    const response: Promise<IResponse> = this._driver.request(method, target, data, headers, responseType)
      .then((response: IResponse) => {
        this.handleResponse(response)
        return response
      })

    this._driver = null
    return response
  }

  /**
   * Handle default behaviours for certain response.
   */
  protected handleResponse (response: IResponse) {
    for (const h of this._handlers) {
      h(response, this._eventbus)
    }
  }
}
