import { Subscription } from 'rxjs'

export type EventbusCallback = (event: EventPayload) => void

export interface EventPayload {
  name: string
  payload?: any
}

export const EventbusType = Symbol.for('IEventbus')

export interface IEventbus {
  emit (name: string, payload?: any): void
  observe (observer: IObserver): Subscription
  handle (name: string, callback: EventbusCallback): Subscription
  handleOnce (name: string, callback: EventbusCallback): void
}

export interface IObserver {
  observableEvents: ObservableEvents
  [key: string]: any
}

export interface ObservableEvents {
  [key: string]: string
}
