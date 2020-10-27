import { injectable } from 'inversify'
import { BehaviorSubject, Subscription } from 'rxjs'
import { filter, first } from 'rxjs/operators'

import {
  EventbusCallback,
  EventPayload,
  IEventbus,
  IObserver,
  ObservableEvents
} from '@/contracts/eventbus'

/**
 * Eventbus based on RxJS.
 *
 * @author  Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 */
@injectable()
export class Eventbus implements IEventbus {
  private _stream$!: BehaviorSubject<EventPayload>

  constructor () {
    const event: EventPayload = { name: 'app:started' }
    this._stream$ = new BehaviorSubject(event)
  }

  /**
   * Emit new event to bus.
   */
  emit (name: string, payload: any = null): void {
    let eventData: EventPayload = { name }

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
    return this._stream$.subscribe((event: EventPayload) => {
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
  handle (name: string, callback: EventbusCallback): Subscription {
    return this._stream$.pipe(
      filter((event: EventPayload) => event.name === name)
    ).subscribe(/* istanbul ignore next */(event: EventPayload) => {
      /* istanbul ignore next */
      setTimeout(() => callback(event), 1)
    })
  }

  /**
   * Handle event of type only once.
   */
  handleOnce (name: string, callback: EventbusCallback): Subscription {
    return this._stream$.pipe(
      first((event: EventPayload) => event.name === name)
    ).subscribe(/* istanbul ignore next */ (event: EventPayload) => {
      setTimeout(() => callback(event), 1)
    })
  }
}
