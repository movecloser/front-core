/*
 * Copyright (c) 2021 Move Closer
 */

import 'reflect-metadata'

import { Headers, IResponse, Payload } from '../../contracts/http'
import { HttpDriver } from './http-driver'
import { Response } from './response'

export const mockedCallFn = jest.fn()

export class TestDriver extends HttpDriver {
  protected async _call (
    method: string,
    target: string,
    data: Payload,
    headers: Headers,
    options?: any
  ): Promise<IResponse> {
    const response = mockedCallFn(method, target, data, headers, options)
    {
      const { method, target, data, status, request } = response
      this._logResponse(target, method, status, request, data)

    }
    return response
  }
}

describe('Test HttpDriver class', () => {
  const log = console.log

  beforeEach(() => {
    console.log = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
    console.log = log
  })

  test('Expect [_logResponse] to log', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    mockedCallFn.mockReturnValueOnce({
      method: 'GET',
      target: '/test',
      status: 200,
      request: {
        headers: {}
      },
      response: {
        data: {}
      }
    })

    const driver = new TestDriver(true)

    // @ts-ignore
    driver._call()

    expect(consoleSpy).toBeCalledTimes(1)
  })

  test('Expect [delete] to return be called', async () => {
    mockedCallFn.mockReturnValueOnce({
      method: 'DELETE',
      target: '/test',
      status: 200,
      request: {
        headers: {}
      },
      response: {
        data: {}
      }
    })

    const driver = new TestDriver()
    const callSpy = jest.spyOn(driver, 'delete')
    // @ts-ignore
    const response = await driver.delete('/test')

    expect(callSpy).toBeCalledTimes(1)
    expect(callSpy).toBeCalledWith('/test')
    expect(response.status).toBe(200)
  })

  test('Expect [get] to return be called', async () => {
    mockedCallFn.mockReturnValueOnce({
      method: 'GET',
      target: '/test',
      status: 200,
      request: {
        headers: {}
      },
      response: {
        data: {}
      }
    })

    const driver = new TestDriver()
    const callSpy = jest.spyOn(driver, 'get')
    // @ts-ignore
    const response = await driver.get('/test')

    expect(callSpy).toBeCalledTimes(1)
    expect(callSpy).toBeCalledWith('/test')
    expect(response.status).toBe(200)
  })

  test('Expect [post] to return be called', async () => {
    mockedCallFn.mockReturnValueOnce({
      method: 'POST',
      target: '/test',
      status: 200,
      request: {
        headers: {}
      },
      response: {
        data: {}
      }
    })

    const driver = new TestDriver()
    const callSpy = jest.spyOn(driver, 'post')
    // @ts-ignore
    const response = await driver.post('/test')

    expect(callSpy).toBeCalledTimes(1)
    expect(callSpy).toBeCalledWith('/test')
    expect(response.status).toBe(200)
  })

  test('Expect [put] to return be called', async () => {
    mockedCallFn.mockReturnValueOnce({
      method: 'PUT',
      target: '/test',
      status: 200,
      request: {
        headers: {}
      },
      response: {
        data: {}
      }
    })

    const driver = new TestDriver()
    const callSpy = jest.spyOn(driver, 'put')
    // @ts-ignore
    const response = await driver.put('/test')

    expect(callSpy).toBeCalledTimes(1)
    expect(callSpy).toBeCalledWith('/test')
    expect(response.status).toBe(200)
  })

  test('Expect [composeSuccessResponse] to return response', () => {
    const driver = new TestDriver()

    // @ts-ignore
    const response = driver.composeSuccessResponse(200, {}, {})

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(200)
  })

  test('Expect [composeFailResponse] to return response', () => {
    const driver = new TestDriver()

    // @ts-ignore
    const response = driver.composeFailResponse(400, {}, {})

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(400)
  })
})
