import 'reflect-metadata'
import { Authorization, FoundResource } from '../../contracts/connector'
import { Headers, IResponse, Methods, Payload } from '../../contracts/http'

import { AuthMiddleware } from './auth-middleware'

describe('Test auth middleware', () => {
  class TestAuthService implements Authorization {
    public check = () => false;
    public getAuthorizationHeader = () => {
      return { Authorization: 'test-auth-token' }
    }
  }

  const authService = new TestAuthService()
  const authMiddleware = new AuthMiddleware(authService)

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('Expect [beforeCall] to return modified headers', () => {
    const authSpy = jest.spyOn(authService, 'getAuthorizationHeader')
    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: true
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(authSpy).toHaveBeenCalledTimes(1)
    expect(headers).toHaveProperty('test')
    expect(headers).toHaveProperty('Authorization')
    expect(body).toEqual(testBody)
  })

  test('Expect [beforeCall] to do nothing', () => {
    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: false
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(headers).toEqual(testHeaders)
    expect(body).toEqual(testBody)
  })

  test('Expect [afterCall]', () => {
    const authSpy = jest.spyOn(authMiddleware, 'afterCall')
    const testResponse: IResponse = {
      data: {},
      errors: null,
      headers: {},
      status: 200,
      hasErrors: () => false,
      isSuccessful: () => true
    }

    const result = authMiddleware.afterCall(testResponse)

    expect(authSpy).toHaveBeenCalledTimes(1)
    expect(result).toEqual(undefined)
  })
})
