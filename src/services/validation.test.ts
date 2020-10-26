import 'reflect-metadata'

import { IValidation, ValidationEventType } from '@/contracts/validation'
import { Validation } from '@/services/validation'
import { IncorrectCall } from '@/exceptions/errors'
import { Subscription } from 'rxjs'


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
    let result

    stream.subscribe((event: any) => {
      result = event
    })
    validation.clearForm(formName)

    // @ts-ignore
    expect(result.form).toBe(formName)
    // @ts-ignore
    expect(result.type).toBe(ValidationEventType.Clear)
  })

  // Test for [onClear] method
  test('Expect [onClear] method to use provided callback function.', () => {
    const formName = getFormName()
    let result

    validation.onClear(formName, (): void => {
      result = true
    })
    validation.clearForm(formName)

    expect(result).toBe(true)
  })

  test('Expect [onClear] method to use provided callback function.', () => {
    const formName = getFormName()
    let result

    validation.onClear(formName, (): void => {
      result = true
    })
    stream.next({
      type: ValidationEventType.Clear
    })

    expect(result).toBe(true)
  })

  test('Expect [onClear] method to throw error.', () => {
    const formName = getFormName()
    let error: any

    try {
      // @ts-ignore
      validation.onClear(formName, null)
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  // Test for [onErrors] method
  test('Expect [onErrors] method to return errors for specified form field.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'
    const formErrors = {
      [fieldName]: ['errors message']
    }
    let result: any

    const subscription =  validation.onErrors(formName, fieldName, (errors) => {
      result = errors
    })

    validation.pushErrors(formName, formErrors)

    expect(result.join('')).toBe('errors message')
    expect(subscription).toBeInstanceOf(Subscription)
  })

  test('Expect [onErrors] method to return undefined.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'
    let result: any

    const subscription = validation.onErrors(formName, fieldName, (errors) => {
      result = errors
    })

    stream.next({
      form: formName,
      type: ValidationEventType.Error,
      errors: undefined
    })

    expect(result).toBe(undefined)
    expect(subscription).toBeInstanceOf(Subscription)
  })

  test('Expect [onErrors] method to return empty array.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'
    let result: any

    const subscription = validation.onErrors(formName, fieldName, (errors) => {
      result = errors
    })

    stream.next({
      form: formName,
      type: ValidationEventType.Error,
      errors: {
        [fieldName]: []
      }
    })

    expect(result).toEqual([])
    expect(subscription).toBeInstanceOf(Subscription)
  })

  test('Expect [onErrors] method to throw when callback not provided.', () => {
    const formName = getFormName()
    const fieldName = 'test-field'
    let error: any

    try {
      // @ts-ignore
      validation.onErrors(formName, fieldName, null)
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  // Test for [onFormErrors] method
  test('Expect [onFormErrors] method to return errors for specified form.', () => {
    const formName = getFormName()
    const formErrors = {
      message: ['errors message']
    }
    let result: any

    const subscription =  validation.onFormErrors(formName, (errors) => {
      result = errors
    })

    validation.pushErrors(formName, formErrors)

    expect(result.join('')).toBe('errors message')
    expect(subscription).toBeInstanceOf(Subscription)
  })

  test('Expect [onFormErrors] method to return errors for specified form.', () => {
    const formName = getFormName()
    let result: any

    const subscription =  validation.onFormErrors(formName, (errors) => {
      result = errors
    })

    stream.next({
      form: formName,
      type: ValidationEventType.Error,
      errors: null
    })

    expect(result).toBe(undefined)
    expect(subscription).toBeInstanceOf(Subscription)
  })

  test('Expect [onFormErrors] method to throw when callback not provided.', () => {
    const formName = getFormName()
    let error: any

    try {
      // @ts-ignore
      validation.onFormErrors(formName, null)
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(IncorrectCall)
  })

  // Test for [pushErrors] method
  test('Expect [pushErrors] method to emit proper event.', () => {
    const formName = getFormName()
    const formErrors = {
      field: ['field errors']
    }
    let result

    stream.subscribe((event: any) => {
      result = event
    })
    validation.pushErrors(formName, formErrors)

    // @ts-ignore
    expect(result.form).toBe(formName)
    // @ts-ignore
    expect(result.type).toBe(ValidationEventType.Error)
    // @ts-ignore
    expect(result.errors).toBe(formErrors)
  })
})