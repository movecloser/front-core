import { ILocalStorage, LocalStorageConfig } from '../../contracts';
interface LocalStorageActionPayload {
    method: 'set' | 'get' | 'remove';
    key: string;
    value?: string;
}
export declare class CrossDomainLocalStorageProvider implements ILocalStorage {
    private readonly allowedOrigins;
    private readonly domain;
    private readonly iframeId;
    private readonly iframeUrl;
    private iframe;
    constructor(config?: LocalStorageConfig);
    get(key: string): Promise<string | null> | string | null;
    isSet(key: string): boolean;
    remove(key: string): void;
    set(key: string, value: string): void;
    protected runInIframe(payload: LocalStorageActionPayload): void;
    protected createCrossSiteIframe(payload: LocalStorageActionPayload): void;
    protected injectIframeScript(): void;
    protected iframeCallback(payload: LocalStorageActionPayload): null | undefined;
    private get isMaster();
}
export {};
