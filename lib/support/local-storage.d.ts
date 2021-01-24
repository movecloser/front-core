/**
 * @author Stanisław Gregor <stanislaw.gregor@movecloser.pl>
 * @author Łukasz Sitnicki <lukasz.sitnicki@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class LocalStorage {
    /**
     * Resolves the value for the given key.
     * Returns 'null' if the key is not set.
     */
    get(key: string): string | null;
    /**
     * Checks if the given key has ever been set.
     */
    isSet(key: string): boolean;
    /**
     * Removes this value the given key.
     */
    remove(key: string): void;
    /**
     * Sets the value for the given key.
     */
    set(key: string, value: string): void;
}
export default LocalStorage;
