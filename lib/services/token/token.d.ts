import { IDateTime, ILocalStorage, Token } from '../../contracts';
export declare abstract class AbstractToken {
    protected _token: Token;
    protected _date: IDateTime;
    protected constructor(token: Token, date: IDateTime);
    /**
     * Check if token is equipped with all necessary properties.
     * @protected
     */
    protected checkRequiredProperties(properties: (keyof Token)[]): void;
    /**
     * Retrieve token from storage.
     */
    static recreateFromStorage(tokenName: string, localStorageProvider?: ILocalStorage): Promise<Token | null>;
    /**
     * Returns raw Token data.
     */
    get token(): Token;
    /**
     * Check if token is refreshable.
     */
    isRefreshable(): boolean;
    /**
     * Calculates for how long token will be still valid.
     */
    calculateTokenLifetime(): number;
}
