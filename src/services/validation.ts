import { injectable } from 'inversify'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

import {
  ErrorsPayload,
  IValidation,
  ValidationErrorCallback,
  ValidationEvent,
  ValidationEventType
} from '@/contracts/validation'

/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class Validation implements IValidation {
  private _stream$!: BehaviorSubject<ValidationEvent>

  constructor () {
    const event: ValidationEvent = {
      form: '',
      type: ValidationEventType.Clear
    }

    this._stream$ = new BehaviorSubject(event)
  }

  /**
   * Clear errors of given form.
   *
   * @param  {string} form
   * @return void
   */
  clearForm (form: string): void {
    this._stream$.next({
      form: form,
      type: ValidationEventType.Clear
    })
  }

  /**
   * Subscribe to give form for clear events.
   *
   * @param  {string} form
   * @param  {string} field
   * @param  {function} callback
   * @return {Subscription}
   */
  onClear (form: string, callback: () => void): Subscription {
    return this._stream$.pipe(
      filter(
        (event: ValidationEvent) => event.form === form ||
        event.type === ValidationEventType.Clear
      )
    ).subscribe(() => {
      callback()
    })
  }

  /**
   * Subscribe to give form and field for errors` events.
   *
   * @param  {string} form
   * @param  {string} field
   * @param  {ValidationErrorCallback} callback
   * @return {Subscription}
   */
  onErrors (form: string, field: string, callback: ValidationErrorCallback): Subscription {
    return this._stream$.pipe(
      filter(
        (event: ValidationEvent) => event.form === form ||
        event.type === ValidationEventType.Error
      ),
      filter((event: ValidationEvent) => {
        if (!event.hasOwnProperty('errors') || typeof event.errors === 'undefined') {
          return false
        }

        return event.errors.hasOwnProperty(field)
      })
    ).subscribe((event: ValidationEvent) => {
      if (form === event.form) {
        const errors: string[] = []
        if (
          event.hasOwnProperty('errors') &&
          typeof event.errors !== 'undefined' &&
          event.errors.hasOwnProperty(field) &&
          Array.isArray(event.errors[field])
        ) {
          errors.push(
            ...event.errors[field]
          )
        }

        callback(errors)
      }
    })
  }

  /**
   * Subscribe to stream form
   *
   * @param  {string} form
   * @param  {function} callback
   * @return {Subscription}
   */
  onFormErrors (form: string, callback: ValidationErrorCallback): Subscription {
    return this._stream$.pipe(
      filter(
        (event: ValidationEvent) => event.form === form ||
          event.type === ValidationEventType.Error
      )
    ).subscribe((event: ValidationEvent) => {
      const errors: string[] = []

      if (event.hasOwnProperty('errors') && typeof event.errors !== 'undefined') {
        errors.push(
          ...event.errors['message']
        )
      }

      callback(errors)
    })
  }

  /**
   * Push errors to validation stream$.
   *
   * @param  {string} form
   * @param  {ErrorsPayload} errors
   * @return void
   */
  pushErrors (form: string, errors: ErrorsPayload): void {
    this._stream$.next({
      form: form,
      type: ValidationEventType.Error,
      errors: errors
    })
  }
}
