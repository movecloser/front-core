import { injectable } from 'inversify'

import { IEventbus } from '@/contracts/eventbus'
import { Headers, IHttp, IResponse, Methods, Payload } from '@/contracts/http'
import {
  Authorization,
  FoundResource,
  Resource,
  ResourcesRegistry,
  Params
} from '@/contracts/resources'
import { IValidation } from '@/contracts/validation'
import { ILocalizationService } from '@/platforms/vue/localization'
import { IResources } from '@/contracts/resources'
import { InternalServerError, TemporaryUnavailableError } from '@/exceptions/errors'

/**
 * Resources is a service class that provides unified access to the API.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class Resources implements IResources {
  private _auth: Authorization
  private _eventbus: IEventbus
  private readonly _http: IHttp
  private _list: ResourcesRegistry
  private _validation: IValidation
  private readonly _localizationService: ILocalizationService

  constructor (
    list: ResourcesRegistry,
    httpService: IHttp,
    authService: Authorization,
    validationService: IValidation,
    eventBus: IEventbus,
    localizationService: ILocalizationService
  ) {
    this._list = list
    this._http = httpService
    this._auth = authService
    this._validation = validationService
    this._eventbus = eventBus
    this._localizationService = localizationService
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
    const form: string = res.formName !== null
      ? res.formName : this.resolveFormName(resource, action)

    if (res.auth || this._auth.check()) {
      headers = {
        ...headers,
        ...this._auth.getAuthorizationHeader()
      }
    }

    headers = {
      ...headers,
      ...this._localizationService.getLocalizationHeaders()
    }

    this._validation.clearForm(form)

    const response: IResponse = await this._http[res.method](res.url, body, headers, responseType)

    if (response.status === 422) {
      this._validation.pushErrors(
        form,
        response.errors !== null ? response.errors.errors : {}
      )
    }

    if (response.status === 500) {
      // @ts-ignore
      throw new InternalServerError(response.errors.message)
    }

    if (response.status === 503) {
      this._eventbus.emit('maintenance')
      // @ts-ignore
      throw new TemporaryUnavailableError(response.errors.message)
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
      formName: form,
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
        'There is no such action in actions list.'
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
  private resolveFormName (resource: string, action: string): string {
    const first = resource.substr(0, 1)

    return `${action}${first.toUpperCase()}${resource.substr(1, resource.length)}`
  }
}
