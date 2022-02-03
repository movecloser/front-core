// Copyright (c) 2021 Move Closer

import 'reflect-metadata'
import { FoundResource } from '../../contracts/connector'
import { Headers, IResponse, Methods, Payload } from '../../contracts/http'

import { Validation } from '../../services/validation'
import { ValidationMiddleware } from './validation-middleware'

describe('Test validation middleware', () => {
  const validationService = new Validation()
  const validationMiddleware = new ValidationMiddleware(validationService)

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Expect [beforeCall] to register formName.', () => {
    const clearFormSpy = jest.spyOn(validationService, 'clearForm')
    const testResource: FoundResource = {
      connection: 'test',
      url: '/',
      method: Methods.Get,
      shorthand: 'formName',
      auth: true,
      meta: {}
    }
    const testHeaders: Headers = { test: 'true' }
    const testBody: Payload = {}

    const result = validationMiddleware.beforeCall(testResource, testHeaders, testBody)

    // @ts-ignore - reading private property.
    expect(validationMiddleware.formName).toEqual(testResource.shorthand)
    expect(clearFormSpy).toHaveBeenCalledTimes(1)
    expect({ headers: testHeaders, body: testBody }).toEqual(result)
  })

  test('Expect [afterCall] to do emit validation errors.', () => {
    const pushErrorsSpy = jest.spyOn(validationService, 'pushErrors')
    const testResponse: IResponse = {
      data: {},
      errors: { errors: { message: 'Test error.' } },
      headers: {},
      status: 422,
      hasErrors: () => true,
      isSuccessful: () => false
    }

    validationMiddleware.afterCall(testResponse)

    expect(pushErrorsSpy).toBeCalledTimes(1)
    expect(pushErrorsSpy).toBeCalledWith(
      'formName', { message: 'Test error.' }, null
    )
  })

  test('Expect [afterCall] to do emit validation empty object.', () => {
    const pushErrorsSpy = jest.spyOn(validationService, 'pushErrors')
    const testResponse: IResponse = {
      data: {},
      errors: null,
      headers: {},
      status: 422,
      hasErrors: () => true,
      isSuccessful: () => false
    }

    validationMiddleware.afterCall(testResponse)

    expect(pushErrorsSpy).toBeCalledTimes(0)
  })

  test('Expect [afterCall] to do emit validation errors object.', () => {
    const pushErrorsSpy = jest.spyOn(validationService, 'pushErrors')
    const testResponse: IResponse = {
      data: {},
      errors: {
        errors: false,
        message: 'true'
      },
      headers: {},
      status: 422,
      hasErrors: () => true,
      isSuccessful: () => false
    }

    validationMiddleware.afterCall(testResponse)

    expect(pushErrorsSpy).toBeCalledTimes(1)
    expect(pushErrorsSpy).toBeCalledWith('formName', {}, 'true')
  })

  test('Expect [afterCall] to do nothing.', () => {
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
      validationMiddleware.afterCall(testResponse)
    } catch (err) {
      error = err
    }
    expect(typeof error).toBe('undefined')
  })

})
