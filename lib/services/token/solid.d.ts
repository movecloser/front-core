import { IToken, Token } from '../../contracts';
import { AbstractToken } from './token';
/**
 * Solid Token Driver Class
 */
export declare class SolidToken extends AbstractToken implements IToken {
    constructor(token: Token);
    /**
     * Returns string representing key used as access token.
     */
    get accessToken(): string;
    /**
     * Returns string representing key used to refresh token.
     */
    get refreshToken(): string;
    /**
     * Check if token is refreshable (overridden).
     */
    isRefreshable(): boolean;
}
