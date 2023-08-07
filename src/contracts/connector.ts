// Copyright (c) 2021 Move Closer

import { MetaPayload } from '../contracts/models'
import { Headers, IResponse, Methods, Payload } from './http'

export const ApiConnectorType = Symbol.for('IConnector')

export const ApiConnectorFactory = Symbol.for('ApiConnectorFactory')

export type ConnectorFactory = () => IConnector

export type RequestCall = {
  resource: string,
  action: string,
  params: Params,
  body: Payload,
  headers: Headers,
  responseType: ResponseType
}

export interface ConnectorMiddleware {
  afterCall?: (response: IResponse, resource: FoundResource, requestCall: RequestCall) => Promise<IResponse | void> | void
  beforeCall?: (
    resource: FoundResource,
    headers: Headers,
    body: Payload
  ) => ({ headers: Headers, body: Payload }) | Promise<({ headers: Headers, body: Payload })>
}

export type FoundResource = {
  connection: string
  url: string
  method: Methods
  shorthand: string
  auth: boolean
  meta: MetaPayload
}

export interface IConnector {
  call (
    resource: string,
    action: string,
    params?: Params,
    body?: Payload,
    headers?: Headers,
    responseType?: ResponseType
  ): Promise<IResponse>
  findResource (resource: string, action: string, params: Params): FoundResource
  useMiddlewares (list: ConnectorMiddleware[]): void
  useResources (list: ResourcesRegistry): void
}

export type Params = {
  [key: string]: string | number
}

export type Resource = {
  url: string
  method: Methods
  params?: string[]
  shorthand?: string
  auth?: boolean
  meta?: MetaPayload
}

export type ResourceDefinition = {
  prefix: string | null
  methods: ResourceMethod,
  connection?: string
}

export type ResourceMethod = {
  [key: string]: Resource
}

export type ResourcesRegistry = {
  [key: string]: ResourceDefinition
}

export interface ResourceResponseMeta {
  total: number
  query_params?: Params
  current_page?: number
  last_page?: number
  from?: number
  to?: number
  per_page?: number
  path?: string
}

export enum ResponseType {
  Arraybuffer = 'arraybuffer',
  Blob = 'blob',
  Document = 'document',
  Json = 'json',
  Text = 'text',
  Stream = 'stream'
}
