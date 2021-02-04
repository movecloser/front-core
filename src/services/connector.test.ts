import 'reflect-metadata'

import { ApiConnector } from './connector'
import { HttpConnector } from './http'
import { Headers, IResponse, Methods, Payload, ResourcesRegistry } from '../contracts'
import { IncorrectCall } from '../exceptions/errors'
import { HttpDriver } from './http/http-driver'

describe('Test Connector class.', () => {
  const registry: ResourcesRegistry = {
    resource: {
      prefix: 'resource',
      methods: {
        test: {
          url: 'test',
          method: Methods.Get,
          params: [],
          shorthand: 'test',
          auth: true
        },
        test2: {
          url: 'test/{id}',
          method: Methods.Get,
          params: ['id'],
          shorthand: 'test',
          auth: true
        }
      }
    },
    resource2: {
      prefix: '',
      methods: {
        test: {
          url: 'test',
          method: Methods.Get,
          auth: true
        }
      }
    },
    resource3: {
      prefix: '',
      connection: 'test-connection',
      methods: {
        test: {
          url: 'test',
          method: Methods.Get,
        }
      }
    }
  }
  const connector = new ApiConnector(registry, new HttpConnector(), [])

  const mockedCallFn = jest.fn()

  class TestDriver extends HttpDriver {
    protected async _call (
      method: string,
      target: string,
      data: Payload,
      headers: Headers,
      options?: any
    ): Promise<IResponse> {
      const response = { method, target, data, headers, options }
      return response as unknown as IResponse
    }
  }

  const http = new HttpConnector({
    'resource': () => {
      // @ts-ignore
      return new TestDriver(true)
    },
  }, 'resource')

  test('Expect [call] to return response.', async () => {
    const connector = new ApiConnector(registry, http, [])
    const result = await connector.call('resource', 'test')

    expect(result).toEqual({
      method: 'get',
      target: 'resource/test',
      data: {},
      headers: {},
      options: { responseType: 'json' }
    })
  })

  test('Expect [call] to return response.', async () => {
    const connector = new ApiConnector(registry, http, [
      {
        // @ts-ignore
        afterCall: () => {
          // @ts-ignore
        }, beforeCall: () => {
          return {
            headers: {},
            body: {}
          }
        }
      }
    ])
    const result = await connector.call('resource', 'test')

    expect(result).toEqual({
      method: 'get',
      target: 'resource/test',
      data: {},
      headers: {},
      options: { responseType: 'json' }
    })
  })


  test('Expect [findResource] to return resource.', () => {
    const connector = new ApiConnector(registry, new HttpConnector({}, 'resource'), [])
    const result = connector.findResource('resource', 'test')

    expect(result).toEqual({
      'auth': true,
      'connection': 'resource',
      'method': 'get',
      'shorthand': 'test',
      'url': 'resource/test'
    })
  })

  test('Expect [findResource] to return resource.', () => {
    const connector = new ApiConnector(registry, new HttpConnector({}, 'resource'), [])

    const result = connector.findResource('resource2', 'test')

    expect(result).toEqual({
      'auth': true,
      'connection': 'resource',
      'method': 'get',
      'shorthand': 'testResource2',
      'url': 'test'
    })
  })

  test('Expect [findResource] to return resource.', () => {
    const connector = new ApiConnector(registry, new HttpConnector({}, 'resource3'), [])

    const result = connector.findResource('resource3', 'test')

    expect(result).toEqual({
      'auth': false,
      'connection': 'test-connection',
      'method': 'get',
      'shorthand': 'testResource3',
      'url': 'test'
    })
  })

  test('Expect [findResource] to return resource.', () => {
    const connector = new ApiConnector(registry, new HttpConnector({}, 'resource3'), [])

    const result = connector.findResource('resource3', 'test')

    expect(result).toEqual({
      'auth': false,
      'connection': 'test-connection',
      'method': 'get',
      'shorthand': 'testResource3',
      'url': 'test'
    })
  })

  test('Expect [findResource] to merge middlewares.', () => {
    let error
    try {
      connector.findResource('resource', 'test')
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(IncorrectCall)
  })


  test('Expect [useMiddlewares] to merge middlewares.', () => {
    const connector = new ApiConnector(registry, new HttpConnector(), [])
    connector.useMiddlewares([{
      // @ts-ignore
      afterCall: () => {}, beforeCall: () => {}
    }])
    // @ts-ignore
    expect(Object.keys(connector._list).length).toBe(3)
  })

  test('Expect [useResources] to merge resources.', () => {
    const connector = new ApiConnector(registry, new HttpConnector(), [])
    // @ts-ignore
    connector.useResources({ 'test': {} })
    // @ts-ignore
    expect(Object.keys(connector._list).length).toBe(4)
  })

  test('Expect [buildUrl] to do build url.', () => {
    // @ts-ignore
    const result = ApiConnector.buildUrl('resource', registry.resource.methods.test2, { id: 1 })

    expect(result).toBe('resource/test/1')
  })

  test('Expect [buildUrl] to do build url without prefix.', () => {
    // @ts-ignore
    const result = ApiConnector.buildUrl(null, registry.resource2.methods.test)

    expect(result).toBe('test')
  })

  test('Expect [checkIfActionOfResourceExists] to throw Error', () => {
    let error
    try {
      // @ts-ignore
      connector.checkIfActionOfResourceExists('invalid-resource', 'invalid-action')
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('There is no such resource in resources [list].')
  })

  test('Expect [checkIfActionOfResourceExists] to throw Error', () => {
    let error
    try {
      // @ts-ignore
      connector.checkIfActionOfResourceExists('resource', 'invalid-action')
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
    expect(error.message).toBe('There is no such action in actions [list].')

  })

  test('Expect [checkIfAllParamsProvided] method to return nothing.', () => {
    // @ts-ignore
    const result = ApiConnector.checkIfAllParamsProvided(['id'], { id: 1 })

    expect(result).toBeUndefined()
  })

  test('Expect [checkIfAllParamsProvided] method to throw Error.', () => {
    let error
    try {
      // @ts-ignore
      ApiConnector.checkIfAllParamsProvided(['test'], { id: 1 })
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [resolveShorthand] method to return requested driver.', () => {
    // @ts-ignore
    const result = ApiConnector.resolveShorthand('resource', 'test')

    expect(result).toEqual('testResource')
  })

})
