import { ICollection, IMeta, MetaPayload } from '../contracts/models';
/**
 * Collection is an extension of classic Array with some new features and Model awareness.
 *
 * @author Kuba Fogel <kuba.fogel@movecloser.pl>
 * @version 1.0.0
 * @licence MIT
 */
export declare class Collection<T> extends Array<T> implements ICollection<T> {
    protected _meta: MetaPayload;
    constructor(items?: T[], meta?: IMeta);
    /**
     * Meta property getter
     */
    get meta(): IMeta;
    /**
     * Meta property setter
     * @param meta
     */
    set meta(meta: IMeta);
    /**
     * Method to retrieve first element of collection
     */
    first(): T | false;
    /**
     * Method to retrieve if collection contains specific element
     */
    getItem(callback: Function): T | false;
    /**
     * Method to check if collection contains specific element
     */
    hasItem(callback: Function): boolean;
    /**
     * Method to check if collection contains any elements
     */
    hasItems(): boolean;
    /**
     * Method to check if collection contains no elements
     */
    isEmpty(): boolean;
    /**
     * Method to retrieve last element of collection
     */
    last(): T | false;
}
