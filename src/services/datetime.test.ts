// Copyright (c) 2021 Move Closer

import 'reflect-metadata'
import * as dayjs from 'dayjs'

import { DateTime } from './datetime'

const dateTime = new DateTime()

describe('Tests for DateTime service', () => {
  test('Expect [difference] method to return time difference in seconds', () => {
    const end = dayjs().add(3, 'seconds').format()
    const result = dateTime.difference(end)

    expect(typeof result).toBe('number')
    expect(result < 5).toBe(true)
  })

  test('Expect [difference] method to return time difference in seconds', () => {
    const end = dayjs().add(5, 'seconds').format()
    const start = dayjs().add(10, 'seconds').format()
    const result = dateTime.difference(end, start)

    expect(typeof result).toBe('number')
    expect(Math.abs(result)).toBe(5)
  })

  test('Expect [nowToFormat] method to return string', () => {
    const result = dateTime.nowToFormat()
    expect(typeof result).toBe('string')
    expect(typeof Date.parse(result)).toBe('number')
  })

  test('Expect [nowToFormat] method to return string', () => {
    const result = dateTime.nowToFormat('YYYY')
    expect(typeof result).toBe('string')
    expect(typeof Date.parse(result)).toBe('number')
    expect(result.length).toBe(4)
  })

  // test('Expect [nowToFormat] method to throw error', () => {
  //   expect(() => {
  //     // @ts-ignore
  //     dateTime.nowToFormat(123)
  //   }).toThrow(TypeError)
  // })

  // test('Expect [parse] method to throw error', () => {
  //   expect(() => {
  //     // @ts-ignore
  //     dateTime.parse()
  //   }).toThrow(TypeError)
  // })

  test('Expect [parseToFormat] method to return dayjs instance', () => {
    const result = dateTime.parseToFormat(new Date().toISOString(), 'YYYY-MM-DD')

    expect(typeof result).toBe('string')
    expect(result.match(/(\d{4}-\d{2}-\d{2})/)).toBeTruthy()
  })

  // test('Expect [parseToFormat] method to throw error', () => {
  //   expect(() => {
  //     // @ts-ignore
  //     dateTime.parseToFormat()
  //   }).toThrow(TypeError)
  // })
  //
  // test('Expect [parseToFormat] method to throw error', () => {
  //   expect(() => {
  //     // @ts-ignore
  //     dateTime.parseToFormat('2020-10-20')
  //   }).toThrow(TypeError)
  // })
})
