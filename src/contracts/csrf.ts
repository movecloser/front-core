// Copyright (c) 2022 Move Closer

import { Headers, Methods, Payload } from './http'
import { FoundResource } from './connector'

export interface CSRFConfig {
  paramName: string
  sendAsBody?: boolean
  source: string | { connection: string, url: string, method: Methods }
}

export const CSRFServiceType = Symbol.for('CSRFService')

export interface ICSRFService {
  // composePayload (resource: FoundResource, headers: Headers, body: Payload): Payload
  /**
   * Return CSRF config object.
   */
  getConfig (): CSRFConfig

  /**
   * Return new token.
   */
  getToken (resource: FoundResource, headers: Headers, body: Payload): Promise<string>
}
