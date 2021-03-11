import {
  ConnectorMiddleware,
  FoundResource,
  Params,
  Resource,
  ResourcesRegistry, ResponseType
} from '../contracts/connector'
import { Headers, IHttpConnector, IResponse, Payload } from '../contracts/http'
import { IConnector } from '../contracts/connector'

import { Injectable } from '../container'

/**
 * ApiConnector is a service class that provides unified access to the REST API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
@Injectable()
export class ApiConnector implements IConnector {
  private readonly _http: IHttpConnector
  private _list: ResourcesRegistry
  private _middlewares: ConnectorMiddleware[]

  constructor (
    list: ResourcesRegistry,
    httpConnector: IHttpConnector,
    middlewares: ConnectorMiddleware[]
  ) {
    this._list = list
    this._http = httpConnector
    this._middlewares = middlewares
  }

  /**
   * Call to resource.
   */
  public async call (
    resource: string,
    action: string,
    params: Params = {},
    body: Payload = {},
    headers: Headers = {},
    responseType = ResponseType.Json
  ): Promise<IResponse> {
    const res: FoundResource = this.findResource(resource, action, params)

    for (const middleware of this._middlewares) {
      const afterBefore = middleware.beforeCall(res, headers, body)
      headers = afterBefore.headers
      body = afterBefore.body
    }

    const response: IResponse = await this._http.destination(res.connection)[res.method](
      res.url,
      body,
      headers,
      { responseType }
    )

    for (const middleware of this._middlewares) {
      middleware.afterCall(response)
    }

    return response
  }

  /**
   * Return resource address.
   */
  public findResource (resource: string, action: string, params: Params = {}): FoundResource {
    this.checkIfActionOfResourceExists(resource, action)

    const endpoint: Resource = this._list[resource].methods[action]

    const connection: string | undefined = this._list[resource].connection
    const url: string = ApiConnector.buildUrl(
      this._list[resource].prefix,
      endpoint,
      params
    )

    return {
      connection: typeof connection !== 'undefined' ? connection : this._http.defaultDestination(),
      method: endpoint.method,
      url: url,
      shorthand: ('shorthand' in endpoint && typeof endpoint.shorthand !== 'undefined')
        ? endpoint.shorthand : ApiConnector.resolveShorthand(resource, action),
      auth: ('auth' in endpoint && typeof endpoint.auth !== 'undefined') ? endpoint.auth : false,
      meta: 'meta' in endpoint && typeof endpoint.meta === 'object' && endpoint.meta !== null
        ? endpoint.meta : {}
    }
  }

  /**
   * Merge given list with existing middlewares.
   */
  public useMiddlewares (list: ConnectorMiddleware[]): void {
    this._middlewares = { ...this._middlewares, ...list }
  }

  /**
   * Merge given list with existing registry..
   */
  public useResources (list: ResourcesRegistry): void {
    this._list = { ...this._list, ...list }
  }

  /**
   * Build full url based on resource from routing list.
   */
  private static buildUrl (prefix: string | null, endpoint: Resource, params: Params) {
    let url: string = endpoint.url

    if (endpoint.hasOwnProperty('params') && typeof endpoint.params !== 'undefined') {
      ApiConnector.checkIfAllParamsProvided(endpoint.params, params)

      for (const [ key, value ] of Object.entries(params)) {
        url = url.replace(`{${key}}`, value as string)
      }
    }

    if (typeof prefix === 'string' && prefix.length) {
      url = prefix + '/' + url
    }

    return url
  }

  /**
   * Checks if given resource exists.
   */
  private checkIfActionOfResourceExists (resource: string, action: string): void {
    if (!this._list[resource]) {
      throw new Error(
        `There is no such resource [${resource}] in resources list.`
      )
    }
    /* istanbul ignore else */
    if (!this._list[resource].methods[action]) {
      throw new Error(
        `There is no such action [${resource} ${action}] in actions list.`
      )
    }
  }

  /**
   * Compares endpoint parameters with given parameters.
   */
  private static checkIfAllParamsProvided (endpointParams: string[], givenParams: Params) {
    const givenKeys = Object.keys(givenParams)
    for (const param of endpointParams) {
      if (!givenKeys.includes(param)) {
        throw new Error(
          `Missing required parameter: ${param}.`
        )
      }
    }
  }

  /**
   * Resolve form name by resource & action.
   */
  private static resolveShorthand (resource: string, action: string): string {
    const first = resource.substr(0, 1)

    return `${action}${first.toUpperCase()}${resource.substr(1, resource.length)}`
  }
}
