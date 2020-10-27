import 'reflect-metadata'

import { EventPayload, IEventbus, IObserver } from '@/contracts/eventbus'
import { Eventbus } from '@/services/eventbus'
import { Subscription } from 'rxjs'
// import { filter } from 'rxjs/operators'

describe('Tests for Eventbus service.', () => {
  const eventbus: IEventbus = new Eventbus()

  /**
   * All mocks should be cleared after each test.
   */
  afterEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  })

  /**
   * Tests for [emit] method
   */
  test('Expect [emit] method to emit event name.', () => {
    let event

    // @ts-ignore
    eventbus._stream$.pipe(
    ).subscribe((ev: EventPayload) => {
      event = ev
    })

    eventbus.emit('test:event')

    // @ts-ignore
    expect('test:event').toBe(event.name)
  })

  test('Expect [emit] method to emit event with payload.', () => {
    let event

    // @ts-ignore
    eventbus._stream$.pipe(
    ).subscribe((ev: EventPayload) => {
      event = ev
    })

    eventbus.emit('test:event', {
      test: true
    })



    // @ts-ignore
    expect('test:event').toBe(event.name)
    // @ts-ignore
    expect(event.payload).toEqual({ test: true })
  })

  test('Expect [emit] method to log events.', () => {
    let event
    process.env.APP_EVENT_LOG = 'true'
    console.info = jest.fn()
    const consoleSpy = jest.spyOn(console, 'info')

    // @ts-ignore
    eventbus._stream$.pipe(
    ).subscribe((ev: EventPayload) => {
      event = ev
    })

    eventbus.emit('test:event-log')

    // @ts-ignore
    expect('test:event-log').toBe(event.name)
    expect(consoleSpy).toHaveBeenCalledWith("Event: test:event-log", null)

    process.env.APP_EVENT_LOG = 'false'
  })

  /**
   * Tests for [observe] method
   */
  test('Expect [observe] method to return Subscription, and use provided callback.', () => {
    let result
    const observer: IObserver = {
      observableEvents: {
        'test:observe': 'testHandler'
      },
      testHandler () {
        result = true
      }
    }
    const subscription = eventbus.observe(observer)

    eventbus.emit('test:observe')

    expect(subscription).toBeInstanceOf(Subscription)
    expect(result).toBe(true)
  })

  test('Expect [observe] method to do nothing if handler is not provided.', () => {
    let result
    const observer: IObserver = {
      observableEvents: {
        'test:observe': 'testHandler'
      }
    }

    eventbus.observe(observer)
    eventbus.emit('test:observe')

    expect(result).toBe(undefined)
  })

  /**
   * Tests for [handle] method
   */
  test('Expect [handle] method to return Subscription.', () => {
    const subscription = eventbus.handle('test:event', () => {
      return
    })

    expect(subscription).toBeInstanceOf(Subscription)
  })

  /**
   * Tests for [handleOnce] method
   */
  test('Expect [handleOnce] method to return Subscription.', async () => {
    const subscription = eventbus.handleOnce('test:once', () => {
      return
    })

    expect(subscription).toBeInstanceOf(Subscription)
  })
})
