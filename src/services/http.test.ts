import 'reflect-metadata'

import { IHttp } from '../contracts/http'

import { HttpConnector } from './http'
import { HttpDriver } from './http/http-driver'
import { IncorrectCall } from '../exceptions/errors'
import { mockedCallFn, TestDriver } from './http/http-driver.test'

describe('Test Http class', () => {
  const log = console.log
  beforeEach(() => {
    console.log = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
    console.log = log
  });

  test('Expect [destination] method to return requested driver.', () => {
    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(true)
      }
    })

    const destination: IHttp = http.destination('test-driver')

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

    // @ts-ignore
    http.register('test-driver', new TestDriver(false))

    // @ts-ignore
    const result = http._drivers.hasOwnProperty('test-driver')

    expect(result).toBe(true)
  })

  test('Expect [register] method to add new default driver.', () => {
    const http = new HttpConnector()

    // @ts-ignore
    http.register('test-driver', new TestDriver(false), true)

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
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    })
    let error: any

    try {
      // @ts-ignore
      http.register('test-driver', new TestDriver(false))
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
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
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
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

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

  test('Expect [delete] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.delete('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('delete', "/test", {}, {}, null)
  })

  test('Expect [delete] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.delete('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('delete', "/test", {}, {}, {})
  })

  test('Expect [get] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.get('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('get', "/test", {}, {}, null)
  })

  test('Expect [get] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.get('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('get', "/test", {}, {}, {})
  })

  test('Expect [post] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.post('/test')

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('post', "/test", {}, {}, null)
  })

  test('Expect [post] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.post('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('post', "/test", {}, {}, {})
  })

  test('Expect [put] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.put('/test', {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('put', "/test", {}, {}, null)
  })

  test('Expect [put] method to return response.', async () => {
    mockedCallFn.mockReturnValueOnce({})

    const http = new HttpConnector({
      'test-driver': () => {
        // @ts-ignore
        return new TestDriver(false)
      }
    }, 'test-driver')

    // @ts-ignore
    await http.put('/test', {}, {}, {})

    expect(mockedCallFn).toBeCalledTimes(1)
    expect(mockedCallFn).toBeCalledWith('put', "/test", {}, {}, {})
  })
})
