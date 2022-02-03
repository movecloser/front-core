// Copyright (c) 2021 Move Closer

import { Subscription } from 'rxjs'

export interface ErrorsPayload {
  [key: string]: string[]
}

export interface IValidation {
  clearForm (form: string): void
  onClear (form: string, callback: () => void): Subscription
  onErrors (form: string, field: string, callback: ValidationErrorCallback): Subscription
  onFormErrors (form: string, callback: (...args: any[]) => void): Subscription
  pushErrors (form: string, errors: ErrorsPayload, message?: string | null): void
}

export type ValidationErrorCallback = (errors: string[]) => void

export const ValidationType = Symbol.for('IValidation')

export interface ValidationEvent {
  form: string
  type: ValidationEventType
  message?: string
  errors?: ErrorsPayload
}

export enum ValidationEventType {
  Clear = 'clear',
  Error = 'error'
}
