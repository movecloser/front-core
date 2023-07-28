export declare type NativeLocalStorageConfig = {};
export interface CrossDomainLocalStorageConfig {
    allowedOrigins: string[];
    domain: string;
    iframeId?: string;
    iframePath: string;
}
export declare type LocalStorageConfig = NativeLocalStorageConfig | CrossDomainLocalStorageConfig;
export interface ILocalStorageConstructor {
    new (config?: LocalStorageConfig): ILocalStorage;
}
export interface ILocalStorage {
    get(key: string): string | null | Promise<string | null>;
    isSet(key: string): boolean;
    remove(key: string): void;
    set(key: string, value: string): void;
}
export declare enum LocalStorageDriver {
    Native = "native",
    CrossDomain = "cross-domain"
}
export declare const localStorageDriversMap: Record<LocalStorageDriver, ILocalStorageConstructor>;
export declare const LocalStorageType: unique symbol;
