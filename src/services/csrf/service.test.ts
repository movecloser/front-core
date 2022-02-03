// Copyright (c) 2022 Move Closer

import 'reflect-metadata'

import { CSRFConfig } from '../../contracts/csrf'
import { FoundResource, Headers, IResponse, Methods, Payload } from '../../contracts'
import { HttpConnector } from '../http'
import { HttpDriver } from '../http/http-driver'

import { CSRFService } from './service'

describe('Tests for CSRF service', () => {
  class TestDriver extends HttpDriver {
    protected async _call (
      method: string,
      target: string,
      body: Payload,
      headers: Headers
    ): Promise<IResponse> {
      const response = { data: { method, target, body, headers, token: '[csrf]' } }
      return response as unknown as IResponse
    }
  }

  class TestCSRFService extends CSRFService {
    protected composePayload () {
      return {
        body: { test: 'test' },
        headers: { test: 'test' }
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

  const csrfResource: FoundResource = {
    connection: 'test',
    url: '/',
    method: Methods.Get,
    shorthand: 'testResource',
    auth: false,
    meta: {
      csrf: true
    }
  }

  test('Expect [getToken] method to get token from source given as fullPath.', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: true,
      paramName: 'token',
      source: 'fullPath'
    }
    const csrfService = new TestCSRFService(csrfConfig, http)

    const result = await csrfService.getToken(csrfResource, {}, {})

    expect(result).toEqual('[csrf]')
  })

  test('Expect [getToken] method to get token from source given as an object.', async () => {
    const csrfConfig: CSRFConfig = {
      sendAsBody: true,
      paramName: 'token',
      source: { connection: 'resource', method: Methods.Get, url: 'resource/test' }
    }
    const csrfService = new TestCSRFService(csrfConfig, http)

    const result = await csrfService.getToken(csrfResource, {}, {})

    expect(result).toEqual('[csrf]')
  })
})
