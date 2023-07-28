import { ILocalStorage, LocalStorageConfig } from '../../contracts';
interface LocalStorageActionPayload {
    method: 'set' | 'get' | 'remove';
    key: string;
    value?: string;
}
export declare class CrossDomainLocalStorageProvider implements ILocalStorage {
    private readonly domain;
    private readonly iframeId;
    private readonly iframeUrl;
    private iframe;
    constructor(config?: LocalStorageConfig);
    get(key: string): Promise<string | null> | string | null;
    isSet(key: string): boolean;
    remove(key: string): void;
    set(key: string, value: string): void;
    protected runInIframe(payload: LocalStorageActionPayload, callback?: MessagePort['onmessage']): Promise<void>;
    protected createCrossSiteIframe(): Promise<void>;
    protected injectIframeScript(): Promise<void>;
    protected sendRequest(payload: LocalStorageActionPayload, callback?: MessagePort['onmessage']): null | undefined;
    private get isMaster();
}
export {};
