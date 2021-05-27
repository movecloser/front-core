import 'reflect-metadata';

import { MissingParameter } from "../../exceptions/errors";
import { Token } from "../../contracts";
import {SolidToken} from "./solid";

/**
 * @author Łukasz Jakubowski <lukasz.jakubowski@movecloser.pl>
 */
describe('Solid token test', () => {
    const mockToken: Token = {
        accessToken: 'a',
        expiresAt: new Date().toDateString(),
        tokenType: 'c',
        refreshToken: 'd'
    }

    it('accessToken property check in constructor', () => {
        const token: Partial<Token> = { ...mockToken }

        delete token.accessToken

        const mockFunction = () => new SolidToken(token as Token)

        expect(mockFunction).toThrow(MissingParameter)
        expect(mockFunction).toThrow('Property [accessToken] is missing from Authorization Token.')
    })

    it('accessToken property check in constructor', () => {
        expect(() => new SolidToken(mockToken)).not.toThrow()
    })

    const mockSolidToken = new SolidToken(mockToken)

    it('access token retrieval', () => {
        expect(mockSolidToken.accessToken).toBe('a')
    })

    it('refresh token retrieval', () => {
        expect(typeof mockSolidToken.refreshToken === 'string').toBe(true)
        expect(mockSolidToken.refreshToken).toBeFalsy()
    })

    it('refreshable check', () => {
        expect(mockSolidToken.isRefreshable()).toBe(false)
    })
})