/*
 * Copyright (c) 2021 Move Closer
 */

/* istanbul ignore file */

// TODO: Fix tests using rxjs marbles.

import { BehaviorSubject, Subscription } from 'rxjs'
import { filter, map } from 'rxjs/operators'

import {
  ErrorsPayload,
  IValidation,
  ValidationErrorCallback,
  ValidationEvent,
  ValidationEventType
} from '../contracts/validation'

import { Injectable } from '../container'

/**
 * Validation service is responsible for sending 422 response to correct form.
 *
 * @author  Kuba Fogel <kuba.fogel@movecloser.pl>
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class Validation implements IValidation {
  protected callbackMessage: string = 'Cannot recognize error message.'
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
   */
  clearForm (form: string): void {
    this._stream$.next({
      form: form,
      type: ValidationEventType.Clear
    })
  }

  /**
   * Subscribe to give form for clear events.
   */
  onClear (form: string, callback: (value: ValidationEvent) => void): Subscription {
    return this._stream$.pipe(
      filter<ValidationEvent>(event => event.form === form || event.type === ValidationEventType.Clear)
    ).subscribe(callback)
  }

  /**
   * Subscribe to give form and field for errors` events.
   */
  onErrors (form: string, field: string, callback: ValidationErrorCallback): Subscription {
    return this._stream$.pipe(
      filter<ValidationEvent>(event =>
        event.form === form &&
        event.type === ValidationEventType.Error
      ),
      filter<ValidationEvent>(event =>
        typeof event.errors !== 'undefined' && field in event.errors
      ),
      map<ValidationEvent, string[]>(event => {
        // @ts-ignore  The value is checked above.
        return Array.isArray(event.errors[field]) ?
          // @ts-ignore
          event.errors[field] : [event.message || this.callbackMessage]
      })
    ).subscribe(callback)
  }

  /**
   * Subscribe to stream form.
   */
  onFormErrors (form: string, callback: ValidationErrorCallback): Subscription {
    return this._stream$.pipe(
      filter<ValidationEvent>(event =>
        event.form === form &&
        event.type === ValidationEventType.Error
      )
    ).subscribe((event: ValidationEvent) => {
      const errors: string[] = []

      if (event.message) {
        errors.push(event.message)
      }

      if (typeof event.errors === 'object' && event.errors !== null) {
        for (const list of Object.values(event.errors)) {
          errors.push(...list)
        }
      }

      callback(errors.length ? errors : [this.callbackMessage])
    })
  }

  /**
   * Push errors to validation stream$.
   */
  pushErrors (form: string, errors: ErrorsPayload, message: string | null = null): void {
    this._stream$.next({
      form: form,
      type: ValidationEventType.Error,
      errors: errors,
      ...(message ? { message } : {})
    })
  }
}
