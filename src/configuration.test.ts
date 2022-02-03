// Copyright (c) 2021 Move Closer

import 'reflect-metadata'
import { AppConfig, RouterDriver, StoreDriver } from './contracts'
import { Configuration } from './configuration'

describe('Test Configuration class.', () => {
  const appConfig: AppConfig = {
    modules: [],
    router: RouterDriver.None,
    store: StoreDriver.None,
    test: {
      nested: 'test'
    }
  }
  const configuration = new Configuration(appConfig)

  test('Expect [byFile] method to return requested driver.', () => {
    const result = configuration.byFile('test')
    expect(result).toEqual(appConfig.test)
  })

  test('Expect [byFile] method to throw error.', () => {
    let error
    try {
      configuration.byFile('wrong')
    } catch (err) {
      error = err
    }
    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [byKey] method to return requested driver.', () => {
    const result = configuration.byKey('test.nested')
    expect(result).toEqual(appConfig.test.nested)
  })

  test('Expect [byKey] method to use default value.', () => {
    const result = configuration.byKey('test.wrong', false, 'test')
    expect(result).toEqual(appConfig.test.nested)
  })

  test('Expect [byKey] method to throw error when key is not provided.', () => {
    let error
    try {
      configuration.byKey('')
    } catch (err) {
      error = err
    }
    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [byKey] method to throw error.', () => {
    let error
    try {
      configuration.byKey('wrong.key')
    } catch (err) {
      error = err
    }
    expect(error).toBeInstanceOf(Error)
  })

})
