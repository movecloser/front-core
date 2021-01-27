import 'reflect-metadata'

import { AuthService } from './authorization'
import { AuthConfig } from '../contracts'
import { DateTime } from './datetime'

describe('Test AuthService class.', () => {
  const config: AuthConfig = {
    tokenName: 'test-token',
    refreshThreshold: 5000,
    validThreshold: 1000
  }

  interface TestStorage {
    [key: string]: string
  }

  // let localStorage!: TestStorage
  //
  // beforeEach(() => {
  //   window.localStorage.getItem = (key: string) => {
  //     return localStorage[key]
  //   }
  //
  //   window.localStorage.setItem = (key: string, value: string) => {
  //     localStorage[key] = value
  //   }
  // })
  //
  // afterEach(() => {
  //   localStorage = {} as TestStorage
  // })

  test('Expect [check] to do fail.', () => {
    const auth = new AuthService(config, new DateTime())
    const result = auth.check()

    expect(result).toBe(false)
  })

  test('Expect [check] to do check.', () => {
    const auth = new AuthService(config, new DateTime())
    // @ts-ignore
    auth._token = {
      accessToken: 'test-token',
      expiresAt: new Date().toUTCString(),
      tokenType: 'Bearer',
    }
    const result = auth.check()

    expect(result).toBe(false)
  })

  test('Expect [deleteToken] to do work.', () => {
    const auth = new AuthService(config, new DateTime())

    //@ts-ignore
    const nextSpy = jest.spyOn(auth._auth$, 'next')
    // @ts-ignore
    auth._token = {
      accessToken: 'test-token',
      expiresAt: new Date().toUTCString(),
      tokenType: 'Bearer',
    }
    // @ts-ignore
    auth._user = {}

    auth.deleteToken()

    expect(nextSpy).toHaveBeenCalledTimes(1)
    // @ts-ignore
    expect(auth._token).toBeNull()
    // @ts-ignore
    expect(auth._user).toBeNull()
  })

  test('Expect [getAuthorizationHeader] to do work.', () => {
    const auth = new AuthService(config, new DateTime())
    // @ts-ignore
    auth._token = {
      accessToken: 'test-token',
      expiresAt: new Date().toUTCString(),
      tokenType: 'Bearer',
    }

    const result = auth.getAuthorizationHeader()

    expect(result).toEqual({ 'Authorization': 'Bearer test-token' })
  })

  test('Expect [getAuthorizationHeader] to do work.', () => {
    const auth = new AuthService(config, new DateTime())
    // @ts-ignore
    auth._token = {
      accessToken: 'test-token',
      expiresAt: new Date().toUTCString(),
    }

    const result = auth.getAuthorizationHeader()

    expect(result).toEqual({ 'Authorization': 'test-token' })
  })

  test('Expect [getAuthorizationHeader] to do fail.', () => {
    const auth = new AuthService(config, new DateTime())

    const result = auth.getAuthorizationHeader()

    expect(result).toEqual({ 'Authorization': '' })
  })

  test('Expect [setToken] to do work.', () => {
    const auth = new AuthService(config, new DateTime())

    auth.setToken({
      accessToken: 'test-token',
      expiresAt: new Date().toUTCString(),
      tokenType: 'Bearer',
    })
  })

  test('Expect [setUser] to do work.', () => {
    const auth = new AuthService(config, new DateTime())

    // @ts-ignore
    auth.setUser({ user: 'test' })

    // @ts-ignore
    expect(auth._user).toBeTruthy()
  })

  test('Expect [get User] to do work.', () => {
    const auth = new AuthService(config, new DateTime())

    // @ts-ignore
    auth._user = { user: 'test' }

    const user = auth.user

    // @ts-ignore
    expect(user).toBeTruthy()
  })

  test('Expect [getUserId] to do work.', () => {
    const auth = new AuthService(config, new DateTime())

    // @ts-ignore
    auth._user = { user: 'test', id: '1' }

    const user = auth.getUserId()

    // @ts-ignore
    expect(user).toBe('1')
  })

  test('Expect [getUserId] to do return null.', () => {
    const auth = new AuthService(config, new DateTime())

    // @ts-ignore
    auth._user = { user: 'test' }

    const user = auth.getUserId()

    // @ts-ignore
    expect(user).toBe(null)
  })

})
