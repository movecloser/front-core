// Copyright (c) 2021 Move Closer

import 'reflect-metadata'
import { AuthProvider } from '../../contracts/authentication'
import { FoundResource } from '../../contracts/connector'
import { Headers, Methods, Payload } from '../../contracts/http'

import { AuthMiddleware } from './auth-middleware'

describe('Test auth middleware', () => {
  class TestAuthService implements AuthProvider {
    public check = () => true
    public getAuthorizationHeader = () => {
      return { Authorization: 'test-auth-token' }
    }
  }

  const authService = new TestAuthService()
  const authMiddleware = new AuthMiddleware(authService)

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Expect [beforeCall] to return modified headers', () => {
    const checkSpy = jest.spyOn(authService, 'check')
    const headerSpy = jest.spyOn(authService, 'getAuthorizationHeader')
    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: true,
      meta: {}
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(checkSpy).toHaveBeenCalledTimes(1)
    expect(headerSpy).toHaveBeenCalledTimes(1)
    expect(headers).toHaveProperty('test')
    expect(headers).toHaveProperty('Authorization')
    expect(body).toEqual(testBody)
  })

  test('Expect [beforeCall] to do nothing even if auth set to true', () => {
    authService.check = () => false
    const headerSpy = jest.spyOn(authService, 'getAuthorizationHeader')

    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: true,
      meta: {}
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(headerSpy).toHaveBeenCalledTimes(0)
    expect(headers).toEqual(testHeaders)
    expect(body).toEqual(testBody)
  })

  test('Expect [beforeCall] to do nothing', () => {
    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'testResource',
      auth: false,
      meta: {}
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const { headers, body } = authMiddleware.beforeCall(testResource, testHeaders, testBody)

    expect(headers).toEqual(testHeaders)
    expect(body).toEqual(testBody)
  })

  test('Expect [afterCall]', () => {
    const authSpy = jest.spyOn(authMiddleware, 'afterCall')
    const result = authMiddleware.afterCall()

    expect(authSpy).toHaveBeenCalledTimes(1)
    expect(result).toEqual(undefined)
  })
})
