// Copyright (c) 2021 Move Closer

import { Subscription } from 'rxjs'

export type EventbusCallback<Data> = (event: EventPayload<Data>) => void

export interface EventPayload<Data> {
  name: string
  payload?: Data
}

export const EventbusType = Symbol.for('IEventbus')

export interface IEventbus {
  emit (name: string, payload?: any): void
  observe (observer: IObserver): Subscription
  handle<Data> (name: string, callback: EventbusCallback<Data>): Subscription
  handleOnce<Data> (name: string, callback: EventbusCallback<Data>): void
}

export interface IObserver {
  observableEvents: ObservableEvents
  [key: string]: any
}

export interface ObservableEvents {
  [key: string]: string
}
