import 'reflect-metadata';

import { MissingParameter } from "../../exceptions/errors";
import { SingleToken } from "./single";
import { Token } from "../../contracts";

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

        const mockFunction = () => new SingleToken(token as Token)

        expect(mockFunction).toThrow(MissingParameter)
        expect(mockFunction).toThrow('Property [accessToken] is missing from Authorization Token.')
    })

    it('accessToken property check in constructor', () => {
        expect(() => new SingleToken(mockToken)).not.toThrow()
    })

    const mockSingleToken = new SingleToken(mockToken)

    it('token retrieval', () => {
        expect(mockSingleToken.accessToken).toBe(mockSingleToken.refreshToken)
        expect(mockSingleToken.refreshToken).toBe('a')
        expect(mockSingleToken.refreshToken).not.toBe('d')
    })
})