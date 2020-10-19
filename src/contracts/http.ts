import { IEventbus } from './eventbus'

export interface DriverConfig {
  logResponse: boolean
  simpleLog: boolean
}

export type DriverFactory = () => IDriver

export type DriverRegistry = {
  [key: string]: DriverFactory
}

export type Handler = (response: IResponse, eventbus: IEventbus) => void

export type Headers = {
  [key: string]: string
}

export enum Methods {
  Delete = 'delete',
  Get = 'get',
  Post = 'post',
  Put = 'put'
}

export type HttpFactory = () => IHttp

export const HttpType = Symbol.for('IHttp')

export interface IDriver {
  request (method: string, target: string, data: Payload, headers: Headers, responseType: any): Promise<IResponse>
}

export interface IHttp {
  by (driver: string): IHttp
  delete (target: string, data: Payload, headers: Headers): Promise<IResponse>
  get (target: string, params: Payload, headers: Headers, responseType: any): Promise<IResponse>
  post (target: string, data: Payload, headers: Headers): Promise<IResponse>
  put (target: string, data: Payload, headers: Headers): Promise<IResponse>
}

export interface IResponse {
  data: Payload
  errors: Payload|null
  headers: Headers
  status: number
  hasErrors (): boolean
  isSuccessful (): boolean
}

export type List = {
  [key: number]: any
}

export type Payload = {
  [key: string]: any
}
