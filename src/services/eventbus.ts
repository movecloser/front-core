import { BehaviorSubject, Subscription } from 'rxjs'
import { filter, first } from 'rxjs/operators'

import {
  EventbusCallback,
  EventPayload,
  IEventbus,
  IObserver,
  ObservableEvents
} from '@/contracts/eventbus'

import { Injectable } from '@/container'

/**
 * Eventbus based on RxJS.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@Injectable()
export class Eventbus implements IEventbus {
  private _stream$!: BehaviorSubject<EventPayload<any>>

  constructor () {
    const event: EventPayload<undefined> = { name: 'app:started' }
    this._stream$ = new BehaviorSubject(event)
  }

  /**
   * Emit new event to bus.
   */
  emit<Data> (name: string, payload: any = null): void {
    let eventData: EventPayload<Data> = { name }

    if (payload !== null) {
      eventData.payload = payload
    }

    this._stream$.next(eventData)

    if (process.env.APP_EVENT_LOG === 'true') {
      /* eslint no-console: off */
      console.info(`Event: ${name}`, payload)
    }
  }

  /**
   * Register new observer.
   */
  observe (observer: IObserver): Subscription {
    return this._stream$.subscribe((event: EventPayload<any>) => {
      const index: ObservableEvents = observer.observableEvents

      if (index.hasOwnProperty(event.name) && typeof index[event.name] !== 'undefined') {
        const method: string = index[event.name]

        if (typeof observer[method] === 'function') {
          observer[method](event.payload)
        }
      }
    })
  }

  /**
   * Handle event of type.
   */
  handle<Data> (name: string, callback: EventbusCallback<Data>): Subscription {
    return this._stream$.pipe(
      filter((event: EventPayload<any>) => event.name === name)
    ).subscribe(/* istanbul ignore next */(event: EventPayload<Data>) => {
      /* istanbul ignore next */
      setTimeout(() => callback(event), 1)
    })
  }

  /**
   * Handle event of type only once.
   */
  handleOnce<Data> (name: string, callback: EventbusCallback<Data>): Subscription {
    return this._stream$.pipe(
      first((event: EventPayload<any>) => event.name === name)
    ).subscribe(/* istanbul ignore next */ (event: EventPayload<Data>) => {
      setTimeout(() => callback(event), 1)
    })
  }
}
