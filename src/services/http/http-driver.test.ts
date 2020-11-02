import 'reflect-metadata'
import { HttpDriver } from '@/services/http/http-driver'
import { Headers, IResponse, Payload } from '@/contracts/http'
import { HttpConnector } from '@/services/http'
import { Response } from '@/services/http/response'

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
  });
  afterEach(() => {
    jest.clearAllMocks()
    console.log = log
  });

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