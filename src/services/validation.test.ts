/*
 * Copyright (c) 2021 Move Closer
 */

import 'reflect-metadata'
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler'
import { Subscription } from 'rxjs'
import { TestScheduler } from 'rxjs/testing'

import { IValidation, ValidationEventType } from '../contracts/validation'
import { Validation } from './validation'

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected)
})

const noop = () => {
}

describe('Tests for Validation service', () => {
  const validation: IValidation = new Validation()
  // @ts-ignore
  const stream = validation._stream$
  const getFormName = (): string => `test-form-${Math.random() * 100}`

  /**
   * All mocks should be cleared after each test.
   */
  afterEach(() => {
    stream.next({
      form: '',
      type: ValidationEventType.Clear
    })
  })


  // Test for [clearForm] method
  test('Expect [clearForm] method to emit proper event.', () => {
    const formName = getFormName()

    let result: any = {}

    stream.subscribe((event: any) => {
      result = event
    })

    validation.clearForm(formName)

    expect(result.form).toBe(formName)
    expect(result.type).toBe(ValidationEventType.Clear)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: formName, type: ValidationEventType.Clear } }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  // Test for [onClear] method
  test('Expect [onClear] method to use provided callback function.', () => {
    const formName = getFormName()

    const callback = jest.fn()

    validation.onClear(formName, callback)

    expect(callback).toHaveBeenCalledTimes(1)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: '', type: ValidationEventType.Clear } }

      validation.onClear(getFormName(), noop)

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  // Test for [onErrors] method
  test('Expect [onErrors] method to return errors for specified form field.', () => {
    const formName = getFormName()
    const fieldName1 = 'test-field-1'
    const fieldName2 = 'test-field-2'

    const formErrors = {
      [fieldName1]: ['errors message 1'],
      [fieldName2]: ['errors message 2']
    }

    const callback = jest.fn()

    const subscription = validation.onErrors(formName, fieldName1, callback)

    validation.pushErrors(formName, formErrors)

    expect(callback).toHaveBeenCalledWith(formErrors[fieldName1])
    expect(subscription).toBeInstanceOf(Subscription)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: formName, type: ValidationEventType.Error, errors: formErrors } }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  test('Expect [onErrors] method NOT to return undefined.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'

    const callback = jest.fn()

    const subscription = validation.onErrors(formName, fieldName, callback)

    const event = {
      form: formName,
      type: ValidationEventType.Error,
      errors: undefined
    }

    stream.next(event)

    expect(callback).not.toHaveBeenCalled()
    expect(subscription).toBeInstanceOf(Subscription)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: event }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  test('Expect [onErrors] method to return empty array.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'

    const callback = jest.fn()
    const subscription = validation.onErrors(formName, fieldName, callback)

    const event = {
      form: formName,
      type: ValidationEventType.Error,
      errors: {
        [fieldName]: []
      }
    }

    stream.next(event)

    expect(callback).toHaveBeenCalledWith([])
    expect(subscription).toBeInstanceOf(Subscription)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: event }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  // Test for [onFormErrors] method
  test('Expect [onFormErrors] method to return errors for specified form.', () => {
    const formName = getFormName()
    const formErrors = {
      message: ['errors message']
    }

    const callback = jest.fn()

    const subscription = validation.onFormErrors(formName, callback)

    validation.pushErrors(formName, formErrors)

    expect(callback).toHaveBeenCalledWith(formErrors.message)
    expect(subscription).toBeInstanceOf(Subscription)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: formName, type: ValidationEventType.Error, errors: formErrors } }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  test('Expect [onFormErrors] method to return errors for specified form.', () => {
    const formName = getFormName()
    const callback = jest.fn()

    const subscription = validation.onFormErrors(formName, callback)

    const event = {
      form: formName,
      type: ValidationEventType.Error,
      errors: null
    }

    stream.next(event)

    expect(callback).toHaveBeenCalledWith(['Cannot recognize error message.'])
    expect(subscription).toBeInstanceOf(Subscription)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: formName, type: ValidationEventType.Error, errors: null } }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })

  // Test for [pushErrors] method
  test('Expect [pushErrors] method to emit proper event.', () => {
    const formName = getFormName()
    const formErrors = {
      field: ['field errors']
    }
    let result: any = {}

    stream.subscribe((event: any) => {
      result = event
    })

    validation.pushErrors(formName, formErrors)

    expect(result.form).toBe(formName)
    expect(result.type).toBe(ValidationEventType.Error)
    expect(result.errors).toBe(formErrors)

    testScheduler.run((helpers: RunHelpers) => {
      const { expectObservable } = helpers

      const values = { a: { form: formName, type: ValidationEventType.Error, errors: formErrors } }

      const expectedObservable = 'a'

      expectObservable(stream).toBe(expectedObservable, values)
    })
  })
})
