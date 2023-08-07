// Copyright (c) 2021 Move Closer

import 'reflect-metadata'

import { MissingParameter } from '../../exceptions/errors'
import { SingleToken } from './single'
import { Token } from '../../contracts'
import { LegacyDateTime } from '../legacy-datetime'

/**
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 */
describe('Single token test', () => {
  const mockToken: Token = {
    accessToken: 'a',
    expiresAt: 'b',
    tokenType: 'c',
    refreshToken: 'd'
  }

  it('accessToken property check in constructor', () => {
    const token: Partial<Token> = { ...mockToken }

    delete token.accessToken

    const mockFunction = () => new SingleToken(token as Token, new LegacyDateTime())

    expect(mockFunction).toThrow(MissingParameter)
    expect(mockFunction).toThrow('Property [accessToken] is missing from Authorization Token.')
  })

  it('accessToken property check in constructor', () => {
    expect(() => new SingleToken(mockToken, new LegacyDateTime())).not.toThrow()
  })

  const mockSingleToken = new SingleToken(mockToken, new LegacyDateTime())

  it('token retrieval', () => {
    expect(mockSingleToken.accessToken).toBe(mockSingleToken.refreshToken)
    expect(mockSingleToken.refreshToken).toBe('a')
    expect(mockSingleToken.refreshToken).not.toBe('d')
  })
})
