// Copyright (c) 2022 Move Closer

/**
 * @jest-environment node
 */
import 'reflect-metadata'
import { AxiosRequestConfig } from 'axios'

import { Methods } from '../../contracts/http'

import { AxiosDriver } from './axios-driver'
import { ConnectionError } from '../../exceptions/errors'
import { ResponseType } from '../../contracts'

const axiosConfig: AxiosRequestConfig = {
  // url: '/Testowanie_oprogramowania',
  // method: 'GET',
  // baseURL: 'https://pl.wikipedia.org/wiki/'
}

const driver = new AxiosDriver(axiosConfig, false)

describe('Test AxiosDriver class', () => {
  test('Expect [_call] method to perform valid test request', async () => {
    const target = 'https://www.google.com/'
    // @ts-ignore
    const response = await driver._call(Methods.Get, target, {}, {}, {})

    expect(response.status).toBe(200)
  })

  // Invalid url
  test('Expect [_call] method to perform invalid request (Invalid url)', async () => {
    const target = 'http://invalid-url/'
    let error: any

    try {
      // @ts-ignore
      await driver._call(Methods.Get, target, {}, {}, {})
    } catch (err) {
      error = err
    }

    expect(() => {
      throw error
    }).toThrow(ConnectionError)
  })

  // Not Found
  test('Expect [_call] method to perform invalid request (Not Found)', async () => {
    const target = 'https://www.google.com/test'
    // @ts-ignore
    const response = await driver._call(Methods.Get, target, {}, {}, {})

    expect(response.status).toBe(404)
  })

  // Post
  test('Expect [_call] method to perform invalid test request (Post method)', async () => {
    const target = 'https://www.google.com/test'
    // @ts-ignore
    const response = await driver._call(Methods.Post, target, {}, {}, {})

    expect(response.status).toBe(404)
  })

  // Post
  test('Expect [_call] method to perform invalid test request (Post method)', async () => {
    const target = 'https://www.google.com/test'
    // @ts-ignore
    const response = await driver._call(Methods.Post, target, {}, {}, { responseType: ResponseType.Json })

    expect(response.status).toBe(404)
  })
})
