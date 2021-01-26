import 'reflect-metadata'
import { ApiConnector } from './connector'
import { HttpConnector } from './http'
import { Methods, ResourcesRegistry } from '../contracts'

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
        }
      }
    }
  }
  const connector = new ApiConnector(registry, new HttpConnector(), [])

  test('Expect [call] method to return requested driver.', () => {

    // // @ts-ignore
    // connector._http = {
    //   destination: jest.fn()
    // }
    // // @ts-ignore
    // const spy = jest.spyOn(connector._http.destination, 'call')
    // connector.call('resource', 'test')
    //
    // expect(spy).toHaveBeenCalledTimes(1)
    // expect(spy).toHaveBeenCalledWith('resource', 'test')
  })

  test('Expect [checkIfAllParamsProvided] method to return requested driver.', () => {
    // @ts-ignore
    const result = ApiConnector.checkIfAllParamsProvided(['id'], { id: 1 })

    expect(result).toEqual('testResource')
  })

  test('Expect [resolveShorthand] method to return requested driver.', () => {
    // @ts-ignore
    const result = ApiConnector.resolveShorthand('resource', 'test')

    expect(result).toEqual('testResource')
  })

})
