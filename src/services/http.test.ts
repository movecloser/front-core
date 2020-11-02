import 'reflect-metadata'

import { HttpConnector } from '@/services/http'
import { IncorrectCall } from '@/exceptions/errors'
import { HttpDriver } from '@/services/http/http-driver'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { Response } from '@/services/http/response'

class TestDriver extends HttpDriver {
  protected async _call (
    method: string,
    target: string,
    data: Payload,
    headers: Headers,
    options?: any
  ): Promise<IResponse> {
    return mockedCallFn(method, target, data, headers, options)
  }
}

export const mockedCallFn = jest.fn()

describe('Test Http class', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Expect [destination] method to return requested driver.', () => {
    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    })

    const destination: HttpDriver =  http.destination('test-driver')

    expect(destination).toBeInstanceOf(HttpDriver)
  })

  test('Expect [destination] method to throw error.', () => {
    const http = new HttpConnector()
    let error: any

    try {
      http.destination('test-driver')
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [register] method to add new driver.', () => {
    const http = new HttpConnector()

    http.register('test-driver', new TestDriver(true))

    // @ts-ignore
    const result = http._drivers.hasOwnProperty('test-driver')

    expect(result).toBe(true)
  })

  test('Expect [register] method to add new default driver.', () => {
    const http = new HttpConnector()

    http.register('test-driver', new TestDriver(true), true)

    // @ts-ignore
    const result = http._drivers.hasOwnProperty('test-driver')
    // @ts-ignore
    const defaultDriver = http._defaultDestination
    // @ts-ignore
    const driverInstance = http._drivers[http._defaultDestination]

    expect(result).toBe(true)
    expect(defaultDriver).toBe('test-driver')
    expect(driverInstance).toBeInstanceOf(HttpDriver)
  })

  test('Expect [register] method to throw error (cannot overwrite).', () => {
    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    })
    let error: any

    try {
      // @ts-ignore
      http.register('test-driver', new TestDriver(true))
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [register] method to throw error (missing driver).', () => {
    const http = new HttpConnector()
    let error: any

    try {
      // @ts-ignore
      http.register('noDriver')
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [setDefaultDestination] method to add new default driver.', () => {
    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    })

    http.setDefaultDestination('test-driver')

    // @ts-ignore
    const defaultDriver = http._defaultDestination

    expect(defaultDriver).toBe('test-driver')
  })

  test('Expect [setDefaultDestination] method to throw error (cannot overwrite).', () => {
    const http = new HttpConnector()
    // @ts-ignore
    http._defaultDestination = 'already-taken'

    let error: any

    try {
      // @ts-ignore
      http.setDefaultDestination('test-driver')
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [setDefaultDestination] method to throw error (name not provided).', () => {
    const http = new HttpConnector()
    let error: any

    try {
      // @ts-ignore
      http.setDefaultDestination(null)
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [setDefaultDestination] method to throw error (destination not found).', () => {
    const http = new HttpConnector()

    let error: any

    try {
      // @ts-ignore
      http.setDefaultDestination('not-registered-driver')
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [defaultDriver] method to return default driver instance.', () => {
    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    })

    // @ts-ignore
    http._defaultDestination = 'test-driver'

    // @ts-ignore
    const driver = http.defaultDriver

    expect(driver).toBeInstanceOf(HttpDriver)
  })

  test('Expect [defaultDriver] method to throw error (default driver not set).', () => {
    const http = new HttpConnector()
    let error: any

    try {
      // @ts-ignore
      http.defaultDriver
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  test('Expect [delete] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.delete('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('delete', "/test", {}, {}, null)
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [delete] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.delete('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('delete', "/test", {}, {}, {})
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [get] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.get('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('get', "/test", {}, {}, null)
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [get] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.get('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('get', "/test", {}, {}, {})
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [post] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.post('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('post', "/test", {}, {}, null)
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [post] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    http._defaultDestination = 'test-driver'

    // @ts-ignore
    const response = await http.post('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('post', "/test", {}, {}, {})
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [put] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.put('/test', {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('put', "/test", {}, {}, null)
    expect(response).toBeInstanceOf(Response)
  })

  test('Expect [put] method to return response.',  async () => {
    mockedCallFn.mockReturnValueOnce(
      new Response(200, {
        data: {
          status: 'ok'
        }
      })
    )

    const http = new HttpConnector({
      'test-driver': new TestDriver(true)
    }, 'test-driver')

    // @ts-ignore
    const response = await http.put('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('put', "/test", {}, {}, {})
    expect(response).toBeInstanceOf(Response)
  })
})