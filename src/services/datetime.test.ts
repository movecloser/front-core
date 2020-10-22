import 'reflect-metadata'

import { DateTime } from '@/services/datetime'
import * as moment from 'moment'
import { IncorrectCall } from '@/exceptions/errors'

const dateTime = new DateTime()

describe('Tests for DateTime service', () => {
  test('Expect [difference] method to return time difference in seconds', () => {
    const end = moment().add(3, 'seconds').format()
    const result = dateTime.difference(end)

    expect(typeof result).toBe('number')
    expect(result < 5).toBe(true)
  })

  test('Expect [difference] method to return time difference in seconds', () => {
    const end = moment().add(5, 'seconds').format()
    const start = moment().add(10, 'seconds').format()
    const result = dateTime.difference(end, start)

    expect(typeof result).toBe('number')
    expect(Math.abs(result)).toBe(5)
  })

  test('Expect [difference] method to throw error when no argument is provided', () => {
    let error: any
    try {
    // @ts-ignore
      dateTime.difference().format()
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })

  test('Expect [difference] method to throw error when incorrect argument value provided', () => {
    let error: any
    try {
      // @ts-ignore
      dateTime.difference(123).format()
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })

  test('Expect [now] method to return moment instance', () => {
    const result = dateTime.now

    expect(typeof result).toBe('object')
    expect(result).toBeInstanceOf(moment)
  })

  test('Expect [nowToFormat] method to return string', () => {
    const result =  dateTime.nowToFormat()
    expect(typeof result).toBe('string')
    expect(typeof Date.parse(result)).toBe('number')
  })

  test('Expect [nowToFormat] method to return string', () => {
    const result =  dateTime.nowToFormat('YYYY')
    expect(typeof result).toBe('string')
    expect(typeof Date.parse(result)).toBe('number')
    expect(result.length).toBe(4)
  })

  test('Expect [nowToFormat] method to throw error', () => {
    let error: any
    try {
      // @ts-ignore
      dateTime.nowToFormat(123)
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })

  test('Expect [parse] method to return moment instance', () => {
    const result = dateTime.parse(new Date().toISOString())

    expect(typeof result).toBe('object')
    expect(result).toBeInstanceOf(moment)
  })

  test('Expect [parse] method to throw error', () => {
    let error: any
    try {
      // @ts-ignore
      dateTime.parse()
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })

  test('Expect [parseToFormat] method to return moment instance', () => {
    const result = dateTime.parseToFormat(new Date().toISOString(), 'YYYY-MM-DD')

    expect(typeof result).toBe('string')
    expect(result.match(/(\d{4}-\d{2}-\d{2})/)).toBeTruthy()
  })

  test('Expect [parseToFormat] method to throw error', () => {
    let error: any
    try {
      // @ts-ignore
      dateTime.parseToFormat()
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })

  test('Expect [parseToFormat] method to throw error', () => {
    let error: any
    try {
      // @ts-ignore
      dateTime.parseToFormat('2020-10-20')
    } catch (err) {
      error = err
    }

    expect(() => { throw error }).toThrow(IncorrectCall)
  })
})