// import { IEventbus } from '@/contracts/eventbus'
import { Headers, IHttp, IResponse, Payload } from '@/contracts/http'
import { Response } from '@/services/http/response'

export abstract class HttpDriver implements IHttp {
  protected _debug: boolean

  constructor (debug?: boolean) {
    this._debug = !!debug
  }

  /**
   * Perform delete http request.
   */
  public delete (
    target: string,
    data: Payload = {},
    headers: Headers = {},
    options = null
  ): Promise<IResponse> {
    return this._call('delete', target, data, headers, options)
  }

  /**
   * Perform get http request.
   */
  public get (
    target: string,
    params: Payload = {},
    headers: Headers = {},
    options = null
  ): Promise<IResponse> {
    return this._call('get', target, params, headers, options)
  }

  /**
   * Perform post http request.
   */
  public post (
    target: string,
    data: Payload = {},
    headers: Headers = {},
    options = null
  ): Promise<IResponse> {
    return this._call('post', target, data, headers, options)
  }

  /**
   * Perform put http request.
   */
  public put (
    target: string,
    data: Payload,
    headers: Headers = {},
    options = null
  ): Promise<IResponse> {
    return this._call('put', target, data, headers, options)
  }

  protected async abstract _call (
    method: string,
    target: string,
    data: Payload,
    headers: Headers,
    options?: any
  ): Promise<IResponse>

  protected _logResponse (target: string, method: string, status: number, request: any, response: any): void {
    if (this._debug) {
      let toLog: any = {
        target, method, status, request, response
      }
      /* eslint no-console: off */
      console.log(toLog)
    }
  }

  protected composeSuccessResponse (status: number, data: any, headers: any): IResponse {
    return new Response(status, data, headers)
  }

  protected composeFailResponse (status: number, data: any, headers: any, errors: any): IResponse {
    return new Response(status, data, headers, errors)
  }
}