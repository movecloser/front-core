export type DriverRegistry = {
  [key: string]: IHttp
}

export type Headers = {
  [key: string]: string
}

export const HttpConnectorType = Symbol.for('IHttpConnector')

export interface IHttp {
  delete (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  get (target: string, params?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  post (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  put (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
}

export interface IHttpConnector {
  defaultDestination (): string
  destination (destination: string): IHttp
  register (name: string, driver: IHttp, setAsDefault?: boolean): void
  setDefaultDestination (name: string): void
  delete (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  get (target: string, params?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  post (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
  put (target: string, data?: Payload, headers?: Headers, options?: any): Promise<IResponse>
}

export type IHttpConstructor = () => IHttp

export interface IHttpConstructors {
  [key: string]: IHttpConstructor
}

export interface IHttpConnectorConfig {
  default: string
  drivers: IHttpConstructors,
}

export interface IResponse {
  data: Payload
  errors: Payload | null
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
