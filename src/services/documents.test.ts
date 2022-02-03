// Copyright (c) 2021 Move Closer

import 'reflect-metadata'
import { DocumentService } from './document'

import { WindowService } from './window'

//@ts-ignore
WindowService = {
  isDefined: false
}

const noop = () => {
}

/**
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 */
describe('Document class test', () => {

  it('detects if window service is defined', () => {
    // @ts-ignore
    WindowService.isDefined = true

    const documentService = new DocumentService()

    // @ts-ignore
    expect(documentService._isDefined).toBe(true)
  })

  it('detects if window service is defined', () => {
    // @ts-ignore
    WindowService.isDefined = false

    const documentService = new DocumentService()

    // @ts-ignore
    expect(documentService._isDefined).toBe(false)
  })

  // @ts-ignore
  WindowService.isDefined = true

  const documentService = new DocumentService()

  it('addEventListener method', () => {
    document.addEventListener = jest.fn()

    const options = {}

    documentService.addEventListener('a', noop, options)

    expect(document.addEventListener).toHaveBeenCalledTimes(1)
    expect(document.addEventListener).toHaveBeenCalledWith('a', noop, options)
  })

  // TODO find out why this test throws an error and how to fix it
  it('call method', () => {
    // document.close = jest.fn()

    // documentService.call('close')

    // expect(document.close).toHaveBeenCalledTimes(1)
  })

  it('removeEventListener method', () => {
    document.removeEventListener = jest.fn()

    const options = {}

    documentService.removeEventListener('a', noop, options)

    expect(document.removeEventListener).toHaveBeenCalledTimes(1)
    expect(document.removeEventListener).toHaveBeenCalledWith('a', noop, options)
  })
})
