/*
 * Copyright (c) 2021 Move Closer
 */

import 'reflect-metadata'

import ModalConnector from './modal-connector'
import { ModalRegistry, ModalState } from '../contracts'

describe('Tests for ModalConnector service.', () => {
  const registry: ModalRegistry<object> = {
    'testModal': {}
  }
  let connector = new ModalConnector(registry)

  afterEach(() => {
    jest.clearAllMocks()
    connector = new ModalConnector(registry)
  })

  test('Expect [close] method to trigger events.', () => {
    // @ts-ignore
    const nextSpy = jest.spyOn(connector._stream$, 'next')
    // @ts-ignore
    const unlockSpy = jest.spyOn(connector, 'unlockScroll')

    connector.close()
    connector.close('')
    // @ts-ignore
    connector._state.component = 'test'
    connector.close('test')
    // @ts-ignore
    connector.close('not')

    expect(nextSpy).toHaveBeenCalledTimes(3)
    expect(unlockSpy).toHaveBeenCalledTimes(4)
  })

  test('Expect [component] method to throw.', () => {
    let error

    try {
      connector.component<any>()
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [component] method to throw.', () => {
    let error

    // @ts-ignore
    connector._state.component = 'wrong'

    try {
      connector.component<any>()
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [component] method to work.', () => {
    // @ts-ignore
    connector._state.component = 'testModal'

    const result = connector.component<any>()

    expect(result).toEqual({})
  })

  test('Expect [getComponent] method to work.', () => {
    // @ts-ignore
    // connector._state.component = 'testModal'

    const result = connector.getComponent<any>('testModal')

    expect(result).toEqual({})
  })

  test('Expect [getComponent] method to throw.', () => {
    let error

    try {
      connector.getComponent<any>('wrongName')
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [isOpened] method to work.', () => {
    // @ts-ignore
    connector._state.component = 'testModal'

    const result = connector.isOpened

    expect(result).toEqual(false)
  })

  test('Expect [isOpened] method to work.', () => {
    // @ts-ignore
    connector._state.opened = true

    const result = connector.isOpened

    expect(result).toEqual(false)
  })

  test('Expect [name] method to work.', () => {
    const result = connector.name

    expect(result).toEqual(null)
  })

  test('Expect [name] method to work.', () => {
    // @ts-ignore
    connector._state.component = 'testModal'

    const result = connector.name

    expect(result).toEqual('testModal')
  })

  test('Expect [open] method to throw.', () => {
    let error

    try {
      connector.open('wrong')
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [open] method to work.', () => {
    // @ts-ignore
    const nextSpy = jest.spyOn(connector._stream$, 'next')

    // @ts-ignore
    const lockSpy = jest.spyOn(connector, 'lockScroll')

    connector.open('testModal')

    expect(nextSpy).toHaveBeenCalledTimes(1)
    expect(lockSpy).toHaveBeenCalledTimes(1)
  })

  test('Expect [openAsync] method to throw.', async () => {
    let error

    try {
      await connector.openAsync('wrong', new Promise(resolve => {
      }))
    } catch (err) {
      error = err
    }

    expect(error).toBeInstanceOf(Error)
  })

  test('Expect [openAsync] method to throw.', async () => {
    // @ts-ignore
    const nextSpy = jest.spyOn(connector._stream$, 'next')

    await connector.openAsync('testModal', Promise.resolve())

    expect(nextSpy).toHaveBeenCalledTimes(1)
  })


  test('Expect [payload] method to work.', () => {
    const result = connector.payload

    expect(result).toEqual({})
  })

  test('Expect [getRegistry] method to work.', () => {
    const result = connector.getRegistry<any>()

    expect(result).toEqual({ 'testModal': {} })
  })

  test('Expect [register] to add new modal definition.', () => {
    connector.register<any>({ 'newModal': {} })

    expect(connector.getRegistry<any>()).toEqual({ 'testModal': {}, 'newModal': {} })
  })

  test('Expect [subscribe] method to work.', () => {
    // @ts-ignore
    const subscribeSpy = jest.spyOn(connector._stream$, 'subscribe')
    connector.subscribe((state: ModalState) => {
    })

    expect(subscribeSpy).toHaveBeenCalledTimes(1)
  })
})
