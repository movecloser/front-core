import 'reflect-metadata'
import { StreamBus, StreamList } from '@/services/streambus'
import { Observable, of } from 'rxjs'
import { IncorrectValueError } from '@/exceptions/errors'

const testStreamFactory = function (): Observable<number> { return of(1, 2, 3) }
const streams: StreamList = { 'test$': testStreamFactory }
const streamBus = new StreamBus(streams)

describe('Tests for Streambus service.', () => {
  /**
   * Tests for [constructor]
   */
  test('Expect Streambus to create a proper instance.', () => {
    expect(streamBus).toBeInstanceOf(StreamBus)
    //@ts-ignore
    expect(streamBus._registry.hasOwnProperty('test$')).toBe(true)
  })

  /**
   * Tests for [get] method
   */
  test('Expect [get] to return existing stream.', () => {
    const stream = streamBus.get('test$')

    expect(stream).toBeTruthy()
    expect(stream).toBeInstanceOf(Observable)
  })

  test('Expect [get] to throw error', () => {
    let error: any
    let stream: any

    try {
      stream = streamBus.get('incorrectTest$')
    } catch(err) {
      error = err
    }

    expect(stream).toBeFalsy()
    expect(error).toBeInstanceOf(IncorrectValueError)
    expect(() => { throw error }).toThrow(IncorrectValueError)
  })

  /**
   * Tests for [register] method
   */
  test('Expect [register] to return true when new stream registered.', () => {
    const result = streamBus.register('newStream$', testStreamFactory)

    expect(result).toBeTruthy()
  })

  test('Expect [register] to throw when stream already registered.', () => {
    let error: any
    let stream: any

    try {
      stream = streamBus.register('newStream$', testStreamFactory)
    } catch(err) {
      error = err
    }

    expect(stream).toBeFalsy()
    expect(error).toBeInstanceOf(IncorrectValueError)
    expect(() => { throw error }).toThrow(IncorrectValueError)
  })

  test('Expect [register] to return true when new already registered.', () => {
    const result = streamBus.register('test$', testStreamFactory, true)

    expect(result).toBeTruthy()
  })

  /**
   * Tests for [unregister] method
   */
  test('Expect [unregister]', () => {
    const correctUnregister = streamBus.unregister('test$')
    const incorrectUnregister = streamBus.unregister('xxx')

    expect(correctUnregister).toBeTruthy()
    expect(incorrectUnregister).toBeFalsy()
  })
})