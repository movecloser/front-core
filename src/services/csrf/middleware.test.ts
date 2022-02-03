// Copyright (c) 2022 Move Closer

import 'reflect-metadata'

import { CSRFConfig } from '../../contracts/csrf'
import { FoundResource, Headers, IResponse, Methods, Payload } from '../../contracts'
import { HttpConnector } from '../http'
import { HttpDriver } from '../http/http-driver'

import { CSRFMiddleware } from './middleware'
import { CSRFService } from './service'

describe('Tests for CSRF middleware', () => {
  class TestDriver extends HttpDriver {
    protected async _call (
      method: string,
      target: string,
      data: Payload,
      headers: Headers,
      options?: any
    ): Promise<IResponse> {
      return { data: { token: '[csrf]' }} as unknown as IResponse
    }
  }

  class TestCSRFService extends CSRFService {
    protected composePayload() {
      return {
        body: { },
        headers: { }
      }
    }

    protected retrieveTokenFromResponse (data: Payload): string {
      return `${data.token}`
    }
  }

  const http = new HttpConnector({
    'resource': () => {
      // @ts-ignore
      return new TestDriver(true)
    }
  }, 'resource')

  const testResource: FoundResource = {
    connection: 'test',
    url: '/',
    method: Methods.Get,
    shorthand: 'testResource',
    auth: false,
    meta: {
      csrf: true
    }
  }

  test('Expect [beforeCall] method to do nothing when csrf is not set', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: true,
      paramName: 'token',
      source: 'test'
    }
    const csrfService = new TestCSRFService(csrfConfig, http)
    const csrfMiddleware = new CSRFMiddleware(csrfService)

    const nonCsrfResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: false,
      meta: {}
    }

    const result = await csrfMiddleware.beforeCall(nonCsrfResource, {}, {})

    expect(result).toEqual({
      headers: {},
      body: {}
    })
  })

  test('Expect [beforeCall] method to do nothing when csrf == false', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: true,
      paramName: 'token',
      source: 'test'
    }
    const csrfService = new TestCSRFService(csrfConfig, http)
    const csrfMiddleware = new CSRFMiddleware(csrfService)

    const nonCsrfResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: false,
      meta: {
        csrf: false
      }
    }

    const result = await csrfMiddleware.beforeCall(nonCsrfResource, {}, {})

    expect(result).toEqual({
      headers: {},
      body: {}
    })
  })

  test('Expect [beforeCall] method to append token to body.', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: true,
      paramName: 'token',
      source: 'test'
    }
    const csrfService = new TestCSRFService(csrfConfig, http)
    const csrfMiddleware = new CSRFMiddleware(csrfService)

    const result = await csrfMiddleware.beforeCall(testResource, {}, {})

    expect(result).toEqual({
      headers: {},
      body: { token: '[csrf]' }
    })
  })

  test('Expect [beforeCall] method to append token to headers.', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: false,
      paramName: 'token',
      source: 'test'
    }
    const csrfService = new TestCSRFService(csrfConfig, http)
    const csrfMiddleware = new CSRFMiddleware(csrfService)

    const result = await csrfMiddleware.beforeCall(testResource, {}, {})

    expect(result).toEqual({
      headers: { token: '[csrf]' },
      body: {}
    })
  })
})
