import 'reflect-metadata'
import { Subscription } from 'rxjs'

import { IValidation, ValidationEventType } from '../contracts/validation'
import { Validation } from './validation'


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

  // TODO: @Kuba te testy trzeba przepisać zgodnie z rekomendacją RxJS:
  // https://rxjs-dev.firebaseapp.com/guide/testing/marble-testing


  // // Test for [onClear] method
  // test('Expect [onClear] method to use provided callback function.', () => {
  //   const formName = getFormName()
  //   let result
  //
  //   validation.onClear(formName, (): void => {
  //     result = true
  //   })
  //   validation.clearForm(formName)
  //
  //   expect(result).toBe(true)
  // })
  //
  // test('Expect [onClear] method to use provided callback function.', () => {
  //   const formName = getFormName()
  //   let result
  //
  //   validation.onClear(formName, (): void => {
  //     result = true
  //   })
  //   stream.next({
  //     type: ValidationEventType.Clear
  //   })
  //
  //   expect(result).toBe(true)
  // })

  // // Test for [onErrors] method
  // test('Expect [onErrors] method to return errors for specified form field.', () => {
  //   const formName = getFormName()
  //   const fieldName = 'test-field'
  //   const formErrors = {
  //     [fieldName]: ['errors message']
  //   }
  //   let result: any
  //
  //   const subscription =  validation.onErrors(formName, fieldName, (errors) => {
  //     result = errors
  //   })
  //
  //   validation.pushErrors(formName, formErrors)
  //
  //   expect(result.join('')).toBe('errors message')
  //   expect(subscription).toBeInstanceOf(Subscription)
  // })
  //
  // test('Expect [onErrors] method to return undefined.', () => {
  //   const formName = getFormName()
  //   const fieldName = 'test-field'
  //   let result: any
  //
  //   const subscription = validation.onErrors(formName, fieldName, (errors) => {
  //     result = errors
  //   })
  //
  //   stream.next({
  //     form: formName,
  //     type: ValidationEventType.Error,
  //     errors: undefined
  //   })
  //
  //   expect(result).toBe(undefined)
  //   expect(subscription).toBeInstanceOf(Subscription)
  // })
  //
  // test('Expect [onErrors] method to return empty array.', () => {
  //   const formName = getFormName()
  //   const fieldName = 'test-field'
  //   let result: any
  //
  //   const subscription = validation.onErrors(formName, fieldName, (errors) => {
  //     result = errors
  //   })
  //
  //   stream.next({
  //     form: formName,
  //     type: ValidationEventType.Error,
  //     errors: {
  //       [fieldName]: []
  //     }
  //   })
  //
  //   expect(result).toEqual([])
  //   expect(subscription).toBeInstanceOf(Subscription)
  // })
  //
  // // Test for [onFormErrors] method
  // test('Expect [onFormErrors] method to return errors for specified form.', () => {
  //   const formName = getFormName()
  //   const formErrors = {
  //     message: ['errors message']
  //   }
  //   let result: any
  //
  //   const subscription =  validation.onFormErrors(formName, (errors) => {
  //     result = errors
  //   })
  //
  //   validation.pushErrors(formName, formErrors)
  //
  //   expect(result.join('')).toBe('errors message')
  //   expect(subscription).toBeInstanceOf(Subscription)
  // })
  //
  // test('Expect [onFormErrors] method to return errors for specified form.', () => {
  //   const formName = getFormName()
  //   let result: any
  //
  //   const subscription =  validation.onFormErrors(formName, (errors) => {
  //     result = errors
  //   })
  //
  //   stream.next({
  //     form: formName,
  //     type: ValidationEventType.Error,
  //     errors: null
  //   })
  //
  //   expect(result).toBe(['Cannot recognize error message.'])
  //   expect(subscription).toBeInstanceOf(Subscription)
  // })
  //
  // // Test for [pushErrors] method
  // test('Expect [pushErrors] method to emit proper event.', () => {
  //   const formName = getFormName()
  //   const formErrors = {
  //     field: ['field errors']
  //   }
  //   let result
  //
  //   stream.subscribe((event: any) => {
  //     result = event
  //   })
  //   validation.pushErrors(formName, formErrors)
  //
  //   // @ts-ignore
  //   expect(result.form).toBe(formName)
  //   // @ts-ignore
  //   expect(result.type).toBe(ValidationEventType.Error)
  //   // @ts-ignore
  //   expect(result.errors).toBe(formErrors)
  // })
})
