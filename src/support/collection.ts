import { ICollection, IMeta, MetaPayload } from '@/contracts/models'

export class Collection<T> extends Array implements ICollection<T> {
    protected _meta: MetaPayload = {}

    /* istanbul ignore next */
    constructor (items?: T[], meta?: IMeta) {
        // @ts-ignore
        super(...items)

        if (meta) {
            this.meta = meta
        }

        Object.setPrototypeOf(this, Object.create(Collection.prototype));
    }

    /**
     * Meta property getter
     */
    public get meta (): IMeta {
        return this._meta
    }

    /**
     * Meta property setter
     * @param meta
     */
    public set meta (meta: IMeta) {
        this._meta = meta
    }

    /**
     * Method to retrieve first element of collection
     */
    public first (): T|false {
        if (!this.length) {
            return false
        }
        return this[0]
    }

    /**
     * Method to retrieve if collection contains specific element
     */
    public getItem (callback: Function): T|false {
        const item = this.find((item: T, index?: number): boolean => {
            return callback(item, index)
        })
        return item || false
    }

    /**
     * Method to check if collection contains specific element
     */
    public hasItem (callback: Function): boolean {
        return !!this.getItem(callback)
    }

    /**
     * Method to check if collection contains any elements
     */
    public hasItems (): boolean {
        return this.length > 0
    }

    /**
     * Method to check if collection contains no elements
     */
    public isEmpty (): boolean {
        return this.length === 0
    }

    /**
     * Method to retrieve last element of collection
     */
    public last (): T|false {
        if (!this.length) {
            return false
        }

        return this[this.length  - 1]
    }
}
