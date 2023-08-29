import { AnyObject, ILocalStorage } from '../../contracts';
export declare class NativeLocalStorageProvider implements ILocalStorage {
    private _config?;
    constructor(_config?: AnyObject | undefined);
    get(key: string): string | null;
    isSet(key: string): boolean;
    remove(key: string): void;
    set(key: string, value: string): void;
}
