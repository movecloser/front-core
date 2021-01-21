import { HttpDriver } from '@/services/http/http-driver'

export type DriverRegistry = {
  [key: string]: HttpDriver
}

export type Headers = {
  [key: string]: string
}

export interface IHttpConnector {
  defaultDestination(): string
  destination (destination: string): HttpDriver
  register (name: string, driver: HttpDriver, setAsDefault?: boolean): void
  setDefaultDestination (name: string): void
  delete (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  get (target: string, params?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  post (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  put (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
}

export interface IHttp {
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

export enum Methods {
  Delete = 'delete',
  Get = 'get',
  Post = 'post',
  Put = 'put'
}

export type Payload = {
  [key: string]: any
}
