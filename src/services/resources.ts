import { injectable } from 'inversify'

import { Headers, IHttp, IResponse, Methods, Payload } from '@/contracts/http'
import {
  FoundResource,
  IResourcesMiddleware,
  Params,
  Resource,
  ResourcesRegistry
} from '@/contracts/resources'
import { IResources } from '@/contracts/resources'
import { InternalServerError } from '@/exceptions/errors'

/**
 * Resources is a service class that provides unified access to the API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class Resources implements IResources {
  private readonly _http: IHttp
  private _list: ResourcesRegistry
  private _middlewares: IResourcesMiddleware[]

  constructor (
    list: ResourcesRegistry,
    httpService: IHttp,
    middlewares: IResourcesMiddleware[]

  ) {
    this._list = list
    this._http = httpService
    this._middlewares = middlewares
  }

  /**
   * Call to resource.
   */
  async call (
    resource: string,
    action: string,
    params: Params = {},
    body: Payload = {},
    headers: Headers = {},
    responseType = 'json'
  ): Promise<IResponse> {
    const res: FoundResource = this.get(resource, action, params)

    if (res.shorthand === null) {
      res.shorthand = this.resolveShorthand(resource, action)
    }

    for (const middleware of this._middlewares) {
      const afterBefore = middleware.beforeCall(res, headers, body)
      headers = afterBefore.headers
      body = afterBefore.body
    }

    const response: IResponse = await this._http[res.method](res.url, body, headers, responseType)

    // TODO: Move to middleware
    if (response.status === 500) {
      // @ts-ignore
      throw new InternalServerError(response.errors.message)
    }

    for (const middleware of this._middlewares) {
      middleware.afterCall(response)
    }

    return response
  }

  /**
   * Return resource address.
   */
  get (resource: string, action: string, params: Params = {}): FoundResource {
    this.checkIfActionOfResourceExists(resource, action)

    const endpoint: Resource = this._list[resource].methods[action]

    if (!Object.values(Methods).includes(endpoint.method)) {
      throw new Error(
        `Method not allowed: [${endpoint.method}]`
      )
      // If error add:
      // "compilerOptions": {
      //  "lib": ["es2017"]
      // }
    }

    const url: string = Resources.buildUrl(
      this._list[resource].prefix,
      endpoint,
      params
    )

    const form = (endpoint.hasOwnProperty('formName') && typeof endpoint.formName !== 'undefined')
      ? endpoint.formName : null

    return {
      method: endpoint.method,
      url: url,
      shorthand: form,
      auth: endpoint.hasOwnProperty('auth') && typeof endpoint.auth !== 'undefined'
        ? endpoint.auth : false
    }
  }

  /**
   * Merges given list with existing one.
   */
  register (list: ResourcesRegistry): void {
    this._list = { ...this._list, ...list }
  }

  /**
   * Build full url based on resource from routing list.
   */
  private static buildUrl (prefix: string|null, endpoint: Resource, params: Params) {
    let url: string = endpoint.url

    if (endpoint.hasOwnProperty('params') && typeof endpoint.params !== 'undefined') {
      Resources.checkIfAllParamsProvided(endpoint.params, params)

      for (const [key, value] of Object.entries(params)) {
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
        'There is no such resource in resources [list].'
      )
    }
    if (!this._list[resource].methods[action]) {
      throw new Error(
        'There is no such action in actions [list].'
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
  private resolveShorthand (resource: string, action: string): string {
    const first = resource.substr(0, 1)

    return `${action}${first.toUpperCase()}${resource.substr(1, resource.length)}`
  }
}
