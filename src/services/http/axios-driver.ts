import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios'
import { axios as axiosConfig, common } from '@/config/http'
import { DriverConfig, Headers, IDriver, IResponse, Methods, Payload } from '@/contracts/http'
import { Response } from './response'

/**
 * Instantiate and return AxiosDriver instance.
 */
export function axiosFactory (): IDriver {
  return new AxiosDriver(axiosConfig, common)
}

/**
 * Provides axios instance for http calls.
 *
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
export class AxiosDriver implements IDriver {
  private config: DriverConfig
  private instance: AxiosInstance

  constructor (axiosConfig: AxiosRequestConfig, driverConfig: DriverConfig) {
    this.config = driverConfig
    this.instance = axios.create(axiosConfig)
  }

  /**
   * Performs http request using axios.
   */
  async request (method: Methods, target: string, data: Payload, headers: Headers, responseType: ResponseType = 'json'): Promise<IResponse> {
    const responseInstance = await this.instance.request({
      method: method,
      url: target,
      ...AxiosDriver.composePayload(data, method),
      headers: headers,
      responseType: responseType
    })
      .then((response: AxiosResponse) => {
        this.postActions(response)
        return new Response(response.status, response.data, response.headers)
      })
      .catch((error: AxiosError) => {
        if (error.hasOwnProperty('response') && typeof error.response !== 'undefined') {
          this.postActions(error.response)
          return new Response(
            error.response.status,
            {},
            error.response.headers,
            error.response.data
          )
        }

        return new Response(0, {}, {}, { message: 'Unxpected request error.' })
      })

    return responseInstance
  }

  /**
   * Constructing payload based on axios requirements.
   */
  private static composePayload (data: Payload, method: Methods) {
    return method === 'get' ? { params: data } : { data: data }
  }

  /**
   * Actions call after response arrival.
   */
  private postActions (response: AxiosResponse) {
    if (this.config.logResponse) {
      let toLog: any

      if (this.config.simpleLog) {
        toLog = {
          status: response.status,
          method: response.config.method,
          target: `${response.config.baseURL}${response.config.url}`,
          params: response.config.params,
          response: response.data
        }
      } else {
        toLog = response
      }
      /* eslint no-console: off */
      console.log(toLog)
    }
  }
}
