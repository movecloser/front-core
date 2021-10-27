/*
 * Copyright (c) 2021 Move Closer
 */

import 'reflect-metadata'
import { FoundResource } from '../../contracts/connector'
import { Headers, IResponse, Methods, Payload } from '../../contracts/http'

import { Eventbus } from '../../services/eventbus'
import { EventbusMiddleware } from './eventbus-middleware'
import { TemporaryUnavailableError } from '../../exceptions/errors'

describe('Test eventbus middleware', () => {
  const eventBus = new Eventbus()
  const eventbusMiddleware = new EventbusMiddleware(eventBus)

  test('Expect [beforeCall] to do nothing.', () => {
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

    const result = eventbusMiddleware.beforeCall(testResource, testHeaders, testBody)
    expect({ headers: testHeaders, body: testBody }).toEqual(result)
  })

  test('Expect [afterCall] to throw error.', () => {
    const testResponse: IResponse = {
      data: {},
      errors: { message: 'Test error.' },
      headers: {},
      status: 503,
      hasErrors: () => false,
      isSuccessful: () => true
    }

    let error
    try {
      eventbusMiddleware.afterCall(testResponse)
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(TemporaryUnavailableError)
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
      eventbusMiddleware.afterCall(testResponse)
    } catch (err) {
      error = err
    }
    expect(typeof error).toBe('undefined')
  })
})
