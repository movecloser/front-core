import 'reflect-metadata'
import { AuthHeader, Authorization, FoundResource } from '@/contracts/resources'
import { AuthMiddleware } from '@/services/resources/auth-middleware'
import { Headers, IResponse, Methods, Payload } from '@/contracts/http'

describe('Test auth middleware', () => {
  class TestAuthService implements Authorization {
    public check = () => false;
    public getAuthorizationHeader = () => {
      return { Authorization: 'test-auth-token' }
    };
  }

  const authService = new TestAuthService()

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Expect [beforeCall] to return modified headers', () => {
    const authSpy = jest.spyOn(authService, 'getAuthorizationHeader')
    const authMiddleware = new AuthMiddleware(authService)

    const testResource: FoundResource = {
      url: '/',
      method: Methods.Get,
      shorthand: null,
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
    const authMiddleware = new AuthMiddleware(authService)

    const testResource: FoundResource = {
      url: '/',
      method: Methods.Get,
      shorthand: null,
      auth: false
    }

    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}
    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(headers).toEqual(testHeaders)
    expect(body).toEqual(testBody)
  })

  test('Expect [afterCall]', () => {
    const authMiddleware = new AuthMiddleware(authService)
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
