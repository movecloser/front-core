import { Headers, IResponse, Methods, Payload } from '@/contracts/http'

export interface AuthHeader {
  Authorization: string
}

export interface Authorization {
  check (): boolean
  getAuthorizationHeader (): AuthHeader
}

export const AuthorizationType = Symbol.for('Authorization')

export type FoundResource = {
  url: string
  method: Methods
  formName: string|null
  auth: boolean
}

export interface IResources {
  call (
    resource: string,
    action: string,
    params?: Params,
    body?: Payload,
    headers?: Headers,
    responseType?: any
  ): Promise<IResponse>
  get (resource: string, action: string, params: Params): FoundResource
  register (list: ResourcesRegistry): void
}

export type Params = {
  [key: string]: string|number
}

export type Resource = {
  url: string
  method: Methods
  params?: string[]
  formName?: string
  auth?: boolean
}

export const ResourcesType = Symbol.for('IResources')

export type ResourceDefinition = {
  prefix: string|null
  methods: ResourceMethod,
  formName?: string
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
