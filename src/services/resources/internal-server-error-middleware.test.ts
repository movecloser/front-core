import 'reflect-metadata'
import { InternalServerErrorMiddleware } from '@/services/resources/internal-server-error-middleware'
import { FoundResource } from '@/contracts/resources'
import { Headers, IResponse, Methods, Payload } from '@/contracts/http'
import { InternalServerError } from '@/exceptions/errors'

describe('Test internal server error middleware', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  const errorMiddleware = new InternalServerErrorMiddleware()

  test('Expect [beforeCall] to do nothing', () => {
    const testResource: FoundResource = {
      url: '/',
      method: Methods.Get,
      shorthand: null,
      auth: false
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const result = errorMiddleware.beforeCall(testResource, testHeaders, testBody)
    expect({ headers: testHeaders, body: testBody }).toEqual(result)
  })

  test('Expect [afterCall] to Throw InternalServerError', () => {
    const testResponse: IResponse = {
      data: {},
      errors: { message: 'Test error.' },
      headers: {},
      status: 500,
      hasErrors: () => false,
      isSuccessful: () => true
    }

    let error
    try {
      errorMiddleware.afterCall(testResponse)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(InternalServerError)
  })

  test('Expect [afterCall] to do nothing', () => {
    const testResponse: IResponse = {
      data: {},
      errors: null,
      headers: {},
      status: 200,
      hasErrors: () => false,
      isSuccessful: () => true
    }

    let error
    try {
      errorMiddleware.afterCall(testResponse)
    } catch (err) {
      error = err
    }
    expect(typeof error).toBe("undefined")
  })
})