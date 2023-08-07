import { IDateTime, IToken, Token } from '../../contracts';
import { AbstractToken } from './token';
/**
 * Double Token Driver Class
 */
export declare class DoubleToken extends AbstractToken implements IToken {
    constructor(token: Token, date: IDateTime);
    /**
     * Returns string representing key used as access token.
     */
    get accessToken(): string;
    /**
     * Returns string representing key used to refresh token
     */
    get refreshToken(): string;
}
