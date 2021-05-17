import { Subscription } from 'rxjs';
import { AuthConfig, Authentication, AuthEventCallback, AuthHeader, IToken, IUser, Token, TokenDriver } from '../contracts/authentication';
import { IWindow } from '../contracts/services';
export declare class AuthService implements Authentication<IUser> {
    private _config;
    private _window;
    private _auth$;
    private _driver;
    private _token;
    private _user;
    constructor(_config: AuthConfig, _window: IWindow);
    /**
     * Returns if user is logged-in.
     */
    check(): boolean;
    /**
     * Clears Token and sets logged-out state.
     */
    deleteToken(): void;
    /**
     * Returns Auth Headers based on token type.
     */
    getAuthorizationHeader(): AuthHeader;
    /**
     * Register new event listener.
     */
    listen(callback: AuthEventCallback): Subscription;
    /**
     * Returns Token object from state.
     */
    get token(): Token | null;
    /**
     * Sets Token Driver to be used by Auth Service.
     * @param driver
     */
    setDriver(driver: TokenDriver): this;
    /**
     * Sets Token to state.
     * @param token
     * @param isPersistent (optional)
     */
    setToken(token: Token, isPersistent?: boolean): void;
    /**
     * Forces token refresh
     */
    refreshToken(): void;
    /**
     * Sets user in state.
     * @param user
     */
    setUser<U extends IUser>(user: U): void;
    /**
     * Returns user from state.
     */
    get user(): IUser | null;
    /**
     * Return id of currently set user.
     */
    getUserId(): string | number | null;
    /**
     * Checks if token is valid and emits event if not.
     * @param tokenLifeTime
     * @private
     */
    protected isTokenValid(tokenLifeTime: number): boolean;
    /**
     * Listens to storage change.
     * When new Token appears in other browser tab.
     */
    protected registerStorageListener(): void;
    /**
     * Sets token retrieved from device localstorage.
     */
    protected retrieveToken(): void;
    /**
     * Sets refresh behaviour for token.
     * @param tokenLifeTime
     * @param token
     * @private
     */
    protected setupRefreshment(tokenLifeTime: number, token: IToken): void;
    /**
     * Decides whether to use new token or existing one.
     * Fires only if tab is active.
     */
    private compareWithStorage;
}
