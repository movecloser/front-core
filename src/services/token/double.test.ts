// Copyright (c) 2021 Move Closer

import 'reflect-metadata'

import { MissingParameter } from '../../exceptions/errors'
import { Token } from '../../contracts'
import { DoubleToken } from './double'
import { LegacyDateTime } from '../legacy-datetime'

/**
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 */
describe('Double token test', () => {
  const mockToken: Token = {
    accessToken: 'a',
    expiresAt: 'b',
    tokenType: 'c',
    refreshToken: 'd'
  }

  it('accessToken property check in constructor', () => {
    const token: Partial<Token> = { ...mockToken }

    delete token.accessToken

    const mockFunction = () => new DoubleToken(token as Token, new LegacyDateTime())

    expect(mockFunction).toThrow(MissingParameter)
    expect(mockFunction).toThrow('Property [accessToken] is missing from Authorization Token.')
  })

  it('accessToken property check in constructor', () => {
    expect(() => new DoubleToken(mockToken, new LegacyDateTime())).not.toThrow()
  })

  it('refreshToken property check in constructor', () => {
    const token: Partial<Token> = { ...mockToken }

    delete token.refreshToken

    const mockFunction = () => new DoubleToken(token as Token, new LegacyDateTime())

    expect(mockFunction).toThrow(MissingParameter)
    expect(mockFunction).toThrow('Property [refreshToken] is missing from Authorization Token.')
  })

  it('refreshToken property check in constructor', () => {
    expect(() => new DoubleToken(mockToken, new LegacyDateTime())).not.toThrow()
  })

  const mockDoubleToken = new DoubleToken(mockToken, new LegacyDateTime())

  it('access token retrieval', () => {
    expect(mockDoubleToken.accessToken).toBe('a')
  })

  it('refresh token retrieval', () => {
    expect(mockDoubleToken.refreshToken).toBe('d')
  })
})
