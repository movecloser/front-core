import { Subscription } from 'rxjs';
export interface AuthConfig {
    tokenName: string;
    refreshThreshold: number;
    validThreshold: number;
    tokenDriver: TokenDriver;
}
export interface AuthEvent {
    type: AuthEventType;
    token?: IToken;
}
export declare type AuthEventCallback = (event: AuthEvent) => void;
export declare enum AuthEventType {
    Authenticated = "authenticated",
    Booted = "booted",
    BootedWithToken = "booted_with_token",
    Booting = "booting",
    Invalidated = "invalidated",
    Refresh = "refresh"
}
export interface AuthHeader {
    Authorization: string;
}
export interface Authentication<U> extends AuthProvider {
    deleteToken(): void;
    getUserId(): string | number | null;
    listen(callback: AuthEventCallback): Subscription;
    setDriver(driver: TokenDriver): this;
    setToken(token: Token): void;
    setUser(user: U): void;
    token: Token | null;
    user: U | null;
}
export interface AuthProvider {
    check(): boolean;
    getAuthorizationHeader(): AuthHeader;
}
export interface IUser {
    id: string | number;
}
export interface Token {
    accessToken: string;
    expiresAt: string | null;
    tokenType: string;
    refreshToken?: string;
}
export interface ITokenConstructor {
    new (...args: any[]): IToken;
    recreateFromStorage(tokenName: string): Token | null;
}
export interface IToken {
    accessToken: string;
    calculateTokenLifetime(): number;
    isRefreshable(): boolean;
    refreshToken: string;
    token: Token;
}
export declare const AuthServiceType: unique symbol;
export declare enum TokenDriver {
    Single = "single",
    Double = "double",
    Solid = "solid"
}
